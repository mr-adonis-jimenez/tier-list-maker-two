import { readItems } from "@directus/sdk";
import { draftMode } from "next/headers";
import type { NextRequest } from "next/server";
import directus from "@/lib/directus";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Verify secret token
  if (secret !== process.env.DIRECTUS_SECRET_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        limit: 1,
      }),
    );

    const post = posts[0];

    if (!post) {
      return new Response("Invalid slug", { status: 404 });
    }

    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    return Response.redirect(new URL(`/posts/${post.slug}`, request.url));
  } catch (error) {
    console.error("[v0] Draft mode error:", error);
    return new Response("Error enabling draft mode", { status: 500 });
  }
}

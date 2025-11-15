import { readItems } from "@directus/sdk";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MarkdownWithIds } from "@/components/blog/markdown-with-ids";
import { PostCTA } from "@/components/blog/post-cta";
import { RecentPosts } from "@/components/blog/recent-posts";
import { SiteNav } from "@/components/blog/site-nav";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import directus from "@/lib/directus";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "content",
          "status",
          "imageurl",
        ],
        limit: 1,
      }),
    );

    const post = posts[0];

    if (!post) {
      notFound();
    }

    const { title, content, description, published_at, imageurl } = post;

    const recentPosts = await directus.request(
      readItems("posts", {
        filter: {
          status: { _eq: "published" },
          slug: { _neq: slug },
        },
        fields: ["id", "title", "slug", "description", "published_at"],
        sort: ["-published_at"],
        limit: 6,
      }),
    );

    return (
      <>
        <SiteNav />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {isEnabled && (
              <Card className="mb-6 border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/30">
                <CardContent className="py-3">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
                    Draft mode enabled - You are previewing unpublished content
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-8">
              <article className="flex-1 min-w-0">
                <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold mb-2 text-balance text-gray-900 dark:text-white">
                      {title}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {description && (
                      <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 text-pretty">
                        {description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                    {imageurl && (
                      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                        <Image
                          fill={true}
                          src={`https://symcloud.top/${imageurl}`}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <MarkdownWithIds content={content} />
                  </CardContent>
                </Card>

                <PostCTA />

                <RecentPosts posts={recentPosts} />
              </article>

              <aside className="w-64 shrink-0 hidden md:block">
                <TableOfContents content={content} />
              </aside>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("[v0] Error fetching post:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        limit: -1,
      }),
    );

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("[v0] Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "content",
          "status",
          "imageurl",
        ],
        limit: 1,
      }),
    );

    const post = posts[0];

    if (!post) {
      return {
        title: "Post not found",
      };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: "Post not found",
    };
  }
}

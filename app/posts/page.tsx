import { readItems } from "@directus/sdk";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/blog/site-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import directus from "@/lib/directus";

export const metadata: Metadata = {
  title: "Tier List Maker - Create Custom Rankings",
  description:
    "Create custom tier lists by uploading images and ranking them. Drag and drop images into S, A, B, C, and D tiers. Export your tier list as an image.",
};

export const revalidate = 86400;

export default async function BlogPage() {
  try {
    const posts = await directus.request(
      readItems("posts", {
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "status",
        ],
        filter: {
          status: { _eq: "published" },
        },
        sort: ["-published_at"],
        limit: -1,
      }),
    );

    return (
      <>
        <SiteNav />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 text-balance text-gray-900 dark:text-white">
                Blog Posts
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 text-pretty">
                Explore our latest articles and updates
              </p>
            </div>

            {posts.length === 0 ? (
              <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No posts published yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    scroll={false}
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:border-purple-500 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950">
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-balance text-gray-900 dark:text-white">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-500 dark:text-gray-500">
                          {new Date(post.published_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-pretty">
                          {post.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("[v0] Error fetching posts:", error);

    return (
      <>
        <SiteNav />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-red-500 dark:border-red-600 bg-white dark:bg-slate-950">
              <CardContent className="py-12 text-center space-y-4">
                <p className="text-red-600 dark:text-red-500 font-semibold">
                  Error loading posts
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {error instanceof Error ? error.message : "Unknown error"}
                </p>
                {!process.env.NEXT_PUBLIC_DIRECTUS_URL && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please check if NEXT_PUBLIC_DIRECTUS_URL environment
                    variable is set
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }
}

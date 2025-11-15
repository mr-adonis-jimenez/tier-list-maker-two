"use client";

import { readItems } from "@directus/sdk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import directus from "@/lib/directus";

interface RecentPostsProps {
  posts: Array<{
    id: string;
    title: string;
    slug: string;
    description?: string;
    published_at: string;
  }>;
}

export async function getRecentPosts(currentSlug: string) {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: { _eq: "published" },
          slug: { _neq: currentSlug },
        },
        fields: ["id", "title", "slug", "description", "published_at"],
        sort: ["-published_at"],
        limit: 6,
      }),
    );

    return posts;
  } catch (error) {
    console.error("[v0] Error fetching recent posts:", error);
    return [];
  }
}

export function RecentPosts({ posts }: RecentPostsProps) {
  const router = useRouter();

  const handlePostClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();
    router.push(`/posts/${slug}`);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            Recent Posts
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Check out our latest articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                onClick={(e) => handlePostClick(e, post.slug)}
                className="group"
              >
                <Card className="h-full border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  {post.description && (
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

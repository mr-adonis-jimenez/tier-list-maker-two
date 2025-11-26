import { readItems } from "@directus/sdk";
import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import directus from "@/lib/directus";

export const metadata: Metadata = {
  title: "Tier List Maker - Blog",
  description:
    "Read our latest articles and updates about tier lists, features, and more.",
};

export const revalidate = 86400;

export default async function BlogPage() {
  const posts = await directus.request(
    readItems("posts", {
      fields: ["id", "title", "slug", "description", "published_at", "status"],
      filter: {
        status: { _eq: "published" },
      },
      sort: ["-published_at"],
      limit: -1,
    }),
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div></div>
          <div className="flex gap-2">
            <ThemeToggle />
            <LanguageSwitcher currentLocale="en" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-balance text-4xl font-bold tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Explore our latest articles and updates
          </p>
        </div>

        {posts.length === 0 ? (
          <Card className="border border-border bg-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No posts published yet</p>
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
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary border border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 text-pretty">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

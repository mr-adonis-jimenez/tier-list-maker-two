import { readItems } from "@directus/sdk";
import { BookOpen, Home } from "lucide-react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownWithIds } from "@/components/blog/markdown-with-ids";
import { PostCTA } from "@/components/blog/post-cta";
import { RecentPosts } from "@/components/blog/recent-posts";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultLocale, supportedLocales } from "@/lib/constants";
import directus from "@/lib/directus";
import { type LanguageType, t } from "@/lib/translations";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: {
            _eq: "published",
          },
          language: {
            _in: supportedLocales,
          },
        },
        fields: ["slug", "language"],
        limit: -1,
      }),
    );

    return supportedLocales.flatMap((lang) =>
      posts
        .filter((post) => post.language === lang)
        .map((post) => ({
          lang,
          slug: post.slug,
        })),
    );
  } catch (error) {
    console.error("[v0] Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
          language: {
            _eq: lang,
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
          "language",
        ],
        limit: 1,
      }),
    );

    const post = posts[0];

    if (!post) {
      return {
        title: t("common.error", lang as LanguageType),
      };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: t("common.error", lang as LanguageType),
    };
  }
}

export default async function PostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const { isEnabled } = await draftMode();
  const locale = (lang || defaultLocale) as LanguageType;

  const homePath = locale === defaultLocale ? "/" : `/${locale}`;
  const postsPath = locale === defaultLocale ? "/posts" : `/${locale}/posts`;

  try {
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          slug: {
            _eq: slug,
          },
          language: {
            _eq: lang,
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
          language: { _eq: locale },
        },
        fields: [
          "id",
          "title",
          "slug",
          "description",
          "published_at",
          "language",
        ],
        sort: ["-published_at"],
        limit: 6,
      }),
    );

    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Link href={homePath} scroll={false}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("nav.home", locale)}
                  </span>
                </Button>
              </Link>
              <Link href={postsPath} scroll={false}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("nav.posts", locale)}
                  </span>
                </Button>
              </Link>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          {isEnabled && (
            <Card className="mb-6 border-primary bg-card">
              <CardContent className="py-3">
                <p className="text-sm font-medium">
                  Draft mode enabled - You are previewing unpublished content
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-8">
            <article className="flex-1 min-w-0">
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold mb-2 text-balance">
                    {title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(published_at).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {description && (
                    <p className="text-lg text-muted-foreground mt-4 text-pretty">
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
      </div>
    );
  } catch (error) {
    console.error("[v0] Error fetching post:", error);
    notFound();
  }
}

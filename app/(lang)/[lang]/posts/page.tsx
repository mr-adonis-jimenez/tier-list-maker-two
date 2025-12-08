import { readItems } from "@directus/sdk";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { defaultLocale, supportedLocales } from "@/lib/constants";
import directus from "@/lib/directus";
import { type LanguageType, t, translations } from "@/lib/translations";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang || defaultLocale) as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  return {
    title: `${t("nav.posts", locale)} - Tier List Maker`,
    description:
      dict["metadata.description"] ||
      "Read our latest articles and updates about tier lists.",
  };
}

export async function generateStaticParams() {
  return supportedLocales.map((lang: LanguageType) => ({ lang }));
}

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = (lang || defaultLocale) as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  const posts = await directus.request(
    readItems("posts", {
      fields: [
        "id",
        "title",
        "slug",
        "description",
        "published_at",
        "status",
        "language",
      ],
      filter: {
        status: { _eq: "published" },
        language: { _eq: lang },
      },
      sort: ["-published_at"],
      limit: -1,
    }),
  );

  const homePath = locale === defaultLocale ? "/" : `/${locale}`;
  const postsPath = locale === defaultLocale ? "/posts" : `/${locale}/posts`;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <Link href={homePath} scroll={false}>
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{t("nav.home", locale)}</span>
            </Button>
          </Link>
          <div className="flex gap-2">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-balance text-4xl font-bold tracking-tight">
            {t("nav.posts", locale)}
          </h1>
          <p className="text-muted-foreground">
            {dict["app.hero.subtitle"] ||
              "Explore our latest articles and updates"}
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
                href={`${postsPath}/${post.slug}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary border border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(post.published_at).toLocaleDateString(locale, {
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

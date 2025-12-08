import { readItems } from "@directus/sdk";
import type { MetadataRoute } from "next";
import { allLanguages, defaultLocale, supportedLocales } from "@/lib/constants";
import directus from "@/lib/directus";
import type { LanguageType } from "@/lib/translations";

export const revalidate = 86400; // 24 hours in seconds

const staticRoutes = [
  "/", // Default language (en) root path
  "/posts", // Default language posts
  "/about", // Default language about
  "/contact", // Default language contact
  "/privacy", // Default language privacy
  "/faq", // Default language faq
  "/terms", // Default language terms
  ...supportedLocales.map((lang: LanguageType) => `/${lang}`), // Other language root paths
  ...supportedLocales.flatMap((lang: LanguageType) => [
    `/${lang}/posts`,
    `/${lang}/about`,
    `/${lang}/contact`,
    `/${lang}/privacy`,
    `/${lang}/faq`,
    `/${lang}/terms`,
  ]), // Other language pages
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://tierlistmakertwo.top";

  try {
    // Generate static pages
    const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === "/" ? ("monthly" as const) : ("weekly" as const),
      priority: route === "/" ? 1.0 : 0.8,
    }));

    // Fetch all published posts from Directus for dynamic routes
    const posts = await directus.request(
      readItems("posts", {
        filter: {
          status: { _eq: "published" },
          language: { _in: allLanguages },
        },
        fields: ["slug", "published_at", "date_updated", "language"],
        sort: ["-published_at"],
      }),
    );

    // Generate sitemap entries for all posts by language
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
      const lang = post.language as LanguageType;
      const postPath =
        lang === defaultLocale
          ? `/posts/${post.slug}` // Default language
          : `/${lang}/posts/${post.slug}`; // Other languages

      return {
        url: `${baseUrl}${postPath}`,
        lastModified: new Date(post.date_updated || post.published_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: allLanguages.reduce(
            (acc, language) => {
              const path =
                language === defaultLocale
                  ? `/posts/${post.slug}`
                  : `/${language}/posts/${post.slug}`;
              acc[language] = `${baseUrl}${path}`;
              return acc;
            },
            {} as Record<LanguageType, string>,
          ),
        },
      };
    });

    return [...staticPages, ...postEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal fallback if everything fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1.0,
      },
    ];
  }
}

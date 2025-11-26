import { readItems } from "@directus/sdk";
import type { MetadataRoute } from "next";
import directus from "@/lib/directus";
import { locales } from "@/lib/i18n/translations";

export const revalidate = 86400; // 24 hours in seconds

const staticRoutes = [
  "/",
  "/posts",
  "/about",
  "/contact",
  "/privacy",
  "/faq",
  "/terms",
  ...locales.map((item) => `/${item}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tierlistmakertwo.top";

  try {
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
        },
        fields: ["slug", "published_at", "date_updated"],
        sort: ["-published_at"],
      }),
    );

    // Generate sitemap entries for all posts
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date_updated || post.published_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

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

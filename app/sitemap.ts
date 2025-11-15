import { readdirSync } from "node:fs";
import { join } from "node:path";
import { readItems } from "@directus/sdk";
import type { MetadataRoute } from "next";
import directus from "@/lib/directus";

export const revalidate = 86400; // 24 hours in seconds

function discoverRoutes(dir: string, baseDir: string = dir): string[] {
  const routes: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      // Skip api routes, private folders, and node_modules
      if (
        entry.name.startsWith("_") ||
        entry.name === "api" ||
        entry.name === "node_modules"
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        // Skip dynamic route segments for now (we'll handle them separately)
        if (!entry.name.startsWith("[")) {
          routes.push(...discoverRoutes(fullPath, baseDir));
        }
      } else if (
        entry.name === "page.tsx" ||
        entry.name === "page.ts" ||
        entry.name === "page.jsx" ||
        entry.name === "page.js"
      ) {
        // Convert file path to URL route
        const relativePath = dir.replace(baseDir, "");
        const route = relativePath === "" ? "/" : relativePath;
        routes.push(route);
      }
    }
  } catch (error) {
    console.error("[v0] Error discovering routes:", error);
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  try {
    const appDir = join(process.cwd(), "app");
    const discoveredRoutes = discoverRoutes(appDir);

    console.log("[v0] Discovered routes:", discoveredRoutes);

    // Generate sitemap entries for discovered static routes
    const staticPages: MetadataRoute.Sitemap = discoveredRoutes.map(
      (route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency:
          route === "/" ? ("monthly" as const) : ("weekly" as const),
        priority: route === "/" ? 1.0 : 0.8,
      }),
    );

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
    console.error("[v0] Error generating sitemap:", error);
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

import { createDirectus, rest, staticToken } from "@directus/sdk";

type Post = {
  id: string;
  sort: number | null;
  date_created: string;
  user_created: string;
  date_updated: string;
  user_updated: string;
  title: string;
  slug: string;
  site_id: number;
  status: "published" | "draft" | "archived";
  published_at: string;
  description: string;
  author: string;
  tags: string | null;
  image: string | null;
  content: string;
  read_time: number | null;
  unique_view_count: number;
  view_count: number;
  last_viewed_at: string | null;
  imageurl: string | null;
  seo: {
    title: string;
    meta_description: string;
  };
};

type Schema = {
  posts: Post[];
};

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const accessToken = process.env.DIRECTUS_ACCESS_TOKEN;

const directus = createDirectus<Schema>(directusUrl || "http://localhost:8055")
  .with(rest())
  .with(staticToken(accessToken || ""));

export default directus;
export type { Post };

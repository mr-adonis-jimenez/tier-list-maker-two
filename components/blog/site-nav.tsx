import Link from "next/link";
import { BlogThemeToggle } from "./blog-theme-toggle";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-purple-500 dark:border-purple-400 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          Tier List Maker
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            Home
          </Link>
          <Link
            scroll={false}
            href="/posts"
            className="px-4 py-2 rounded-lg text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all font-bold"
          >
            Posts
          </Link>
          <BlogThemeToggle />
        </div>
      </div>
    </nav>
  );
}

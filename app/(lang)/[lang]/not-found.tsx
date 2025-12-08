import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900 font-sans">
      <div className="text-center space-y-8 max-w-lg mx-auto px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            lang 404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
            Page Not Found
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>

          <div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-700/50">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 uppercase tracking-wide">
              What you can do:
            </h3>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                Check the URL for typos or errors
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
                Try visiting our homepage to find what you need
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></span>
                Browse our available languages
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></span>
                Use the navigation menu to explore our site
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href="/" className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Homepage
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <Link href="/en" className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              English Version
            </Link>
          </Button>
        </div>

        <div className="pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Lost? Don't worry, even the best explorers sometimes take wrong
            turns!
          </p>
        </div>
      </div>
    </div>
  );
}

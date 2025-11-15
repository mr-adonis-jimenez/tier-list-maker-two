"use client";

import { ThemeProvider } from "@/components/blog/theme-provider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="blog-theme"
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
}

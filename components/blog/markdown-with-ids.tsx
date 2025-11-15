"use client";

import { useEffect } from "react";
import { Streamdown } from "streamdown";

export function MarkdownWithIds({ content }: { content: string }) {
  useEffect(() => {
    const headings = document.querySelectorAll(
      "article h1, article h2, article h3, article h4, article h5, article h6",
    );
    headings.forEach((heading) => {
      const text = heading.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      heading.id = id;
    });
  }, [content]);

  return <Streamdown>{content}</Streamdown>;
}

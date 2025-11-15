"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match = headingRegex.exec(content);

    while (match !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      extractedHeadings.push({ id, text, level });
      match = headingRegex.exec(content);
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" },
    );

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    headingElements.forEach((el) => {
      el && observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <Card className="sticky top-6 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 hidden lg:block">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 dark:text-white">
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block py-1 text-sm transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
              activeId === heading.id
                ? "text-purple-600 dark:text-purple-400 font-medium"
                : "text-gray-600 dark:text-gray-400"
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {heading.text}
          </a>
        ))}
      </CardContent>
    </Card>
  );
}

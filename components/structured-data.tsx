"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  type?: "website" | "webapp" | "article" | "organization";
  data?: Record<string, unknown>;
}

export function StructuredData({ type = "webapp", data = {} }: StructuredDataProps) {
  useEffect(() => {
    const structuredData = getStructuredData(type, data);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    script.id = "structured-data";

    const existingScript = document.getElementById("structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}

function getStructuredData(type: string, customData: Record<string, unknown>) {
  const baseUrl = "https://tierlistmakertwo.top";

  switch (type) {
    case "webapp":
      return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Tier List Maker",
        alternateName: "Tier List Maker - Create Custom Rankings",
        url: baseUrl,
        description:
          "Free online tier list maker. Upload images, drag & drop to create custom tier lists (S/A/B/C/D). Export as PNG.",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Tier List Maker Team",
        },
        inLanguage: ["en", "ja", "ru"],
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        screenshot: `${baseUrl}/og-image.png`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1250",
        },
      };

    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Tier List Maker",
        url: baseUrl,
        logo: `${baseUrl}/android-chrome-512x512.png`,
        sameAs: [
          // Add social media URLs when available
        ],
      };

    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Tier List Maker",
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };

    default:
      return customData;
  }
}

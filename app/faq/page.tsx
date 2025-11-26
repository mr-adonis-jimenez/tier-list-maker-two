import type { Metadata } from "next";
import { FAQClient } from "./faq-client";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "FAQ - Tier List Maker",
  description: "Frequently asked questions about Tier List Maker. Find answers to common questions about features, usage, and troubleshooting.",
};

export default function FAQPage() {
  return (
    <>
      <StructuredData
        type="website"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: "FAQ - Tier List Maker",
          url: "https://tierlistmakertwo.top/faq",
          description:
            "Frequently asked questions about Tier List Maker. Find answers to common questions about features, usage, and troubleshooting.",
        }}
      />
      <FAQClient />
    </>
  );
}

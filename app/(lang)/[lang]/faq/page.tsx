import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { defaultLocale } from "@/lib/constants";
import { type LanguageType, translations } from "@/lib/translations";
import { FAQClient } from "./faq-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  return {
    title: `${dict["faq.title"] || "FAQ"} - Tier List Maker`,
    description:
      dict["faq.subtitle"] ||
      "Frequently asked questions about Tier List Maker. Find answers to common questions about features, usage, and troubleshooting.",
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

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
      <FAQClient locale={lang} dict={dict} />
    </>
  );
}

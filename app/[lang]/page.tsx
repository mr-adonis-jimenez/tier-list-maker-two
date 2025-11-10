import type { Metadata } from "next";
import { redirect } from "next/navigation";
import TierListMaker from "@/components/tier-list-maker";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale, type Locale, locales } from "@/lib/i18n/translations";

interface PageProps {
  params: Promise<{ lang?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.lang || defaultLocale) as Locale;
  const dict = getDictionary(locale);

  return {
    title: `${dict.title} - Tier List Maker`,
    description:
      dict.description ||
      "Create custom tier lists by uploading images and ranking them.",
  };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocalePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.lang || defaultLocale) as Locale;

  if (resolvedParams.lang && !locales.includes(locale)) {
    redirect("/");
  }

  const dict = getDictionary(locale);

  return <TierListMaker dictionary={dict} locale={locale} />;
}

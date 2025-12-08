import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TierListMaker } from "@/components/tier-list-maker";
import { allLanguages, defaultLocale } from "@/lib/constants";
import { type LanguageType, translations } from "@/lib/translations";

interface PageProps {
  params: Promise<{ lang?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.lang || defaultLocale) as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  return {
    title: `Tier List Maker`,
    description:
      dict["app.hero.subtitle"] ||
      "Create custom tier lists by uploading images and ranking them.",
  };
}

export async function generateStaticParams() {
  return allLanguages.map((lang) => ({ lang }));
}

export default async function LocalePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.lang || defaultLocale) as LanguageType;

  if (resolvedParams.lang && !allLanguages.includes(locale)) {
    redirect("/");
  }

  const dict = translations[locale] || translations[defaultLocale];

  const dictionary = {
    title: dict["tierlist.title"] || "Tier List Maker",
    description:
      dict["tierlist.description"] || "Create and share your custom tier lists",
    addImages: dict["tierlist.addImages"] || "Add Images",
    export: dict["tierlist.export"] || "Export",
    clearAll: dict["tierlist.clearAll"] || "Clear All",
    unassignedTitle: dict["tierlist.unassignedTitle"] || "Unassigned",
    unassignedPlaceholder:
      dict["tierlist.unassignedPlaceholder"] || "Drag images here",
    tierLabels: {
      S: dict["tierlist.tierLabels.S"] || "S",
      A: dict["tierlist.tierLabels.A"] || "A",
      B: dict["tierlist.tierLabels.B"] || "B",
      C: dict["tierlist.tierLabels.C"] || "C",
      D: dict["tierlist.tierLabels.D"] || "D",
    },
    blog: "Blog",
  };

  return <TierListMaker dictionary={dictionary} locale={locale} />;
}

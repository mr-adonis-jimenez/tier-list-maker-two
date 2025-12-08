import { TierListMaker } from "@/components/tier-list-maker";
import type { LanguageType } from "@/lib/translations";

export default function RootPage() {
  const locale: LanguageType = "en";
  const dictionary = {
    title: "Tier List Maker",
    description:
      "Create and share your custom tier lists with drag & drop functionality",
    addImages: "Add Images",
    export: "Export",
    clearAll: "Clear All",
    unassignedTitle: "Unassigned",
    unassignedPlaceholder: "Drag images here",
    tierLabels: {
      S: "S Tier",
      A: "A Tier",
      B: "B Tier",
      C: "C Tier",
      D: "D Tier",
    },
    blog: "Blog",
  };

  return <TierListMaker dictionary={dictionary} locale={locale} />;
}

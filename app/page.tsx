import type { Metadata } from "next";
import { TierListMaker } from "@/components/tier-list-maker";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const metadata: Metadata = {
  title: "Tier List Maker - Create Custom Rankings",
  description:
    "Create custom tier lists by uploading images and ranking them into S, A, B, C, and D tiers.",
};

export default function RootPage() {
  const dict = getDictionary("en");

  return <TierListMaker dictionary={dict} locale="en" />;
}

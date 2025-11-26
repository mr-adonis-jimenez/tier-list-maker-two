import { TierListMaker } from "@/components/tier-list-maker";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default function RootPage() {
  const dict = getDictionary("en");

  return <TierListMaker dictionary={dict} locale="en" />;
}

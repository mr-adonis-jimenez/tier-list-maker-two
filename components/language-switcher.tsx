"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/lib/i18n/translations";

const languages = {
  en: "English",
  ja: "日本語",
  ru: "Русский",
};

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    const isLocaleInPath = ["en", "ja", "ru"].includes(segments[0]);

    let newPath: string;
    if (newLocale === "en") {
      newPath = isLocaleInPath ? `/${segments.slice(1).join("/")}` : pathname;
    } else {
      if (isLocaleInPath) {
        segments[0] = newLocale;
        newPath = `/${segments.join("/")}`;
      } else {
        newPath = `/${newLocale}${pathname === "/" ? "" : pathname}`;
      }
    }

    router.push(newPath || "/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([locale, label]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale as Locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

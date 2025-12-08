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
import { languageNames, supportedLocales } from "@/lib/constants";
import type { LanguageType } from "@/lib/translations";

export function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: LanguageType;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: LanguageType) => {
    const segments = pathname.split("/").filter(Boolean);
    const isLocaleInPath = supportedLocales.includes(
      segments[0] as LanguageType,
    );

    let newPath: string;
    if (newLocale === "en") {
      // Switching to default language - remove language prefix if present
      newPath = isLocaleInPath ? `/${segments.slice(1).join("/")}` : pathname;
    } else {
      // Switching to non-default language
      if (isLocaleInPath) {
        // Replace existing language prefix
        segments[0] = newLocale;
        newPath = `/${segments.join("/")}`;
      } else {
        // Add language prefix
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
        {Object.entries(languageNames).map(([locale, label]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale as LanguageType)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

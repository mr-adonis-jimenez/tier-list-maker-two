import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ThemeProvider } from "@/components/theme-provider";
import { supportedLocales } from "@/lib/constants";
import type { LanguageType } from "@/lib/translations";
import { t } from "@/lib/translations/index";
import "../../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = lang as LanguageType;

  // Validate that the incoming `lang` parameter is valid
  if (!supportedLocales.includes(language)) {
    redirect("/");
  }

  return {
    title: t("app.title", language),
    description: t("app.hero.subtitle", language),
    keywords:
      "exam, countdown, timer, SAT, ACT, GRE, TOEFL, GMAT, standardized tests, test dates",
    openGraph: {
      title: t("app.title", language),
      description: t("app.hero.subtitle", language),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("app.title", language),
      description: t("app.hero.subtitle", language),
    },
    alternates: {
      languages: {
        en: "/",
        ...supportedLocales.reduce(
          (acc, locale) => {
            acc[locale] = `/${locale}`;
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Validate that the incoming `lang` parameter is valid
  if (!supportedLocales.includes(lang as LanguageType)) {
    redirect("/");
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

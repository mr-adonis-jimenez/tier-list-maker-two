import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/lib/constants";
import { type LanguageType, translations } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  return {
    title: `${dict["about.title"] || "About Tier List Maker"} - Tier List Maker`,
    description:
      dict["about.subtitle"] ||
      "Learn about our mission to help users create custom tier lists for ranking images and items with ease.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  // Generate localized path
  const getLocalizedPath = (path: string) => {
    return lang === "en" ? path : `/${lang}${path}`;
  };
  return (
    <>
      <StructuredData type="organization" />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold tracking-tight">
              {dict["about.title"] || "About Tier List Maker"}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground">
                {dict["about.subtitle"] ||
                  "Welcome to Tier List Maker, the ultimate tool for creating custom tier lists with ease and simplicity."}
              </p>

              <h2 className="mt-12 text-3xl font-bold">
                {dict["about.mission.title"] || "Our Mission"}
              </h2>
              <p>
                {dict["about.mission.content"] ||
                  "Our mission is to provide users with an intuitive and powerful platform for creating tier lists. Whether you're ranking your favorite movies, games, characters, or any other items, our tool makes it simple and fun to organize and share your rankings."}
              </p>

              <h2 className="mt-12 text-3xl font-bold">
                {dict["about.whatwedo.title"] || "What We Offer"}
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  <strong>
                    {dict["about.whatwedo.easy_upload"] || "Easy Image Upload"}:
                  </strong>{" "}
                  {dict["about.whatwedo.easy_upload_content"] ||
                    "Quickly upload multiple images to start creating your tier list"}
                </li>
                <li>
                  <strong>
                    {dict["about.whatwedo.drag_drop"] ||
                      "Drag & Drop Interface"}
                    :
                  </strong>{" "}
                  {dict["about.whatwedo.drag_drop_content"] ||
                    "Intuitive drag-and-drop functionality to arrange items across tiers"}
                </li>
                <li>
                  <strong>
                    {dict["about.whatwedo.export"] || "Export Options"}:
                  </strong>{" "}
                  {dict["about.whatwedo.export_content"] ||
                    "Export your tier lists as high-quality images to share on social media or save for personal use"}
                </li>
                <li>
                  <strong>
                    {dict["about.whatwedo.tiers"] || "Multiple Tiers"}:
                  </strong>{" "}
                  {dict["about.whatwedo.tiers_content"] ||
                    "Organize items into S, A, B, C, and D tiers (or customize as needed)"}
                </li>
                <li>
                  <strong>
                    {dict["about.whatwedo.multilang"] ||
                      "Multi-language Support"}
                    :
                  </strong>{" "}
                  {dict["about.whatwedo.multilang_content"] ||
                    "Available in English, Japanese, and Russian"}
                </li>
                <li>
                  <strong>
                    {dict["about.whatwedo.theme"] || "Dark/Light Theme"}:
                  </strong>{" "}
                  {dict["about.whatwedo.theme_content"] ||
                    "Choose your preferred theme for the best viewing experience"}
                </li>
              </ul>

              <h2 className="mt-12 text-3xl font-bold">
                {dict["about.whychoose.title"] || "Why Choose Us?"}
              </h2>
              <p>
                {dict["about.whychoose.content"] ||
                  "We believe that ranking and organizing items should be simple, fast, and enjoyable. Our tool is designed to be user-friendly for everyone, from casual users to professionals. We continuously improve our platform based on user feedback to provide the best experience possible."}
              </p>

              <h2 className="mt-12 text-3xl font-bold">
                {dict["about.ourstory.title"] || "Our Story"}
              </h2>
              <p>
                {dict["about.ourstory.content"] ||
                  "Tier List Maker was created to solve the common problem of wanting to rank items visually without complicated software. We noticed that existing solutions were either too complex or lacked key features like easy export and sharing options. So we built a solution that's both powerful and simple to use."}
              </p>

              <h2 className="mt-12 text-3xl font-bold">
                {dict["about.contact.title"] || "Contact Us"}
              </h2>
              <p>
                {dict["about.contact.content"] ||
                  "Have questions, suggestions, or feedback? We'd love to hear from you! Visit our Contact Us page to get in touch."}
              </p>
            </div>

            <div className="mt-16 flex gap-4">
              <Button asChild>
                <Link href={getLocalizedPath("/")}>
                  {dict["tierlist.startCreating"] || "Start Creating"}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={getLocalizedPath("/faq")}>
                  {dict["tierlist.viewFAQ"] || "View FAQ"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

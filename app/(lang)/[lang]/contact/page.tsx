import { BookOpen, Mail, MessageSquare } from "lucide-react";
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
    title: `${dict["contact.title"] || "Contact Us"} - Tier List Maker`,
    description:
      dict["contact.subtitle"] ||
      "Get in touch with the Tier List Maker team. We welcome your questions, feedback, and suggestions.",
  };
}

export default async function ContactPage({
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
      <StructuredData
        type="website"
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Us - Tier List Maker",
          url: "https://tierlistmakertwo.top/contact",
          description:
            "Get in touch with the Tier List Maker team. We welcome your questions, feedback, and suggestions.",
          mainEntity: {
            "@type": "Organization",
            name: "Tier List Maker",
            contactPoint: {
              "@type": "ContactPoint",
              email: "contact@tierlistmakertwo.top",
              contactType: "customer service",
            },
          },
        }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold tracking-tight">
              {dict["contact.title"] || "Contact Us"}
            </h1>

            <p className="mb-12 text-lg text-muted-foreground">
              {dict["contact.subtitle"] ||
                "We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, please don't hesitate to reach out."}
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <Mail className="mb-4 h-8 w-8 text-primary" />
                <h2 className="mb-2 text-2xl font-bold">
                  {dict["contact.general.title"] || "General Inquiries"}
                </h2>
                <p className="mb-4 text-muted-foreground">
                  {dict["contact.general.description"] ||
                    "For general questions about our service, feature requests, or feedback."}
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {dict["contact.general.email"] || "Email:"}
                  </p>
                  <a
                    href="mailto:contact@tierlistmakertwo.top"
                    className="text-primary underline"
                  >
                    contact@tierlistmakertwo.top
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <MessageSquare className="mb-4 h-8 w-8 text-primary" />
                <h2 className="mb-2 text-2xl font-bold">
                  {dict["contact.support.title"] || "Support"}
                </h2>
                <p className="mb-4 text-muted-foreground">
                  {dict["contact.support.description"] ||
                    "Need help using our platform? Check out our FAQ or contact us for assistance."}
                </p>
                <Button asChild className="w-full">
                  <Link href="/faq">
                    {dict["contact.support.button"] || "View FAQ"}
                  </Link>
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <BookOpen className="mb-4 h-8 w-8 text-primary" />
                <h2 className="mb-2 text-2xl font-bold">
                  {dict["contact.blog.title"] || "Blog"}
                </h2>
                <p className="mb-4 text-muted-foreground">
                  {dict["contact.blog.description"] ||
                    "Stay updated with the latest news, features, and tutorials on our blog."}
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/posts">
                    {dict["contact.blog.button"] || "Read Our Blog"}
                  </Link>
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-2 text-2xl font-bold">
                  {dict["contact.social.title"] || "Social Media"}
                </h2>
                <p className="mb-4 text-muted-foreground">
                  {dict["contact.social.description"] ||
                    "Follow us on social media for updates and community discussions."}
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict["contact.social.twitter"] || "Twitter"}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict["contact.social.github"] || "GitHub"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-lg border border-border bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">
                {dict["contact.important.title"] || "Other Important Pages"}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href={getLocalizedPath("/privacy")}>
                    {dict["footer.privacyPolicy"] || "Privacy Policy"}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={getLocalizedPath("/terms")}>
                    {dict["footer.termsOfService"] || "Terms of Service"}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={getLocalizedPath("/about")}>
                    {dict["contact.important.about"] || "About Us"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

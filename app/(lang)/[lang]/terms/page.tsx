import type { Metadata } from "next";
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
    title: `${dict["terms.title"] || "Terms of Service"} - Tier List Maker`,
    description:
      dict["terms.description"] ||
      "Read our terms of service to understand the rules and guidelines for using Tier List Maker.",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as LanguageType;
  const dict = translations[locale] || translations[defaultLocale];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            {dict["terms.title"] || "Terms of Service"}
          </h1>

          <div className="mb-8 text-sm text-muted-foreground">
            {dict["terms.lastUpdated"] || "Last updated:"} November 26, 2025
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              {dict["terms.intro"] ||
                "Welcome to Tier List Maker. These Terms of Service govern your use of our website and services. By using our service, you agree to be bound by these terms."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section1.title"] || "1. Acceptance of Terms"}
            </h2>
            <p>
              {dict["terms.section1.content"] ||
                'By accessing or using Tier List Maker ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, then you may not access the Service.'}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section2.title"] || "2. Description of Service"}
            </h2>
            <p>
              {dict["terms.section2.content"] ||
                "Tier List Maker is a web-based tool that allows users to create custom tier lists by uploading images and organizing them into different tier categories. The Service is provided free of charge and is accessible to anyone with an internet connection."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section3.title"] || "3. User Accounts"}
            </h2>
            <p>
              {dict["terms.section3.content"] ||
                "Currently, no user accounts are required to use the Service. Users can create tier lists anonymously. We reserve the right to implement user accounts in the future, in which case additional terms and conditions will apply."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section4.title"] || "4. Acceptable Use"}
            </h2>
            <p>
              {dict["terms.section4.intro"] ||
                "You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:"}
            </p>
            <ul className="list-disc pl-6">
              <li>
                {dict["terms.section4.item1"] ||
                  "In any way that violates applicable laws or regulations"}
              </li>
              <li>
                {dict["terms.section4.item2"] ||
                  "To transmit, or procure the sending of, any advertising or promotional material without our prior written consent"}
              </li>
              <li>
                {dict["terms.section4.item3"] ||
                  "To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity"}
              </li>
              <li>
                {dict["terms.section4.item4"] ||
                  "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service"}
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section5.title"] || "5. Content Policy"}
            </h2>
            <p>
              {dict["terms.section5.intro"] ||
                "You retain ownership of any content you upload to the Service. However, by using the Service, you grant us a limited license to use, display, and distribute your content as necessary to provide the Service. You represent and warrant that:"}
            </p>
            <ul className="list-disc pl-6">
              <li>
                {dict["terms.section5.item1"] ||
                  "You own or have the necessary rights to use and authorize us to use your content"}
              </li>
              <li>
                {dict["terms.section5.item2"] ||
                  "Your content does not infringe upon any third-party rights"}
              </li>
              <li>
                {dict["terms.section5.item3"] ||
                  "Your content is not illegal, harmful, threatening, abusive, harassing, or otherwise objectionable"}
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section6.title"] || "6. Intellectual Property"}
            </h2>
            <p>
              {dict["terms.section6.content"] ||
                "The Service and its original content, features, and functionality are and will remain the exclusive property of Tier List Maker and its licensors. The Service is protected by copyright, trademark, and other laws."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section7.title"] || "7. Privacy"}
            </h2>
            <p>
              {dict["terms.section7.content"] ||
                "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section8.title"] ||
                "8. Disclaimers and Limitation of Liability"}
            </h2>
            <p>
              {dict["terms.section8.intro"] ||
                'The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:'}
            </p>
            <ul className="list-disc pl-6">
              <li>
                {dict["terms.section8.item1"] ||
                  "Excludes all representations and warranties relating to this website and its contents"}
              </li>
              <li>
                {dict["terms.section8.item2"] ||
                  "Does not warrant that the Service will be constantly available or available at all"}
              </li>
              <li>
                {dict["terms.section8.item3"] ||
                  "Does not warrant that the Service will be error-free or uninterrupted"}
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section9.title"] || "9. Termination"}
            </h2>
            <p>
              {dict["terms.section9.content"] ||
                "We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section10.title"] || "10. Changes to Terms"}
            </h2>
            <p>
              {dict["terms.section10.content"] ||
                "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["terms.section11.title"] || "11. Contact Information"}
            </h2>
            <p>
              {dict["terms.section11.intro"] ||
                "If you have any questions about these Terms of Service, please contact us at:"}
            </p>
            <p>
              {dict["terms.section11.email"] ||
                "Email: contact@tierlistmakertwo.top"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

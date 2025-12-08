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
    title: `${dict["privacy.title"] || "Privacy Policy"} - Tier List Maker`,
    description:
      dict["privacy.description"] ||
      "Read our privacy policy to understand how we collect, use, and protect your personal information.",
  };
}

export default async function PrivacyPage({
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
            {dict["privacy.title"] || "Privacy Policy"}
          </h1>

          <div className="mb-8 text-sm text-muted-foreground">
            {dict["privacy.lastUpdated"] || "Last updated:"} November 26, 2025
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              {dict["privacy.intro"] ||
                "At Tier List Maker, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section1.title"] || "1. Information We Collect"}
            </h2>

            <h3 className="mt-8 text-2xl font-bold">
              {dict["privacy.section1.subtitle1"] || "Information You Provide"}
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>{dict["privacy.section1.images"] || "Images:"}</strong>{" "}
                {dict["privacy.section1.images.content"] ||
                  "Images you upload to create tier lists are processed locally in your browser and are not stored on our servers unless you choose to save or share them."}
              </li>
              <li>
                <strong>
                  {dict["privacy.section1.contact"] || "Contact Information:"}
                </strong>{" "}
                {dict["privacy.section1.contact.content"] ||
                  "When you contact us, we may collect your email address and any information you provide in your message."}
              </li>
            </ul>

            <h3 className="mt-8 text-2xl font-bold">
              {dict["privacy.section1.subtitle2"] ||
                "Automatically Collected Information"}
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>
                  {dict["privacy.section1.usage"] || "Usage Data:"}
                </strong>{" "}
                {dict["privacy.section1.usage.content"] ||
                  "We may collect information about how you use our website, including pages visited, time spent on the site, and referring websites."}
              </li>
              <li>
                <strong>
                  {dict["privacy.section1.device"] || "Device Information:"}
                </strong>{" "}
                {dict["privacy.section1.device.content"] ||
                  "We may collect information about the device you use to access our service, including browser type, operating system, and device identifiers."}
              </li>
              <li>
                <strong>
                  {dict["privacy.section1.cookies"] || "Cookies:"}
                </strong>{" "}
                {dict["privacy.section1.cookies.content"] ||
                  "We use cookies and similar technologies to enhance your experience and collect usage data. See our Cookie Policy below for more details."}
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section2.title"] ||
                "2. How We Use Your Information"}
            </h2>
            <ul className="list-disc pl-6">
              <li>
                {dict["privacy.section2.item1"] ||
                  "To provide and maintain our service"}
              </li>
              <li>
                {dict["privacy.section2.item2"] ||
                  "To improve our website and user experience"}
              </li>
              <li>
                {dict["privacy.section2.item3"] ||
                  "To respond to your inquiries and provide customer support"}
              </li>
              <li>
                {dict["privacy.section2.item4"] ||
                  "To analyze usage patterns and optimize our service"}
              </li>
              <li>
                {dict["privacy.section2.item5"] ||
                  "To ensure the security and integrity of our service"}
              </li>
              <li>
                {dict["privacy.section2.item6"] ||
                  "To comply with legal obligations and enforce our terms of service"}
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section3.title"] ||
                "3. How We Share Your Information"}
            </h2>
            <p>
              {dict["privacy.section3.intro"] ||
                "We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:"}
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>
                  {dict["privacy.section3.providers"] || "Service Providers:"}
                </strong>{" "}
                {dict["privacy.section3.providers.content"] ||
                  "We may share information with trusted third-party service providers who assist us in operating our website and providing our services."}
              </li>
              <li>
                <strong>
                  {dict["privacy.section3.legal"] || "Legal Requirements:"}
                </strong>{" "}
                {dict["privacy.section3.legal.content"] ||
                  "We may disclose information when required by law or to protect our rights, property, or safety."}
              </li>
              <li>
                <strong>
                  {dict["privacy.section3.business"] || "Business Transfers:"}
                </strong>{" "}
                {dict["privacy.section3.business.content"] ||
                  "In the event of a merger, acquisition, or sale of assets, user information may be transferred."}
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section4.title"] || "4. Third-Party Services"}
            </h2>
            <p>
              {dict["privacy.section4.content"] ||
                "Our website may contain links to third-party websites or integrate with third-party services. This Privacy Policy does not apply to those external sites or services. We encourage you to review the privacy policies of any third-party services you access."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section5.title"] || "5. Advertising"}
            </h2>
            <p>
              {dict["privacy.section5.content"] ||
                "We may display advertisements on our website through third-party advertising services such as Google AdSense. These services may use cookies or similar technologies to deliver ads based on your browsing history. Please refer to the privacy policies of these advertising partners for more information about their data collection practices."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section6.title"] ||
                "6. Cookies and Tracking Technologies"}
            </h2>
            <p>
              {dict["privacy.section6.intro"] ||
                "We use cookies and similar technologies to enhance your experience on our website. Cookies are small files stored on your device that help us:"}
            </p>
            <ul className="list-disc pl-6">
              <li>
                {dict["privacy.section6.item1"] ||
                  "Remember your preferences and settings"}
              </li>
              <li>
                {dict["privacy.section6.item2"] ||
                  "Analyze website traffic and usage patterns"}
              </li>
              <li>
                {dict["privacy.section6.item3"] ||
                  "Provide personalized content and advertisements"}
              </li>
              <li>
                {dict["privacy.section6.item4"] ||
                  "Improve our website functionality"}
              </li>
            </ul>
            <p>
              {dict["privacy.section6.control"] ||
                "You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section7.title"] || "7. Data Security"}
            </h2>
            <p>
              {dict["privacy.section7.content"] ||
                "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section8.title"] || "8. Your Rights"}
            </h2>
            <p>
              {dict["privacy.section8.intro"] ||
                "Depending on your location, you may have the following rights:"}
            </p>
            <ul className="list-disc pl-6">
              <li>
                {dict["privacy.section8.item1"] ||
                  "Access to your personal information"}
              </li>
              <li>
                {dict["privacy.section8.item2"] ||
                  "Correction of inaccurate information"}
              </li>
              <li>
                {dict["privacy.section8.item3"] ||
                  "Deletion of your personal information"}
              </li>
              <li>
                {dict["privacy.section8.item4"] || "Restriction of processing"}
              </li>
              <li>{dict["privacy.section8.item5"] || "Data portability"}</li>
              <li>
                {dict["privacy.section8.item6"] || "Objection to processing"}
              </li>
            </ul>
            <p>
              {dict["privacy.section8.contact"] ||
                "To exercise these rights, please contact us at contact@tierlistmakertwo.top"}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section9.title"] || "9. Children's Privacy"}
            </h2>
            <p>
              {dict["privacy.section9.content"] ||
                "Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section10.title"] || "10. International Transfers"}
            </h2>
            <p>
              {dict["privacy.section10.content"] ||
                "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy."}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section11.title"] || "11. Changes to This Policy"}
            </h2>
            <p>
              {dict["privacy.section11.content"] ||
                'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.'}
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              {dict["privacy.section12.title"] || "12. Contact Us"}
            </h2>
            <p>
              {dict["privacy.section12.intro"] ||
                "If you have any questions about this Privacy Policy, please contact us at:"}
            </p>
            <p>
              {dict["privacy.section12.email"] ||
                "Email: contact@tierlistmakertwo.top"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

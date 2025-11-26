import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Tier List Maker",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>

          <div className="mb-8 text-sm text-muted-foreground">
            Last updated: November 26, 2025
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              At Tier List Maker, we are committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your information when you use
              our website and services.
            </p>

            <h2 className="mt-12 text-3xl font-bold">1. Information We Collect</h2>

            <h3 className="mt-8 text-2xl font-bold">Information You Provide</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Images:</strong> Images you upload to create tier lists are processed
                locally in your browser and are not stored on our servers unless you choose to
                save or share them.
              </li>
              <li>
                <strong>Contact Information:</strong> When you contact us, we may collect your
                email address and any information you provide in your message.
              </li>
            </ul>

            <h3 className="mt-8 text-2xl font-bold">Automatically Collected Information</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Usage Data:</strong> We may collect information about how you use our
                website, including pages visited, time spent on the site, and referring
                websites.
              </li>
              <li>
                <strong>Device Information:</strong> We may collect information about the
                device you use to access our service, including browser type, operating system,
                and device identifiers.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar technologies to enhance
                your experience and collect usage data. See our Cookie Policy below for more
                details.
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>To provide and maintain our service</li>
              <li>To improve our website and user experience</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To analyze usage patterns and optimize our service</li>
              <li>To ensure the security and integrity of our service</li>
              <li>
                To comply with legal obligations and enforce our terms of service
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">3. How We Share Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third
              parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Service Providers:</strong> We may share information with trusted
                third-party service providers who assist us in operating our website and
                providing our services.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information when required
                by law or to protect our rights, property, or safety.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or
                sale of assets, user information may be transferred.
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">4. Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or integrate with
              third-party services. This Privacy Policy does not apply to those external
              sites or services. We encourage you to review the privacy policies of any
              third-party services you access.
            </p>

            <h2 className="mt-12 text-3xl font-bold">5. Advertising</h2>
            <p>
              We may display advertisements on our website through third-party advertising
              services such as Google AdSense. These services may use cookies or similar
              technologies to deliver ads based on your browsing history. Please refer to
              the privacy policies of these advertising partners for more information about
              their data collection practices.
            </p>

            <h2 className="mt-12 text-3xl font-bold">6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our
              website. Cookies are small files stored on your device that help us:
            </p>
            <ul className="list-disc pl-6">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve our website functionality</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling
              cookies may affect the functionality of our website.
            </p>

            <h2 className="mt-12 text-3xl font-bold">7. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="mt-12 text-3xl font-bold">8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us at contact@tierlistmakertwo.top
            </p>

            <h2 className="mt-12 text-3xl font-bold">9. Children's Privacy</h2>
            <p>
              Our service is not directed to children under the age of 13. We do not
              knowingly collect personal information from children under 13. If you are a
              parent or guardian and believe your child has provided us with personal
              information, please contact us.
            </p>

            <h2 className="mt-12 text-3xl font-bold">10. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than
              your own. We ensure appropriate safeguards are in place to protect your
              information in accordance with this Privacy Policy.
            </p>

            <h2 className="mt-12 text-3xl font-bold">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the "Last
              updated" date. We encourage you to review this Privacy Policy periodically.
            </p>

            <h2 className="mt-12 text-3xl font-bold">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: contact@tierlistmakertwo.top
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

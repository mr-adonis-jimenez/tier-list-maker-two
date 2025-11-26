import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Tier List Maker",
  description:
    "Read our terms of service to understand the rules and guidelines for using Tier List Maker.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>

          <div className="mb-8 text-sm text-muted-foreground">
            Last updated: November 26, 2025
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              Welcome to Tier List Maker. These Terms of Service govern your use
              of our website and services. By using our service, you agree to be
              bound by these terms.
            </p>

            <h2 className="mt-12 text-3xl font-bold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Tier List Maker ("the Service"), you agree
              to be bound by these Terms of Service ("Terms"). If you disagree
              with any part of these terms, then you may not access the Service.
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              2. Description of Service
            </h2>
            <p>
              Tier List Maker is a web-based tool that allows users to create
              custom tier lists by uploading images and organizing them into
              different tier categories. The Service is provided free of charge
              and is accessible to anyone with an internet connection.
            </p>

            <h2 className="mt-12 text-3xl font-bold">3. User Accounts</h2>
            <p>
              Currently, no user accounts are required to use the Service. Users
              can create tier lists anonymously. We reserve the right to
              implement user accounts in the future, in which case additional
              terms would apply.
            </p>

            <h2 className="mt-12 text-3xl font-bold">4. User Conduct</h2>
            <p>
              You agree to use the Service only for lawful purposes and in
              accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Upload or share content that is illegal, harmful, threatening,
                abusive, defamatory, obscene, or otherwise objectionable
              </li>
              <li>Violate any applicable laws or regulations</li>
              <li>
                Infringe upon the rights of others, including intellectual
                property rights
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or other
                users' information
              </li>
              <li>
                Use the Service for any commercial purpose without our prior
                written consent
              </li>
              <li>
                Distribute malware or engage in any activity that could damage
                or interfere with the Service
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">
              5. Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are owned by Tier List Maker and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws. You retain ownership of the images you upload to
              create tier lists. By uploading images, you represent that you
              have the right to use those images and grant us permission to
              process them as part of the Service.
            </p>

            <h2 className="mt-12 text-3xl font-bold">6. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices.
            </p>

            <h2 className="mt-12 text-3xl font-bold">7. Content</h2>
            <h3 className="mt-8 text-2xl font-bold">User Content</h3>
            <p>
              You retain all rights to the content you upload to the Service. By
              using the Service, you grant us a limited license to process your
              content solely for the purpose of providing the Service to you. We
              do not store your images on our servers; they are processed
              locally in your browser.
            </p>

            <h3 className="mt-8 text-2xl font-bold">Service Content</h3>
            <p>
              The Service itself, including its design, code, and functionality,
              is owned by us and is protected by intellectual property laws. You
              may not copy, modify, distribute, or create derivative works based
              on the Service without our express written permission.
            </p>

            <h2 className="mt-12 text-3xl font-bold">8. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE
              MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
              TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
              ERROR-FREE, OR COMPLETELY SECURE, OR THAT DEFECTS WILL BE
              CORRECTED.
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              9. Limitation of Liability
            </h2>
            <p>
              IN NO EVENT SHALL TIER LIST MAKER, NOR ITS DIRECTORS, EMPLOYEES,
              PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
              GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS
              TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
            </p>

            <h2 className="mt-12 text-3xl font-bold">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Tier List Maker
              and its affiliates from and against any claims, damages,
              obligations, losses, liabilities, costs, or debt arising from your
              use of and access to the Service or your violation of these Terms.
            </p>

            <h2 className="mt-12 text-3xl font-bold">11. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
              Upon termination, your right to use the Service will cease
              immediately.
            </p>

            <h2 className="mt-12 text-3xl font-bold">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              It is your responsibility to review these Terms periodically for
              changes. Your continued use of the Service following the posting
              of any changes constitutes acceptance of those changes.
            </p>

            <h2 className="mt-12 text-3xl font-bold">13. Advertising</h2>
            <p>
              We may display advertisements on the Service through third-party
              advertising networks such as Google AdSense. These advertisements
              help support the development and maintenance of the Service. We
              are not responsible for the content of these advertisements or the
              practices of the advertising networks.
            </p>

            <h2 className="mt-12 text-3xl font-bold">14. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites or services
              that are not owned or controlled by Tier List Maker. We have no
              control over, and assume no responsibility for, the content,
              privacy policies, or practices of any third-party websites or
              services.
            </p>

            <h2 className="mt-12 text-3xl font-bold">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Tier List Maker operates,
              without regard to its conflict of law provisions.
            </p>

            <h2 className="mt-12 text-3xl font-bold">16. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or
              unenforceable, the remaining provisions will remain in full force
              and effect. The invalid or unenforceable provision will be
              replaced by a valid and enforceable provision that most closely
              matches the intent of the original provision.
            </p>

            <h2 className="mt-12 text-3xl font-bold">
              17. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p>Email: contact@tierlistmakertwo.top</p>

            <h2 className="mt-12 text-3xl font-bold">18. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and Tier
              List Maker regarding the use of the Service and supersede all
              prior agreements and understandings, whether written or oral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

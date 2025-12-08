import { BookOpen, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us - Tier List Maker",
  description:
    "Get in touch with the Tier List Maker team. We welcome your questions, feedback, and suggestions.",
};

export default function ContactPage() {
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
              Contact Us
            </h1>

            <p className="mb-12 text-lg text-muted-foreground">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to say hello, please don't hesitate to reach out.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <Mail className="mb-4 h-8 w-8 text-primary" />
                <h2 className="mb-2 text-2xl font-bold">General Inquiries</h2>
                <p className="mb-4 text-muted-foreground">
                  For general questions about our service, feature requests, or
                  feedback.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Email:</p>
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
                <h2 className="mb-2 text-2xl font-bold">Support</h2>
                <p className="mb-4 text-muted-foreground">
                  Need help using our platform? Check out our FAQ or contact us
                  for assistance.
                </p>
                <Button asChild className="w-full">
                  <Link href="/faq">View FAQ</Link>
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <BookOpen className="mb-4 h-8 w-8 text-primary" />
                <h2 className="mb-2 text-2xl font-bold">Blog</h2>
                <p className="mb-4 text-muted-foreground">
                  Stay updated with the latest news, features, and tutorials on
                  our blog.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/posts">Read Our Blog</Link>
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-2 text-2xl font-bold">Social Media</h2>
                <p className="mb-4 text-muted-foreground">
                  Follow us on social media for updates and community
                  discussions.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-lg border border-border bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Other Important Pages</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/terms">Terms of Service</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

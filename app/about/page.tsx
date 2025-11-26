import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "About Us - Tier List Maker",
  description: "Learn about our mission to help users create custom tier lists for ranking images and items with ease.",
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="organization" />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">About Tier List Maker</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">
              Welcome to Tier List Maker, the ultimate tool for creating custom tier lists
              with ease and simplicity.
            </p>

            <h2 className="mt-12 text-3xl font-bold">Our Mission</h2>
            <p>
              Our mission is to provide users with an intuitive and powerful platform for
              creating tier lists. Whether you're ranking your favorite movies, games,
              characters, or any other items, our tool makes it simple and fun to organize
              and share your rankings.
            </p>

            <h2 className="mt-12 text-3xl font-bold">What We Offer</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Easy Image Upload:</strong> Quickly upload multiple images to start
                creating your tier list
              </li>
              <li>
                <strong>Drag & Drop Interface:</strong> Intuitive drag-and-drop functionality
                to arrange items across tiers
              </li>
              <li>
                <strong>Export Options:</strong> Export your tier lists as high-quality images
                to share on social media or save for personal use
              </li>
              <li>
                <strong>Multiple Tiers:</strong> Organize items into S, A, B, C, and D tiers
                (or customize as needed)
              </li>
              <li>
                <strong>Multi-language Support:</strong> Available in English, Japanese, and
                Russian
              </li>
              <li>
                <strong>Dark/Light Theme:</strong> Choose your preferred theme for the best
                viewing experience
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold">Why Choose Us?</h2>
            <p>
              We believe that ranking and organizing items should be simple, fast, and
              enjoyable. Our tool is designed to be user-friendly for everyone, from casual
              users to professionals. We continuously improve our platform based on user
              feedback to provide the best experience possible.
            </p>

            <h2 className="mt-12 text-3xl font-bold">Our Story</h2>
            <p>
              Tier List Maker was created to solve the common problem of wanting to rank
              items visually without complicated software. We noticed that existing
              solutions were either too complex or lacked key features like easy export and
              sharing options. So we built a solution that's both powerful and simple to use.
            </p>

            <h2 className="mt-12 text-3xl font-bold">Contact Us</h2>
            <p>
              Have questions, suggestions, or feedback? We'd love to hear from you! Visit our{" "}
              <Link href="/contact" className="text-primary underline">
                Contact Us
              </Link>{" "}
              page to get in touch.
            </p>
          </div>

          <div className="mt-16 flex gap-4">
            <Button asChild>
              <Link href="/">Start Creating</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

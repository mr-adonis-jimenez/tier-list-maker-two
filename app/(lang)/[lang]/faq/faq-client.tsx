"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-border px-6 pb-6 pt-4">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    question: "What is Tier List Maker?",
    answer:
      "Tier List Maker is a web-based tool that allows you to create custom tier lists by uploading images and dragging them into different tier categories (S, A, B, C, D). You can then export your tier list as an image to share with others.",
  },
  {
    question: "How do I upload images?",
    answer:
      "Click the 'Add Images' button on the main page, then select multiple images from your device. The images will appear in the 'Unassigned Images' section, and you can drag them into the appropriate tiers.",
  },
  {
    question: "How do I drag images to tiers?",
    answer:
      "Simply click and hold on an image, then drag it to the desired tier. When you release the mouse (or lift your finger on mobile), the image will be placed in that tier.",
  },
  {
    question: "Can I remove images from tiers?",
    answer:
      "Yes! Each image in a tier has a small trash icon in the top-right corner that you can click to remove it. Alternatively, you can drag an image back to the 'Unassigned Images' section.",
  },
  {
    question: "How do I export my tier list as an image?",
    answer:
      "After arranging your images in tiers, click the 'Export Image' button. This will generate a PNG image of your tier list that you can save to your device or share online.",
  },
  {
    question: "Is there a limit to how many images I can upload?",
    answer:
      "There isn't a strict limit, but we recommend uploading a reasonable number of images for the best performance. Extremely large numbers of images may slow down the application.",
  },
  {
    question: "Are my images stored on your servers?",
    answer:
      "No, your images are processed locally in your browser and are not stored on our servers. Your tier lists are not saved unless you export them as images.",
  },
  {
    question: "Can I use this on mobile devices?",
    answer:
      "Yes! Tier List Maker is fully responsive and works on both desktop and mobile devices. You can use touch gestures to drag and drop images on mobile.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all common image formats including JPG, PNG, GIF, and WebP. The images will be automatically converted if needed when you export your tier list.",
  },
  {
    question: "How do I clear all images and start over?",
    answer:
      "Click the 'Clear All' button at the top of the page. This will remove all images from all tiers and the unassigned section.",
  },
  {
    question: "Can I change the tier labels?",
    answer:
      "The default tier labels are S, A, B, C, and D. These can be customized in the application settings or by modifying the code if you have access to it.",
  },
  {
    question: "Is Tier List Maker free to use?",
    answer:
      "Yes! Tier List Maker is completely free to use. We may display ads to support the development and maintenance of the service.",
  },
  {
    question: "How can I report a bug or request a feature?",
    answer:
      "Please visit our Contact page and send us an email with details about the bug or feature request. We appreciate your feedback!",
  },
  {
    question: "Can I share my tier lists on social media?",
    answer:
      "Absolutely! After exporting your tier list as an image, you can share it on any social media platform, including Twitter, Facebook, Instagram, and more.",
  },
  {
    question: "Why are my exported images blurry?",
    answer:
      "The export function uses a high-quality setting by default. If your images appear blurry, try refreshing the page and exporting again. Very small images may not export with high clarity.",
  },
];

export function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="mb-12 text-lg text-muted-foreground">
            Find answers to common questions about using Tier List Maker. Can't
            find what you're looking for?{" "}
            <Link href="/contact" className="text-primary underline">
              Contact us
            </Link>
            .
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          <div className="mt-16 rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Still have questions?</h2>
            <p className="mb-6 text-muted-foreground">
              We're here to help! Reach out to us and we'll get back to you as
              soon as possible.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

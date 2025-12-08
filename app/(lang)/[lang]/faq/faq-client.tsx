"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LanguageTranslations } from "@/lib/translations";

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

interface FAQData {
  question: string;
  answer: string;
}

export function FAQClient({
  locale = "en",
  dict,
}: {
  locale?: string;
  dict: LanguageTranslations;
}) {
  // Generate localized path
  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`;
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQData[] = [
    {
      question: dict["faq.whatIsTierList.title"] || "What is Tier List Maker?",
      answer:
        dict["faq.whatIsTierList.content"] ||
        "Tier List Maker is a web-based tool that allows you to create custom tier lists by uploading images and dragging them into different tier categories (S, A, B, C, D). You can then export your tier list as an image to share with others.",
    },
    {
      question: dict["faq.uploadImages.title"] || "How do I upload images?",
      answer:
        dict["faq.uploadImages.content"] ||
        "Click the 'Add Images' button on the main page, then select multiple images from your device. The images will appear in the 'Unassigned Images' section, and you can drag them into the appropriate tiers.",
    },
    {
      question:
        dict["faq.dragToTiers.title"] || "How do I drag images to tiers?",
      answer:
        dict["faq.dragToTiers.content"] ||
        "Simply click and hold on an image, then drag it to the desired tier. When you release the mouse (or lift your finger on mobile), the image will be placed in that tier.",
    },
    {
      question:
        dict["faq.removeImages.title"] || "Can I remove images from tiers?",
      answer:
        dict["faq.removeImages.content"] ||
        "Yes! Each image in a tier has a small trash icon in the top-right corner that you can click to remove it. Alternatively, you can drag an image back to the 'Unassigned Images' section.",
    },
    {
      question:
        dict["faq.exportImage.title"] ||
        "How do I export my tier list as an image?",
      answer:
        dict["faq.exportImage.content"] ||
        "After arranging your images in tiers, click the 'Export Image' button. This will generate a PNG image of your tier list that you can save to your device or share online.",
    },
    {
      question:
        dict["faq.imageLimit.title"] ||
        "Is there a limit to how many images I can upload?",
      answer:
        dict["faq.imageLimit.content"] ||
        "There isn't a strict limit, but we recommend uploading a reasonable number of images for the best performance. Extremely large numbers of images may slow down the application.",
    },
    {
      question:
        dict["faq.imageStorage.title"] ||
        "Are my images stored on your servers?",
      answer:
        dict["faq.imageStorage.content"] ||
        "No, your images are processed locally in your browser and are not stored on our servers. Your tier lists are not saved unless you export them as images.",
    },
    {
      question:
        dict["faq.mobileUse.title"] || "Can I use this on mobile devices?",
      answer:
        dict["faq.mobileUse.content"] ||
        "Yes! Tier List Maker is fully responsive and works on both desktop and mobile devices. You can use touch gestures to drag and drop images on mobile.",
    },
    {
      question:
        dict["faq.imageFormats.title"] || "What image formats are supported?",
      answer:
        dict["faq.imageFormats.content"] ||
        "We support all common image formats including JPG, PNG, GIF, and WebP. The images will be automatically converted if needed when you export your tier list.",
    },
    {
      question:
        dict["faq.clearAll.title"] ||
        "How do I clear all images and start over?",
      answer:
        dict["faq.clearAll.content"] ||
        "Click the 'Clear All' button at the top of the page. This will remove all images from all tiers and the unassigned section.",
    },
    {
      question: dict["faq.tierLabels.title"] || "Can I change the tier labels?",
      answer:
        dict["faq.tierLabels.content"] ||
        "The default tier labels are S, A, B, C, and D. These can be customized in the application settings or by modifying the code if you have access to it.",
    },
    {
      question: dict["faq.freeUse.title"] || "Is Tier List Maker free to use?",
      answer:
        dict["faq.freeUse.content"] ||
        "Yes! Tier List Maker is completely free to use. We may display ads to support the development and maintenance of the service.",
    },
    {
      question:
        dict["faq.bugReport.title"] ||
        "How can I report a bug or request a feature?",
      answer:
        dict["faq.bugReport.content"] ||
        "Please visit our Contact page and send us an email with details about the bug or feature request. We appreciate your feedback!",
    },
    {
      question:
        dict["faq.socialShare.title"] ||
        "Can I share my tier lists on social media?",
      answer:
        dict["faq.socialShare.content"] ||
        "Absolutely! After exporting your tier list as an image, you can share it on any social media platform, including Twitter, Facebook, Instagram, and more.",
    },
    {
      question:
        dict["faq.blurryImages.title"] || "Why are my exported images blurry?",
      answer:
        dict["faq.blurryImages.content"] ||
        "The export function uses a high-quality setting by default. If your images appear blurry, try refreshing the page and exporting again. Very small images may not export with high clarity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            {dict["faq.title"] || "Frequently Asked Questions"}
          </h1>

          <p className="mb-12 text-lg text-muted-foreground">
            {dict["faq.subtitle"] ||
              "Find answers to common questions about using Tier List Maker. Can't find what you're looking for?"}{" "}
            <Link
              href={getLocalizedPath("/contact")}
              className="text-primary underline"
            >
              {dict["faq.contactUs"] || "Contact us"}
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
            <h2 className="mb-4 text-2xl font-bold">
              {dict["faq.stillQuestions.title"] || "Still have questions?"}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {dict["faq.stillQuestions.content"] ||
                "We're here to help! Reach out to us and we'll get back to you as soon as possible."}
            </p>
            <Button asChild>
              <Link href={getLocalizedPath("/contact")}>
                {dict["faq.contactUs"] || "Contact Us"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

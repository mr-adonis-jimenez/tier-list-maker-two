import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { StructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tier List Maker - Create Custom Rankings & Tier Lists",
    template: "%s | Tier List Maker",
  },
  description:
    "Free online tier list maker. Upload images, drag & drop to create custom tier lists (S/A/B/C/D). Export as PNG. Perfect for ranking movies, games, characters & more.",
  keywords: [
    "tier list maker",
    "tier list",
    "create tier list",
    "image ranking",
    "drag and drop",
    "tier maker",
    "ranking tool",
    "custom tier list",
    "tier list generator",
    "rank images",
    "tier",
    "S tier",
    "A tier",
    "ranking",
    "tier list online",
  ],
  authors: [{ name: "Tier List Maker Team" }],
  creator: "Tier List Maker",
  publisher: "Tier List Maker",
  metadataBase: new URL("https://tierlistmakertwo.top"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "zh-CN": "/zh",
      "fr-FR": "/fr",
      "es-ES": "/es",
      "ru-RU": "/ru",
      "de-DE": "/de",
      "ja-JP": "/ja",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tierlistmakertwo.top",
    title: "Tier List Maker - Create Custom Rankings & Tier Lists",
    description:
      "Free online tier list maker. Upload images, drag & drop to create custom tier lists. Export as PNG and share your rankings.",
    siteName: "Tier List Maker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tier List Maker - Create Custom Tier Lists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tier List Maker - Create Custom Rankings & Tier Lists",
    description:
      "Free online tier list maker. Upload images, drag & drop to create custom tier lists. Export as PNG and share.",
    images: ["/og-image.png"],
    creator: "@tierlistmaker",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StructuredData type="webapp" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tier List Maker - Create Custom Rankings",
  description:
    "Create custom tier lists by uploading images and ranking them. Drag and drop images into S, A, B, C, and D tiers. Export your tier list as an image.",
  keywords: [
    "tier list",
    "ranking",
    "tier maker",
    "image ranking",
    "custom tier list",
  ],
  metadataBase: new URL("https://tierlistmakertwo.top"),
  generator: "Tier List Maker",
  openGraph: {
    title: "Tier List Maker - Create Custom Rankings",
    description:
      "Create custom tier lists by uploading images and ranking them.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tier List Maker - Create Custom Rankings",
    description:
      "Create custom tier lists by uploading images and ranking them.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/favicon.png",
  },
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

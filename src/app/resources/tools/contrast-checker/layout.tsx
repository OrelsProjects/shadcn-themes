// app/contrast-checker/layout.tsx
import CTA from "@/app/resources/tools/cta";
import type { Metadata } from "next";

// 1. Define all SEO-related metadata
export const metadata: Metadata = {
  title: "Contrast Checker – Accessibility Tool",
  description:
    "Easily check the contrast ratio between background and foreground colors to ensure WCAG-compliant designs. Improve accessibility with our intuitive color contrast checker.",
  keywords: ["WCAG", "Accessibility", "Color Contrast", "A11y"],
  openGraph: {
    title: "Contrast Checker – Accessibility Tool",
    description:
      "Easily check the contrast ratio between background and foreground colors to ensure WCAG compliance.",
    url: "https://www.shadcn.studio/resources/tools/contrast-checker",
    siteName: "Shadcn Themes",
    images: [
      {
        url: "https://www.shadcn.studio/og-image-contrast-checker.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contrast Checker – Accessibility Tool",
    description:
      "Easily check the contrast ratio between background and foreground colors to ensure WCAG compliance.",
    images: ["https://www.shadcn.studio/og-image-contrast-checker.png"],
    creator: "@YourTwitterHandle",
  },
};

// 2. Optional: Add a JSON-LD script for structured data
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Contrast Checker – Accessibility Tool",
    url: "https://www.shadcn.studio/resources/tools/contrast-checker",
    operatingSystem: "All",
    applicationCategory: "DesignApplication",
    description:
      "Easily check the contrast ratio between background and foreground colors to ensure WCAG compliance.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* If you want an explicit canonical link, you can add it here */}
      <link
        rel="canonical"
        href="https://www.shadcn.studio/resources/tools/contrast-checker"
      />
      <StructuredData />

      {children}
    </>
  );
}

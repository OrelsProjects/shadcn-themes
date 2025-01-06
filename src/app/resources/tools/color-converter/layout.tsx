import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter – Color Format Conversion Tool",
  description:
    "Convert colors between RGB, HSL, HEX, and OKLCH formats. A powerful tool for designers and developers to transform color values across different color spaces.",
  keywords: [
    "Color Converter",
    "RGB",
    "HSL",
    "HEX",
    "OKLCH",
    "Color Space",
    "Color Format",
  ],
  openGraph: {
    title: "Color Converter – Color Format Conversion Tool",
    description:
      "Convert colors between RGB, HSL, HEX, and OKLCH formats. Transform color values across different color spaces.",
    url: "https://www.shadcn.studio/resources/tools/color-converter",
    siteName: "Shadcn Themes",
    images: [
      {
        url: "https://www.shadcn.studio/og-image-color-converter.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter – Color Format Conversion Tool",
    description:
      "Convert colors between RGB, HSL, HEX, and OKLCH formats. Transform color values across different color spaces.",
    images: ["https://www.shadcn.studio/og-image-color-converter.png"],
    creator: "@YourTwitterHandle",
  },
};

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Converter – Color Format Conversion Tool",
    url: "https://www.shadcn.studio/resources/tools/color-converter",
    operatingSystem: "All",
    applicationCategory: "DesignApplication",
    description:
      "Convert colors between RGB, HSL, HEX, and OKLCH formats. A powerful tool for designers and developers to transform color values across different color spaces.",
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
      <link
        rel="canonical"
        href="https://www.shadcn.studio/resources/tools/color-converter"
      />
      <StructuredData />

      {children}
    </>
  );
}

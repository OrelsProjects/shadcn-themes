import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter – Content Length Optimizer",
  description:
    "Optimize your content length for SEO, social media, and various platforms. Check character counts for titles, descriptions, posts, and more.",
  keywords: [
    "Character Counter",
    "SEO Tool",
    "Content Length",
    "Social Media",
    "Meta Title",
    "Meta Description",
  ],
  openGraph: {
    title: "Character Counter – Content Length Optimizer",
    description:
      "Optimize your content length for SEO, social media, and various platforms.",
    url: "https://www.shadcn.studio/resources/tools/character-counter",
    siteName: "Shadcn Themes",
    images: [
      {
        url: "https://www.shadcn.studio/og-image-character-counter.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Character Counter – Content Length Optimizer",
    description:
      "Optimize your content length for SEO, social media, and various platforms.",
    images: ["https://www.shadcn.studio/og-image-character-counter.png"],
    creator: "@YourTwitterHandle",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="canonical"
        href="https://www.shadcn.studio/resources/tools/character-counter"
      />
      <main>{children}</main>
    </>
  );
}

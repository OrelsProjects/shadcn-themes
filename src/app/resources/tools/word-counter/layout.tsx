import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter – Text Analysis Tool",
  description:
    "Analyze your text with detailed statistics including word count, character count, reading time, and more. Perfect for writers, students, and content creators.",
  keywords: [
    "Word Counter",
    "Text Analysis",
    "Reading Time Calculator",
    "Character Counter",
    "Writing Tool",
    "Content Analysis",
  ],
  openGraph: {
    title: "Word Counter – Text Analysis Tool",
    description:
      "Analyze your text with detailed statistics including word count, character count, reading time, and more.",
    url: "https://www.shadcn.studio/resources/tools/word-counter",
    siteName: "Shadcn Themes",
    images: [
      {
        url: "https://www.shadcn.studio/og-image-word-counter.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter – Text Analysis Tool",
    description:
      "Analyze your text with detailed statistics including word count, character count, reading time, and more.",
    images: ["https://www.shadcn.studio/og-image-word-counter.png"],
    creator: "@YourTwitterHandle",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="canonical"
        href="https://www.shadcn.studio/resources/tools/word-counter"
      />
      <main>{children}</main>
    </>
  );
} 
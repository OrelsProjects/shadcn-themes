import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsive Design Tester – Multi-Device Preview Tool",
  description:
    "Test how your website looks across different devices. Preview your site on mobile, tablet, and desktop screens instantly.",
  keywords: [
    "Responsive Design",
    "Mobile Preview",
    "Website Testing",
    "Cross-device Testing",
    "Design Tool",
    "Device Preview",
  ],
  openGraph: {
    title: "Responsive Design Tester – Multi-Device Preview Tool",
    description:
      "Test how your website looks across different devices. Preview your site on mobile, tablet, and desktop screens instantly.",
    url: "https://www.shadcn.studio/resources/tools/responsive-tester",
    siteName: "Shadcn Themes",
    images: [
      {
        url: "https://www.shadcn.studio/og-image-responsive-tester.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Responsive Design Tester – Multi-Device Preview Tool",
    description:
      "Test how your website looks across different devices. Preview your site on mobile, tablet, and desktop screens instantly.",
    images: ["https://www.shadcn.studio/og-image-responsive-tester.png"],
    creator: "@YourTwitterHandle",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="canonical"
        href="https://www.shadcn.studio/resources/tools/responsive-tester"
      />
      <main>{children}</main>
    </>
  );
} 
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog",
  description: "A beautiful blog with dynamic table of contents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className={inter.className}>{children}</article>;
}

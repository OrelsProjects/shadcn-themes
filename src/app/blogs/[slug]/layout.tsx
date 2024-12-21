import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-data";
import { Inter } from "@/lib/fonts";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
};
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // Convert slug from snake-case to title case
  const formattedSlug = params.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const slugDescription = blogPosts.find(
    post => post.slug === params.slug,
  )?.description;

  // Set metadata dynamically
  metadata.title = `${formattedSlug}`;
  metadata.description = slugDescription;

  return (
    <div className="container py-8 flex flex-col gap-9 items-center">
      <article className={Inter.className}>{children}</article>
      <div className="w-fit flex flex-col justify-center items-center border border-border/40 rounded-xl p-6 px-6 text-foreground shadow-lg">
        <h3 className="text-2xl font-semibold mb-2">Find your theme!</h3>
        <p className="text-center text-foreground/80 mb-4">
          Explore our collection of beautiful themes for your next project.
        </p>
        <Button size="lg" asChild>
          <Link href="/" className="text-lg">
            Browse beautiful shadcn themes <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

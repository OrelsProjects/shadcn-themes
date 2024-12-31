"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

export type Blogs =
  | "choose-the-right-color"
  | "the-shadcn-way"
  | "why-shadcn"
  | "shadcn-vs-material"
  | "dark-mode-in-nextjs";

// Map of valid slugs to their component paths
const blogComponents: Record<Blogs, React.ComponentType> = {
  "choose-the-right-color": dynamic(
    () => import("../content/choose-the-right-color"),
  ),
  "the-shadcn-way": dynamic(() => import("../content/the-shadcn-way")),
  "why-shadcn": dynamic(() => import("../content/why-shadcn")),
  "shadcn-vs-material": dynamic(() => import("../content/shadcn-vs-material")),
  "dark-mode-in-nextjs": dynamic(() => import("../content/dark-mode")),
};

type BlogPost = keyof typeof blogComponents;

export default function BlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;

  // Type check if the slug is valid
  if (!isValidBlogSlug(slug)) {
    router.push("/blogs");
  }

  const BlogContent = blogComponents[slug as Blogs];

  return <BlogContent />;
}

// Helper function to type check valid blog slugs
function isValidBlogSlug(slug: string): slug is BlogPost {
  return slug in blogComponents;
}

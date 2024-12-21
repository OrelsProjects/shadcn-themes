export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  description: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "choose-the-right-color",
    title: "Choose the Right Color",
    description:
      "A guide to selecting the perfect color palette for your next project.",
    date: "2024-12-18",
    readTime: "5 min",
    category: "Design",
  },
  {
    slug: "the-shadcn-way",
    title: "The Shadcn Way",
    description: "Learn what is the Shadcn philosophy about choosing colors.",
    date: "2024-12-18",
    readTime: "5 min",
    category: "UI/UX",
  },
  {
    slug: "why-shadcn",
    title: "Why Shadcn?",
    description: "Why should you choose Shadcn over other design libraries?",
    date: "2024-12-18",
    readTime: "8 min",
    category: "Development",
  },
  {
    slug: "shadcn-vs-material",
    title: "Shadcn vs Material",
    description: "A comparison between Shadcn and Material design systems.",
    date: "2024-12-18",
    readTime: "6 min",
    category: "Design",
  },
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // In a real application, you might fetch this data from an API or database
  return blogPosts;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  // In a real application, you might fetch this data from an API or database
  return blogPosts.find(post => post.slug === slug);
}

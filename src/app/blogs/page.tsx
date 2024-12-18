"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Blogs } from "@/app/blogs/[slug]/page";

interface BlogPost {
  slug: Blogs;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "choose-the-right-color",
    title: "Choose the Right Color",
    description:
      "A guide to selecting the perfect color palette for your next project.",
    date: "2024-18-12",
    readTime: "5 min",
    category: "Design",
  },
  {
    slug: "the-shadcn-way",
    title: "The Shadcn Way",
    description: "Learn what is the Shadcn philosophy about choosing colors.",
    date: "2024-18-12",
    readTime: "5 min",
    category: "UI/UX",
  },
  {
    slug: "why-shadcn",
    title: "Why Shadcn?",
    description: "Why should you choose Shadcn over other design libraries?",
    date: "2024-18-12",
    readTime: "8 min",
    category: "Development",
  },
  {
    slug: "shadcn-vs-material",
    title: "Shadcn vs Material",
    description: "A comparison between Shadcn and Material design systems.",
    date: "2024-18-12",
    readTime: "6 min",
    category: "Design",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tips, and the latest trends in design and
            development.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/blogs/${post.slug}`} className="no-underline">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/40 group">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center mb-1">
                        <CalendarIcon className="inline-block w-3 h-3 mr-1" />
                        {post.date}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-foreground/80">
                      {post.description}
                    </CardDescription>
                    <div className="flex items-center mt-4 text-sm text-muted-foreground">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {post.readTime} read
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

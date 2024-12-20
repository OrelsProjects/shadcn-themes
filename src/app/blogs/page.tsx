"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, SearchIcon } from "lucide-react";
import { Header } from "./header";

interface BlogPost {
  slug: string;
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

const categories = Array.from(new Set(blogPosts.map(post => post.category)));

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <div className="container mx-auto py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tips, and the latest trends in design and
            development.
          </p>
        </section>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category,
                  )
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
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

        <section className="mt-16 bg-secondary/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-6">
            Stay up-to-date with our latest articles and insights.
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  );
}

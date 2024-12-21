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
import Logo from "@/components/logo";
import { blogPosts } from "@/lib/blog-data";

function Header() {
  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          <Logo />
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            href="/blogs"
            className="text-foreground/60 hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-foreground/60 hover:text-foreground"
          >
            About
          </Link>
          <Button variant="outline">Subscribe</Button>
        </nav>
      </div>
    </header>
  );
}

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

"use client";

import React, { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const BlogPost: React.FC<{ content: string }> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const processContent = async () => {
      const cleanedContent = content.replace(/^---[\s\S]*?---\n/, "");

      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeStringify)
        .process(cleanedContent);

      setHtmlContent(result.toString());

      const headings = content.match(/^#{2,6}\s+.+$/gm) || [];
      const tocItems = headings.map(heading => {
        const level = heading.match(/^#+/)?.[0].length || 1;
        const text = heading.replace(/^#+\s+/, "");
        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
        return { id, text, level };
      });
      setToc(tocItems || []);
    };

    processContent();
  }, [content]);

  useEffect(() => {
    if (!htmlContent) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        // Set margin so that when the heading is 80px from the top, it gets active
        rootMargin: "0px 0px -80% 0px",
      },
    );

    // Delay until headings are rendered
    setTimeout(() => {
      const headings = document.querySelectorAll("h2, h3, h4, h5, h6");
      headings.forEach(heading => observer.observe(heading));
    }, 400);

    return () => observer.disconnect();
  }, [htmlContent]);

  return (
    <div className="flex justify-center items-start container">
      <aside className="w-80 h-full p-6 border-border/40 fixed top-10 left-0">
        <ScrollArea className="h-full fixed left-0 top-0  border-r border-border/40 pt-6">
          <nav>
            <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
            <ul className="flex flex-col gap-4">
              {toc.map(item => (
                <li
                  id={item.id}
                  key={item.id}
                  className={`mb-2 ${
                    item.level > 1 ? `ml-${(item.level - 1) * 4}` : ""
                  }`}
                >
                  <a
                    href={`#${item.id}`}
                    className={`text-base hover:text-primary transition-colors ${
                      activeHeading === item.id
                        ? "text-primary font-semibold"
                        : "text-foreground/80"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex flex-col items-center gap-8 flex-1 p-8 text-foreground max-w-5xl">
        <article
          className="prose prose-lg !w-full"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <div className="border borderborder rounded-xl p-8 flex flex-col items-center justify-center">
          <h3 id="find-your-theme" className="text-2xl font-semibold mb-4">
            Find your theme!
          </h3>
          <p className="text-center text-foreground/80 mb-6">
            Explore our collection of beautiful themes for your next project.
          </p>
          <Button size="lg" asChild>
            <Link href="/">
              Browse beautiful shadcn themes <ArrowRight />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;

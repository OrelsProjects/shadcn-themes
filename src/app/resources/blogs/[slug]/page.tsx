"use client";

import "highlight.js/styles/atom-one-dark.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import matter from "gray-matter";
import hljs from "highlight.js";
import Image from "next/image";

import { CalendarIcon, ClockIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTA from "@/app/resources/contrast-checker/cta";

interface Frontmatter {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [blogData, setBlogData] = useState<Frontmatter | null>(null);
  const [contentHtml, setContentHtml] = useState("");
  const [showTopBar, setShowTopBar] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [error, setError] = useState(false);

  // ============== 1) Parse Markdown + Extract Headings ==============
  const customMarked = new Marked(
    markedHighlight({
      langPrefix: "language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language, ignoreIllegals: true }).value;
      },
    }),
    {
      gfm: true,
      breaks: true,
    },
  );

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        const res = await fetch(`/blogs/${params.slug}.md`);
        if (!res.ok) throw new Error("Markdown file not found");

        const rawMd = await res.text();
        const { data, content } = matter(rawMd);

        // Replace references to process.env
        let replacedContent = content.replace(
          /process\.env\.(\w+)/g,
          (_, envName) => {
            switch (envName) {
              case "NEXT_PUBLIC_APP_URL":
                return process.env.NEXT_PUBLIC_APP_URL || "";
              case "NEXT_PUBLIC_APP_NAME":
                return process.env.NEXT_PUBLIC_APP_NAME || "";
              default:
                return `process.env.${envName}`;
            }
          },
        );

        // Convert MD => HTML
        let htmlContent = await customMarked.parse(replacedContent);

        // Insert IDs
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;

        const extracted: Heading[] = [];
        tempDiv.querySelectorAll("h1, h2, h3, h4").forEach(el => {
          const text = el.textContent ?? "";
          const level = Number(el.tagName.replace("H", "")) || 2;
          const slug = text
            .toLowerCase()
            .trim()
            .replace(/[^\w]+/g, "-");

          el.setAttribute("id", slug);
          extracted.push({ id: slug, text, level });
        });

        htmlContent = tempDiv.innerHTML;

        // Build frontmatter
        const fm: Frontmatter = {
          slug: data.slug ?? params.slug,
          title: data.title,
          excerpt: data.excerpt || "",
          publishedAt: data.publishedAt,
          readingTime: data.readingTime || "",
          author: {
            name: data.author?.name || "",
            role: data.author?.role || "",
            avatar: data.author?.avatar || "/founder-image.jpg",
          },
        };

        setBlogData(fm);
        setContentHtml(htmlContent);
        setHeadings(extracted);
      } catch {
        setError(true);
      }
    }

    fetchMarkdown();
  }, [params.slug]);

  // ============== 2) Manual Scroll-Spy on scroll ==============
  useEffect(() => {
    // If no headings, skip
    if (!headings.length) return;

    function handleScroll() {
      /*
       * We'll find the heading that is closest to the top
       * but still below the top of the viewport (scrollY).
       * Then we set that heading's ID as active.
       */

      // Convert NodeList to an array of HTML elements
      const headingEls = Array.from(
        document.querySelectorAll("h1, h2, h3, h4"),
      ) as HTMLElement[];

      // The vertical scroll offset from top
      const scrollPos = window.scrollY;
      if (scrollPos > 100) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }
      // We'll also consider the viewport's top offset so we highlight
      // the heading that has just scrolled *past* the top by a bit.
      // Tweak offset to match your sticky header height if needed.
      const offset = 140; // e.g., if you have a sticky header of 80px

      let currentId = "";
      for (const el of headingEls) {
        const elTop = el.offsetTop - offset;
        if (scrollPos >= elTop) {
          currentId = el.id;
        } else {
          // Because headings are in order, as soon as we find one that is above the scroll,
          // everything else is below it.
          break;
        }
      }

      // If no heading found, maybe you're above the first heading => currentId = ""
      if (currentId) {
        setActiveHeadingId(currentId);
      } else {
        // optional: If you want no highlight when you're above the first heading
        // setActiveHeadingId("");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Fire once on mount to highlight if we're already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  // ============== Fallbacks, Loading, etc. ==============
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">404 – Blog not found</h1>
        <Link href="/resources/blogs">
          <Button variant="outline">Go back to Blogs</Button>
        </Link>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading blog post...</p>
      </div>
    );
  }

  // ============== 3) Render ==============
  return (
    <div className="relative flex min-h-screen">
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 z-10 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/resources/blogs" passHref>
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Button>
          </Link>
          <h2 className="text-sm font-semibold truncate max-w-[50%]">
            {blogData.title}
          </h2>
        </div>
      </div>

      {/* Sticky ToC */}
      <aside className="hidden lg:block w-[22rem] flex-shrink-0 border-r border-border p-8 sticky top-0 h-screen overflow-y-auto">
        <nav className="space-y-2 text-primary mt-10">
          <h2 className="text-3xl font-bold mb-4">Contents</h2>
          {headings.map(heading => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block transition-opacity my-1 text-xl pl-${
                (heading.level - 1) * 4
              } ${
                activeHeadingId === heading.id
                  ? "opacity-100 font-semibold"
                  : "opacity-50"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-16">
        <Link href="/resources/blogs" passHref className="inline-block mb-8">
          <Button variant="outline" size="sm" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Button>
        </Link>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary">
            {blogData.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <time dateTime={blogData.publishedAt}>
                {formatDistanceToNow(new Date(blogData.publishedAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2" />
              <span>{blogData.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Author */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <Image
              src={blogData.author.avatar}
              alt={blogData.author.name}
              fill
              className="!relative !w-20 !h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{blogData.author.name}</h2>
              <p className="text-muted-foreground">{blogData.author.role}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="bg-background rounded-lg"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* CTA, etc. */}
        <CTA />
      </main>
    </div>
  );
}

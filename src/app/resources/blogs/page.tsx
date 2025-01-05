import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

// Tell Next.js this is a Server Component (default in App Router).
// If you need client-side features (e.g. useState, useEffect), split them out into a client component.
export default function BlogsPage() {
  // 1. Get path to the `blogs` directory
  const blogsDir = path.join(process.cwd(), "public/blogs");

  // 2. Read all `.md` files from that directory
  const filenames = fs.readdirSync(blogsDir);

  // 3. Parse each file’s frontmatter + content using `gray-matter`
  const blogs = filenames.map(filename => {
    // Make sure we only process .md files
    if (!filename.endsWith(".md")) return null;

    const filePath = path.join(blogsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    // Return fields needed by your listing
    return {
      slug: filename.replace(/\.md$/, ""), // remove the .md extension
      title: data.title || "",
      excerpt: data.excerpt || "",
      publishedAt: data.publishedAt || "",
      readingTime: data.readingTime || "5 min read",
      author: data.author || {
        name: "Unknown Author",
        role: "Unknown",
        avatar: "/default-avatar.png",
      },
      // If needed: actual content from the .md file
      // content,
    };
  });

  // Filter out any null entries from non-.md files
  const filteredBlogs = blogs.filter(Boolean) as NonNullable<
    (typeof blogs)[0]
  >[];

  return (
    <div className="min-h-screen container bg-background">
      <div className="fixed top-0 py-4 z-50 flex justify-start items-center bg-background/30 backdrop-blur-lg">
        <Button
          variant="ghost"
          className="flex justify-center w-fit hover:bg-transparent px-0"
          asChild
        >
          <Link href="/">
            <Logo height={36} width={36} textClassName="text-xl" />
          </Link>
        </Button>
      </div>
      <div className="w-full mx-auto py-20">
        <h1 className="text-4xl md:text-5xl !leading-[4rem] font-bold mb-6 text-center bg-clip-text text-transparent bg-primary">
          Our Blog Posts
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          {filteredBlogs.map(blog => (
            <Link
              href={`/resources/blogs/${blog.slug}`}
              key={blog.slug}
              className="bg-muted rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-primary">
                  {blog.title}
                </h2>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  {/* Author info */}
                  <div className="flex items-center space-x-2">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="!relative !w-10 !h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{blog.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {blog.author.role}
                      </p>
                    </div>
                  </div>

                  {/* Publish date */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <time dateTime={blog.publishedAt}>
                      {formatDistanceToNow(new Date(blog.publishedAt), {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

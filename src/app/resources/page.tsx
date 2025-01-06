import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, Paintbrush } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResourcesPage() {
  const blogsDir = path.join(process.cwd(), "public/blogs");
  const filenames = fs.readdirSync(blogsDir);

  const blogs = filenames.map(filename => {
    if (!filename.endsWith(".md")) return null;

    const filePath = path.join(blogsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title || "",
      excerpt: data.excerpt || "",
      publishedAt: data.publishedAt || "",
      readingTime: data.readingTime || "5 min read",
      author: data.author || {
        name: "Unknown Author",
        role: "Unknown",
        avatar: "/default-avatar.png",
      },
    };
  });

  const filteredBlogs = blogs.filter(Boolean) as NonNullable<
    (typeof blogs)[0]
  >[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="fixed top-0 left-0 right-0 py-4 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container flex justify-between items-center">
          <Button variant="ghost" className="hover:bg-transparent px-0" asChild>
            <Link href="/">
              <Logo height={36} width={36} textClassName="text-xl" />
            </Link>
          </Button>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#blog-posts"
                  className="text-muted-foreground hover:text-primary transition-colors max-md:hidden"
                >
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link
                  href="#our-tools"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="max-md:hidden">Our Tools</span>
                  <span className="md:hidden">Tools</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container py-20 space-y-20">
        <section id="blog-posts" className="pt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Explore Our Blog Posts
          </h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map(blog => (
              <Card
                key={blog.slug}
                className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <Link href={`/resources/blogs/${blog.slug}`}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {blog.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="h-11 flex items-center space-x-2">
                        <Image
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          fill
                          className="!relative !h-10 !w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {blog.author.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {blog.author.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        <time dateTime={blog.publishedAt}>
                          {formatDistanceToNow(new Date(blog.publishedAt), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section id="our-tools" className="pt-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Our Tools
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <Link href="/resources/tools/contrast-checker">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Paintbrush className="w-6 h-6" />
                    <span>Contrast Checker</span>
                  </CardTitle>
                  <CardDescription>
                    Ensure your color combinations meet accessibility standards
                    for readability.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-primary to-primary-foreground rounded-md flex items-center justify-center text-background font-bold text-xl">
                    AA / AAA
                  </div>
                </CardContent>
              </Link>
            </Card>
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <Link href="/resources/tools/color-converter">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                    <span>Color Converter</span>
                  </CardTitle>
                  <CardDescription>
                    Convert colors between HEX, RGB, HSL, and more. Perfect for
                    designers and developers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 aspect-video">
                    <div className="bg-[#FF5757] rounded-md"></div>
                    <div className="bg-[#57FF57] rounded-md"></div>
                    <div className="bg-[#5757FF] rounded-md"></div>
                    <div className="bg-[#FFD700] rounded-md"></div>
                    <div className="bg-[#FF57FF] rounded-md"></div>
                    <div className="bg-[#57FFFF] rounded-md"></div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8 mt-20">
        <div className="container text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Shadcn Themes. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
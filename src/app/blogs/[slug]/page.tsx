import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import BlogPost from "./blog-post";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "seo-content"));
  return files.map(filename => ({
    slug: filename.replace(".md", ""),
  }));
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "seo-content", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf8");

  return <BlogPost content={content} />;
}

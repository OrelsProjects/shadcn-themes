import { getBlogPostBySlug } from "@/lib/blog-data"
import { notFound } from "next/navigation"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto">
      <h1>{post.title}</h1>
      <p className="text-muted-foreground">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
    </article>
  )
}


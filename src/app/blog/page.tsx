import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBlogPosts } from "@/lib/blog-data"
import Link from "next/link"

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="flex flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Blog Posts
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


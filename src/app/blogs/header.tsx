import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          BlogHub
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/blogs" className="text-foreground/60 hover:text-foreground">
            Blog
          </Link>
          <Link href="/about" className="text-foreground/60 hover:text-foreground">
            About
          </Link>
          <Button variant="outline">Subscribe</Button>
        </nav>
      </div>
    </header>
  )
}

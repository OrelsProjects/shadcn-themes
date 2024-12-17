"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function ShadcnWayBlog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Logo />
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="#what-is"
              >
                What Is It?
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="#why-it-works"
              >
                Why It Works
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="#examples"
              >
                Examples
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-6 md:py-12">
        <div className="flex flex-col items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-12">
            What Is the Shadcn Way?
          </h1>
        </div>
        <section id="what-is" className="mb-12">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            The Essence of Shadcn
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The Shadcn Way is about using a single primary color while keeping
            the rest of the design minimal, with subtle shades of gray or white.
            This approach ensures that your primary color stands out—it becomes
            the focal point of your design while everything else recedes into
            the background.
          </p>
        </section>
        <section id="why-it-works" className="mb-12">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Why the Shadcn Way Works
          </h2>
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Focus and Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                By reducing distractions and noise, users know exactly where to
                look. Buttons, calls to action, and links naturally stand out
                because the primary color becomes the star of the show.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Modern Aesthetic</CardTitle>
              </CardHeader>
              <CardContent>
                Minimal color palettes feel timeless. The mix of soft grays and
                a single vibrant hue creates a refined, polished
                design—something that feels intentionally crafted.
              </CardContent>
            </Card>
          </div>
        </section>
        <section id="examples" className="mb-12">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Shadcn in Action
          </h2>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription className="text-foreground/60">
                  See how the primary color guides attention
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button>Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="outline">Outline Action</Button>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-foreground/60">
                  Notice how the primary button stands out while others blend
                  with the design.
                </p>
              </CardFooter>
            </Card>
          </div>
        </section>
        <footer className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Learn more about Shadcn UI{" "}
            <Link
              href="https://ui.shadcn.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              here <ExternalLink className="inline-block h-4 w-4" />
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}

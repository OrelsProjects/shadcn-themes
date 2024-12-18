import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'What Is the Shadcn Way? | Shadcn Blog',
  description: 'Learn about the essence of Shadcn design philosophy, why it works, and see examples in action.',
}

export default function ShadcnWayBlog() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-12">
        What Is the Shadcn Way?
      </h1>
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
    </div>
  )
}


import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

export default function PrimaryColorGuidePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        How to Choose the Right Primary Color for Your Website
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          What Is a Primary Color in Website Design?
        </h2>
        <p className="mb-4">
          Primary colors in website design refer to the foundational hues that
          shape the brand&apos;s visual identity. While traditional primary
          colors in art are red, blue, and yellow, web design considers primary
          colors as the dominant tones used to guide the user&apos;s visual
          journey.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Why are primary colors important?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>They define the first impression of your brand.</li>
              <li>They set the tone for the overall aesthetic.</li>
              <li>
                They create consistency across digital and print platforms.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Psychological Impact of Colors
        </h2>
        <p className="mb-4">
          Colors are more than just visual elements; they convey meaning and
          emotion. Studies in color psychology reveal that colors can influence
          decision-making, affect mood and perception, and shape brand recall
          and recognition.
        </p>
        <Tabs defaultValue="red">
          <TabsList>
            <TabsTrigger value="red" className="text-red-400">
              Red
            </TabsTrigger>
            <TabsTrigger value="blue" className="text-blue-400">
              Blue
            </TabsTrigger>
            <TabsTrigger value="yellow" className="text-yellow-400">
              Yellow
            </TabsTrigger>
            <TabsTrigger value="green" className="text-green-400">
              Green
            </TabsTrigger>
            <TabsTrigger value="orange" className="text-orange-400">
              Orange
            </TabsTrigger>
            <TabsTrigger value="purple" className="text-purple-400">
              Purple
            </TabsTrigger>
            <TabsTrigger value="black" className="text-foreground">
              Black
            </TabsTrigger>
          </TabsList>
          <TabsContent value="red">
            <Card>
              <CardHeader>
                <CardTitle>Red: Energy and Passion</CardTitle>
                <CardDescription>
                  Symbolizes urgency, love, and power
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ideal for brands that want to evoke excitement or action, such
                  as fitness or food websites.
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  Example: Coca-Cola uses red to convey energy and enthusiasm.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="blue">
            <Card>
              <CardHeader>
                <CardTitle>Blue: Trust and Reliability</CardTitle>
                <CardDescription>
                  Represents calmness, trust, and professionalism
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Popular among financial, healthcare, and tech companies.</p>
              </CardContent>
              <CardFooter>
                <p>
                  Example: Facebook and PayPal rely on blue to project
                  trustworthiness.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="yellow">
            <Card>
              <CardHeader>
                <CardTitle>Yellow: Optimism and Creativity</CardTitle>
                <CardDescription>
                  Conveys happiness, energy, and creativity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Perfect for brands targeting a youthful or cheerful audience.
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  Example: McDonald&apos;s uses yellow to evoke friendliness and
                  energy.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="green">
            <Card>
              <CardHeader>
                <CardTitle>Green: Growth and Harmony</CardTitle>
                <CardDescription>
                  Symbolizes nature, health, and balance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ideal for eco-friendly, wellness, and organic product brands.
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  Example: Starbucks uses green to represent harmony and growth.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="orange">
            <Card>
              <CardHeader>
                <CardTitle>Orange: Enthusiasm and Warmth</CardTitle>
                <CardDescription>
                  Conveys friendliness, energy, and excitement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Great for brands that want to appear approachable and vibrant.
                </p>
              </CardContent>
              <CardFooter>
                <p>Example: Fanta uses orange to evoke energy and fun.</p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="purple">
            <Card>
              <CardHeader>
                <CardTitle>Purple: Creativity and Luxury</CardTitle>
                <CardDescription>
                  Symbolizes sophistication, royalty, and imagination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Perfect for premium brands or those emphasizing creativity.
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  Example: Cadbury uses purple to project luxury and indulgence.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="black">
            <Card>
              <CardHeader>
                <CardTitle>Black: Elegance and Power</CardTitle>
                <CardDescription>
                  Represents sophistication, authority, and timelessness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Commonly used in high-end fashion and luxury product brands.
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  Example: Chanel uses black to convey elegance and authority.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          How to Select a Primary Color for Your Website
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Align With Brand Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your primary color should resonate with your mission, values,
                and target audience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Understand Your Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Different demographics respond uniquely to colors. Research
                preferences before deciding.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Analyze Competitors</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Observe industry leaders to identify trends and ensure your
                website stands out.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Tools for Choosing and Testing Website Colors
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="https://coolors.co/"
              className="text-blue-600 hover:underline"
            >
              Coolors
            </Link>
            : Generate and refine palettes.
          </li>
          <li>
            <Link
              href="https://color.adobe.com/"
              className="text-blue-600 hover:underline"
            >
              Adobe Color
            </Link>
            : Create and explore color palettes.
          </li>

          <li>
            <Link
              href="https://webaim.org/resources/contrastchecker/"
              className="text-blue-600 hover:underline"
            >
              Contrast Checkers
            </Link>
            : Ensure text readability and compliance with WCAG.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Best Practices for Implementing Colors in Web Design
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Balance and Contrast: Avoid overwhelming users by maintaining
            harmony in your palette.
          </li>
          <li>
            Hierarchy and Emphasis: Use colors strategically to guide users
            through the content.
          </li>
          <li>
            Call-to-Action Buttons: Choose contrasting colors to make CTAs stand
            out and drive conversions.
          </li>
        </ul>
      </section>

    </div>
  );
}

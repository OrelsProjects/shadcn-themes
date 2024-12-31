import { Metadata } from "next";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ExampleComponent from "@/app/blogs/content/components/dark-mode-example-component";
import DarkModeToggle from "@/app/blogs/content/components/dark-mode-toggle";

export const metadata: Metadata = {
  title: "Implementing Dark Theme in NextJS web apps | Shadcn Blog",
  description:
    "Learn how to effectively implement dark themes using Tailwind CSS and CSS variables in your web applications.",
};

export default function DarkThemeArticle() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Implementing Dark Theme in NextJS web apps
      </h1>

      <p className="lead">
        Dark themes have become increasingly popular in NextJS web apps,
        offering users a more comfortable viewing experience in low-light
        conditions and potentially reducing eye strain. In this article,
        we&apos;ll explore how to implement a dark theme using Tailwind CSS and
        CSS variables, with a focus on flexibility and maintainability.
      </p>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          The Importance of Dark Themes
        </h2>
        <p>Dark themes offer several benefits to users and developers alike:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Reduced eye strain in low-light environments</li>
          <li>Potential battery savings on OLED displays</li>
          <li>Aesthetic appeal and modern look</li>
          <li>Improved accessibility for users with light sensitivity</li>
          <li>Consistency with system-wide dark mode preferences</li>
        </ul>
      </section>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Implementing Dark Theme with Tailwind CSS and CSS Variables
        </h2>
        <p>
          To implement a dark theme effectively, we&apos;ll use a combination of
          Tailwind CSS utility classes and CSS variables. This approach offers
          flexibility and makes it easy to maintain and update your theme.
        </p>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
          Step 1: Configure Tailwind CSS
        </h3>
        <p>
          First, ensure that your <code>tailwind.config.js</code> file is set up
          to use CSS variables for theming:
        </p>

        <Card>
          <CardHeader>
            <CardTitle>tailwind.config.js</CardTitle>
          </CardHeader>
          <CardContent>
            <SyntaxHighlighter
              role="copy-code-syntax-highlighter"
              language="javascript"
              style={oneDark}
              customStyle={{
                maxHeight: "60vh",
                overflow: "auto",
                padding: "1rem",
                borderRadius: "0.375rem",
                fontSmooth: "antialiased",
              }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {`module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Add other color variables as needed
      },
    },
  },
  plugins: [],
}`}
            </SyntaxHighlighter>
          </CardContent>
        </Card>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
          Step 2: Define CSS Variables
        </h3>
        <p>
          In your global CSS file (e.g., <code>app/globals.css</code>), define
          the CSS variables for both light and dark themes:
        </p>

        <Card>
          <CardHeader>
            <CardTitle>app/globals.css</CardTitle>
          </CardHeader>
          <CardContent>
            <SyntaxHighlighter
              role="copy-code-syntax-highlighter"
              language="css"
              style={oneDark}
              customStyle={{
                maxHeight: "60vh",
                overflow: "auto",
                padding: "1rem",
                borderRadius: "0.375rem",
                fontSmooth: "antialiased",
              }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* Define other variables for light theme */
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 1.2%;
  /* Define other variables for dark theme */
}`}
            </SyntaxHighlighter>
          </CardContent>
        </Card>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
          Step 3: Implement Dark Mode Toggle
        </h3>
        <p>
          Create a component to toggle between light and dark modes. This
          component will add or remove the <code>dark</code> class from the{" "}
          <code>html</code> element.
        </p>

        <DarkModeToggle />

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
          Step 4: Use Theme-Aware Classes
        </h3>
        <p>
          When building your components, use Tailwind CSS classes that reference
          your theme variables. This ensures that your components automatically
          adapt to the current theme.
        </p>

        <ExampleComponent />
      </section>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Best Practices for Dark Theme Implementation
        </h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Use semantic color names (e.g., <code>background</code>,{" "}
            <code>foreground</code>) instead of specific color names to make
            theme switching easier.
          </li>
          <li>
            Consider color contrast ratios to ensure accessibility in both light
            and dark modes.
          </li>
          <li>
            Test your dark theme implementation across different devices and
            browsers.
          </li>
          <li>
            Provide an easy way for users to switch between themes and remember
            their preference.
          </li>
          <li>
            Use CSS transitions when switching themes for a smoother user
            experience.
          </li>
        </ul>
      </section>

      <section className="my-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Conclusion
        </h2>
        <p>
          Implementing a dark theme in your web application using Tailwind CSS
          and CSS variables offers a flexible and maintainable solution. By
          following the steps outlined in this article, you can create a
          seamless theme-switching experience for your users, improving
          accessibility and user satisfaction.
        </p>
        <p>
          Remember that the key to a successful dark theme implementation lies
          in careful planning of your color palette and consistent use of
          theme-aware classes throughout your application. With these practices
          in place, you&apos;ll be well-equipped to create beautiful, adaptable
          user interfaces that cater to user preferences and environmental
          conditions.
        </p>
      </section>
    </article>
  );
}

---
slug: "shadcn-themes1"
title: "Shadcn Themes: A comprehensive guide"
excerpt: "Explore Shadcn themes, the customizable UI library for developers. Learn about dynamic theming with CSS variables, Tailwind CSS, and tools like theme generators. Create unique, standout designs with ease. Perfect for building flexible, visually stunning applications. Start customizing now!"
publishedAt: "2025-01-07T07:00:00Z"
readingTime: "6 min read"
author:
  name: "Orel Zilberman"
  role: "Founder of Shadcn Themes"
  avatar: "/founder-image.jpg"
---

## Shadcn Themes: A comprehensive guide

![Shadcn UI Theme Architecture](https://apps-og-images.s3.us-east-1.amazonaws.com/blogs/shadcn-architecture-overview.webp)

Shadcn's themes empower developers with the ability to create dynamic and visually appealing UI designs. This guide dives into professional-grade techniques and practices for building scalable, accessible, and efficient themes with Shadcn.

### 1. Leveraging Tailwind integration
Shadcn seamlessly integrates with Tailwind CSS, allowing developers to build themes with utility-first principles. Here’s how you can use Tailwind utilities to extend Shadcn themes:

```css
:root {
   --background: 0 0% 98%;
   --foreground: 240 10% 20%;
   --primary: 39 80% 50%;
   --primary-foreground: 39 100% 98%;
   --secondary: 192 10% 85%;
   --secondary-foreground: 192 20% 15%;
}
```

Pair these variables with Tailwind's `theme()` function for effortless customization:

```css
.bg-primary {
  background-color: theme('colors.primary');
}
```

### 2. Modular component design
Shadcn's modular architecture ensures that each component is independently customizable. This modularity makes it easy to apply themes consistently across projects.

**Example: Button Component**
```tsx
import { cn } from "shadcn/utils";

function Button({ children, className }) {
  return (
    <button className={cn("bg-primary text-primary-foreground", className)}>
      {children}
    </button>
  );
}
```

### 3. Dynamic theme switching
Implementing dynamic theme switching in Shadcn is straightforward. Use context to manage themes:

```tsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

### 4. Extending themes across platforms
With Shadcn’s flexibility, you can extend themes to React Native using libraries like `react-native-web`. This enables you to maintain consistency across web and mobile platforms.

```tsx
import { extendTheme } from '@react-native-web/core';

const mobileTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        paddingVertical: 12,
      },
    },
  },
});
```

### 5. Accessibility and WCAG compliance
Shadcn places a strong emphasis on accessibility. Use tools like `chroma.js` to enforce WCAG compliance for color contrast:

```javascript
import chroma from "chroma-js";

function isAccessible(background, foreground) {
  return chroma.contrast(background, foreground) >= 4.5;
}

console.log(isAccessible("#ffffff", "#000000")); // true
```

### 6. Real-world use cases
Many development teams, including those building SaaS products, leverage Shadcn themes for flexibility and efficiency. Examples include:

- **Multi-brand Platforms**: Simplifying brand management with a shared codebase.
- **Scalable SaaS Apps**: Ensuring consistency across multiple components and pages.


## Getting Started

If you're using Next.js 15 + React 19, [scroll down to the dedicated section](#getting-started-next-js-15-react-19).

### Create Project
Run the init command to create a new Next.js project or set up an existing one:

```bash
pnpm
npm
yarn
bun
npx shadcn@latest init
```

You can use the `-d` flag for defaults, i.e., `new-york`, `zinc`, and `yes` for the CSS variables.

```bash
pnpm
npm
yarn
bun
npx shadcn@latest init -d
```

### Configure components.json
You will be asked a few questions to configure `components.json`:

```
Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes
```

### That's It
You can now start adding components to your project.

```bash
pnpm
npm
yarn
bun
npx shadcn@latest add button
```

The command above will add the Button component to your project. You can then import it like this:

```tsx
import { Button } from "@/components/ui/button";
 
export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

---

## Getting Started - Next.js 15 + React 19

### TL;DR
If you're using npm, you can install `shadcn/ui` dependencies with a flag. The `shadcn` CLI will prompt you to select a flag when you run it. No flags are required for pnpm, bun, or yarn.

See **Upgrade Status** for the React 19 support status for each package.

### What's Happening?
React 19 is now RC (release candidate) and supported in the latest Next.js 15 release.

To support React 19, package maintainers will need to update their packages to include React 19 as a peer dependency. This is already in progress.

```json
"peerDependencies": {
  "react": "^16.8 || ^17.0 || ^18.0 || ^19.0",
  "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0"
}
```

### How to Fix Peer Dependency Issues

**Solution 1: Use `--force` or `--legacy-peer-deps`**
```bash
npm i <package> --force
npm i <package> --legacy-peer-deps
```

**Solution 2: Downgrade to React 18**
```bash
npm i react@18 react-dom@18
```

### Using shadcn/ui on Next.js 15
Follow the instructions in the installation guide. If you're using npm, you'll be prompted to resolve peer dependency issues.

Example:
```
It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues (see https://ui.shadcn.com/react-19).
 
? How would you like to proceed? ›
❯ Use --force
  Use --legacy-peer-deps
```

### Upgrade Status
To track progress for React 19 support, here's the current status:

| Package                      | Status | Note                                            |
|------------------------------|--------|------------------------------------------------|
| radix-ui                     | ✅     |                                                |
| lucide-react                 | ✅     |                                                |
| class-variance-authority     | ✅     | Does not list React 19 as a peer dependency.   |
| tailwindcss-animate          | ✅     | Does not list React 19 as a peer dependency.   |
| embla-carousel-react         | ✅     |                                                |
| recharts                     | ✅     | See note below.                                |
| react-hook-form              | ✅     |                                                |
| react-resizable-panels       | ✅     |                                                |
| sonner                       | ✅     |                                                |
| react-day-picker             | ✅     | Works with flag for npm. Work in progress.     |
| input-otp                    | ✅     |                                                |
| vaul                         | ✅     |                                                |
| @radix-ui/react-icons        | 🚧     | PR in progress.                                |
| cmdk                         | ✅     |                                                |

### Recharts and React 19
To use `recharts` with React 19, override the `react-is` dependency:

```json
"overrides": {
  "react-is": "^19.0.0-rc-69d4b800-20241021"
}
```

Make sure the `react-is` version matches the React 19 version you are using.

Run:
```bash
npm install --legacy-peer-deps
```

## Conclusion
Shadcn Themes provide a powerful and flexible system for building visually stunning and accessible applications. By leveraging Tailwind CSS, dynamic switching, and modular components, you can create scalable and future-proof designs.

For more hands-on implementation guidance, visit our **Shadcn Theme Mastery Workshop**.

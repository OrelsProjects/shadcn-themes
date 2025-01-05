---
slug: "dark-mode-implementation"
title: "How to Implement Dark Mode in Next.js: A Comprehensive Guide"
excerpt: "Master the art of implementing dark themes in Next.js web apps. Learn key benefits, step-by-step setup, and best practices for enhanced user experience."
publishedAt: "2024-12-16T12:00:00Z"
readingTime: "10 min read"
author:
  name: "Orel Zilberman"
  role: "Founter of Shadcn Themes"
  avatar: "/founder-image.jpg"
---
# How to Implement Dark Mode in Next.js: A Comprehensive Guide

## Why Dark Mode Matters

Dark themes are a modern UX trend, offering advantages such as reduced eye strain, improved accessibility, and battery savings for OLED devices.

- **Reduced Eye Strain:** Ideal for low-light environments.
- **Modern Look:** Creates a sleek, professional design.
- **Improved Accessibility:** Accommodates users with light sensitivity.

## Step-by-Step Guide to Implement Dark Mode

### Step 1: Configure Tailwind CSS
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))" },
      },
    },
  },
};
```

### Step 2: Define CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --primary: 222.2 47.4% 11.2%;
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --primary: 210 40% 98%;
}
```

### Step 3:  Create a Toggle Component
```jsx
<Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
</Button>
```

### Step 4: Using ThemeProvider from ```next-themes```
To make toggling between light and dark modes seamless, you can use the next-themes package. It handles a lot of the heavy lifting—like storing the user’s theme preference and applying it immediately on page load.

#### 1. Install the Package
```bash
npm install next-themes
# or
yarn add next-themes
```
#### 2. Wrap Your App Component
In your pages/layout.tsx file, wrap your app component with the ThemeProvider from next-themes.
```jsx
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function Layout({ children }) {
  return <ThemeProvider
      attribute="class"
      defaultTheme="system" 
      enableSystem
  >{children}</ThemeProvider>;
}
```
- **attribute=class**: This tells ```next-themes``` to toggle a class (```light``` or ```dark```) on your HTML element.
- **defaultTheme="system"**: This sets the default theme to follow the user’s system preference.
- **enableSystem**: This allows the user to switch between light and dark modes based on their system settings.

#### 3. Use the useTheme Hook
Now, you can import the useTheme hook from next-themes in any component to read or set the current theme:
```jsx
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
```

## Best Practices for Dark Mode

- **Accessibility**: Ensure that your color choices meet contrast guidelines for readability.
- **Smooth Transition**: Apply CSS transitions to your background, text, and other elements to create a less jarring change in themes.
- **User Preference Memory**: next-themes automatically stores the user’s last-selected theme in local storage, so they don’t have to retoggle it on every visit.
- **Comprehensive Testing**: Make sure your entire app, including images and other visual elements, looks and functions correctly across both light and dark themes.
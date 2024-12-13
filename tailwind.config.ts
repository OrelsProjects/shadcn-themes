import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "Hauora", "sans-serif"],
        hauora: ["Hauora", "Montserrat", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "border-demo": "hsl(var(--border-demo))",
        "input-demo": "hsl(var(--input-demo))",
        "ring-demo": "hsl(var(--ring-demo))",
        "background-demo": "hsl(var(--background-demo))",
        "foreground-demo": "hsl(var(--foreground-demo))",
        "primary-demo": {
          DEFAULT: "hsl(var(--primary-demo))",
          foreground: "hsl(var(--primary-foreground-demo))",
        },
        "secondary-demo": {
          DEFAULT: "hsl(var(--secondary-demo))",
          foreground: "hsl(var(--secondary-foreground-demo))",
        },
        "destructive-demo": {
          DEFAULT: "hsl(var(--destructive-demo))",
          foreground: "hsl(var(--destructive-foreground-demo))",
        },
        "muted-demo": {
          DEFAULT: "hsl(var(--muted-demo))",
          foreground: "hsl(var(--muted-foreground-demo))",
        },
        "accent-demo": {
          DEFAULT: "hsl(var(--accent-demo))",
          foreground: "hsl(var(--accent-foreground-demo))",
        },
        "popover-demo": {
          DEFAULT: "hsl(var(--popover-demo))",
          foreground: "hsl(var(--popover-foreground-demo))",
        },
        "card-demo": {
          DEFAULT: "hsl(var(--card-demo))",
          foreground: "hsl(var(--card-foregroun-demo))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

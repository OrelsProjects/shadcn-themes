import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
          foreground: "hsl(var(--primary-demo-foreground))",
        },
        "secondary-demo": {
          DEFAULT: "hsl(var(--secondary-demo))",
          foreground: "hsl(var(--secondary-demo-foreground))",
        },
        "destructive-demo": {
          DEFAULT: "hsl(var(--destructive-demo))",
          foreground: "hsl(var(--destructive-demo-foreground))",
        },
        "muted-demo": {
          DEFAULT: "hsl(var(--muted-demo))",
          foreground: "hsl(var(--muted-demo-foreground))",
        },
        "accent-demo": {
          DEFAULT: "hsl(var(--accent-demo))",
          foreground: "hsl(var(--accent-demo-foreground))",
        },
        "popover-demo": {
          DEFAULT: "hsl(var(--popover-demo))",
          foreground: "hsl(var(--popover-demo-foreground))",
        },
        "card-demo": {
          DEFAULT: "hsl(var(--card-demo))",
          foreground: "hsl(var(--card-demo-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "sidebar-demo": {
          DEFAULT: "hsl(var(--sidebar-demo-background))",
          foreground: "hsl(var(--sidebar-demo-foreground))",
          primary: "hsl(var(--sidebar-demo-primary))",
          "primary-foreground": "hsl(var(--sidebar-demo-primary-foreground))",
          accent: "hsl(var(--sidebar-demo-accent))",
          "accent-foreground": "hsl(var(--sidebar-demo-accent-foreground))",
          border: "hsl(var(--sidebar-demo-border))",
          ring: "hsl(var(--sidebar-demo-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
} satisfies Config;

export default config;
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

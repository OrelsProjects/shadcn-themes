import { ParsedPalette } from "@/models/palette";

export const TWITTER_URL = "https://x.com/orelzman/";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/orel-zilberman-225a37137";
export const SUBSTACK_URL = "https://theindiepreneur.substack.com/";

export const basePalette: ParsedPalette = {
  views: 0,
  name: "base",
  owner: "system",
  colors: {
    light: {
      background: [0, 0, 100],
      foreground: [222, 84, 5],
      card: [0, 0, 100],
      "card-foreground": [222, 84, 5],
      popover: [0, 0, 100],
      "popover-foreground": [222, 84, 5],
      primary: [221, 83, 53],
      "primary-foreground": [210, 40, 98],
      secondary: [210, 40, 96],
      "secondary-foreground": [222, 47, 1],
      muted: [210, 40, 96],
      "muted-foreground": [215, 16, 46],
      accent: [210, 40, 96],
      "accent-foreground": [222, 47, 1],
      destructive: [0, 84, 60],
      "destructive-foreground": [210, 40, 98],
      border: [214.3, 31.8, 91],
      input: [214.3, 31.8, 91],
      ring: [221, 83, 53],
      radius: "0.5rem",
      "chart-1": [221, 83, 53],
      "chart-2": [12, 76, 61],
      "chart-3": [173, 58, 39],
      "chart-4": [197, 37, 24],
      "chart-5": [43, 74, 66],
    },
    dark: {
      background: [222, 84, 5],
      foreground: [210, 40, 98],
      card: [222, 84, 5],
      "card-foreground": [210, 40, 98],
      popover: [222, 84, 5],
      "popover-foreground": [210, 40, 98],
      primary: [217, 91, 59.8],
      "primary-foreground": [222, 47, 1],
      secondary: [217, 32, 17],
      "secondary-foreground": [210, 40, 98],
      muted: [217, 32, 17],
      "muted-foreground": [215, 20, 65],
      accent: [217, 32, 17],
      "accent-foreground": [210, 40, 98],
      destructive: [0, 62.8, 30],
      "destructive-foreground": [210, 40, 98],
      border: [217, 32, 17],
      input: [217, 32, 17],
      ring: [224, 76, 48],
      radius: "0.5rem",
      "chart-1": [220, 70, 50],
      "chart-2": [160, 60, 45],
      "chart-3": [30, 80, 55],
      "chart-4": [280, 65, 60],
      "chart-5": [340, 75, 55],
    },
  },
  id: "a1b2c3",
};

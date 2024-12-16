import { ParsedPalette } from "@/models/palette";

export const TWITTER_URL = "https://x.com/orelzman/";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/orel-zilberman-225a37137";
export const SUBSTACK_URL = "https://theindiepreneur.substack.com/";

export const basePalette: ParsedPalette = {
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

// export const basePalette: ParsedPalette = {
//   name: "base",
//   owner: "system",
//   colors: {
//     light: {
//       background: [208, 100, 97],
//       foreground: [208, 100, 27],
//       card: [208, 100, 92],
//       "card-foreground": [208, 100, 27],
//       popover: [208, 100, 97],
//       "popover-foreground": [208, 100, 27],
//       primary: [324, 84, 65],
//       "primary-foreground": [324, 84, 5],
//       secondary: [199, 94, 67],
//       "secondary-foreground": [199, 94, 7],
//       muted: [208, 100, 77],
//       "muted-foreground": [208, 100, 47],
//       accent: [158, 100, 41],
//       "accent-foreground": [158, 100, 0],
//       destructive: [0, 80, 50],
//       "destructive-foreground": [0, 80, 90],
//       border: [208, 100, 57],
//       input: [208, 100, 57],
//       ring: [324, 84, 45],
//       radius: "0.5rem",
//       "chart-1": [324, 84, 65],
//       "chart-2": [199, 94, 67],
//       "chart-3": [158, 100, 41],
//       "chart-4": [158, 100, 51],
//       "chart-5": [324, 84, 75],
//     },
//     dark: {
//       background: [244, 21, 13],
//       foreground: [244, 21, 83],
//       card: [244, 21, 18],
//       "card-foreground": [244, 21, 83],
//       popover: [244, 21, 13],
//       "popover-foreground": [244, 21, 83],
//       primary: [140, 84, 45],
//       "primary-foreground": [324, 84, 100],
//       secondary: [199, 94, 47],
//       "secondary-foreground": [199, 94, 100],
//       muted: [244, 21, 53],
//       "muted-foreground": [244, 24, 48],
//       accent: [158, 100, 21],
//       "accent-foreground": [158, 100, 100],
//       destructive: [0, 80, 30],
//       "destructive-foreground": [0, 80, 90],
//       border: [244, 21, 53],
//       input: [244, 21, 53],
//       ring: [324, 84, 100],
//       radius: "0.5rem",
//       "chart-1": [324, 84, 45],
//       "chart-2": [199, 94, 47],
//       "chart-3": [158, 100, 21],
//       "chart-4": [158, 100, 31],
//       "chart-5": [324, 84, 55],
//     },
//   },
//   id: "a1b2c3",
// };
//   "soft-jewel": {
//     ...softJewelPalette,
//   },
//   "elegant-lively": {
//     ...elegantLivelyPalette,
//   },
//   "vibrant-complementary": {
//     ...vibrantComplementaryPalette,
//   },
//   "modern-warm": {
//     ...modernWarmPalette,
//   },
//   "clean-charming": {
//     ...cleanCharmingPalette,
//   },
//   poopUp: {
//     ...poopUp,
//   },
//   nord: {
//     ...nordPalette,
//   },
//   nature: {
//     ...naturePalette,
//   },
//   dusk: {
//     ...duskPalette,
//   },
//   earthy: {
//     ...earthyPalette,
//   },
//   "pastel-dream": {
//     ...pastelDreamPalette,
//   },
//   "retro-wave": {
//     ...retroWavePalette,
//   },
//   citrus: {
//     ...citrusPalette,
//   },
//   "ocean-breeze": {
//     ...oceanBreezePalette,
//   },
//   "midnight-glow": {
//     ...midnightGlowPalette,
//   },
//   sunset: {
//     ...sunsetPalette,
//   },
// };

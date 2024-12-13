import { generatePalette } from "@/lib/palette/utils";
import { Palette } from "@/models/palette";

const softJewelPalette = generatePalette(
  [271, 79, 63], // Primary
  [2, 64, 69], // Secondary
  [45, 90, 74], // Accent
  [210, 11, 94], // Neutral
  [0, 79, 55], // Error
);

const elegantLivelyPalette = generatePalette(
  [33, 92, 52], // Primary
  [220, 52, 67], // Secondary
  [44, 92, 81], // Accent
  [36, 10, 92], // Neutral
  [20, 100, 45], // Error
);

const vibrantComplementaryPalette = generatePalette(
  [25, 85, 47], // Primary
  [310, 62, 84], // Secondary
  [112, 73, 69], // Accent
  [285, 13, 91], // Neutral
  [18, 90, 52], // Error
);

const modernWarmPalette = generatePalette(
  [240, 71, 45], // Primary
  [212, 66, 78], // Secondary
  [320, 83, 73], // Accent
  [150, 27, 87], // Neutral
  [25, 90, 59], // Error
);

const cleanCharmingPalette = generatePalette(
  [32, 100, 49], // Primary
  [260, 79, 72], // Secondary
  [45, 93, 71], // Accent
  [220, 15, 93], // Neutral
  [10, 79, 47], // Error
);

export const basePalettes: Palette = {
  base: {
    light: {
      background: [208, 100, 97],
      foreground: [208, 100, 27],
      card: [208, 100, 92],
      "card-foreground": [208, 100, 27],
      popover: [208, 100, 97],
      "popover-foreground": [208, 100, 27],
      primary: [324, 84, 65],
      "primary-foreground": [324, 84, 5],
      secondary: [199, 94, 67],
      "secondary-foreground": [199, 94, 7],
      muted: [208, 100, 77],
      "muted-foreground": [208, 100, 47],
      accent: [158, 100, 41],
      "accent-foreground": [158, 100, 0],
      destructive: [0, 80, 50],
      "destructive-foreground": [0, 80, 90],
      border: [208, 100, 57],
      input: [208, 100, 57],
      ring: [324, 84, 45],
      radius: "0.5rem",
      chart1: [324, 84, 65],
      chart2: [199, 94, 67],
      chart3: [158, 100, 41],
      chart4: [158, 100, 51],
      chart5: [324, 84, 75],
    },
    dark: {
      background: [244, 21, 13],
      foreground: [244, 21, 83],
      card: [244, 21, 18],
      "card-foreground": [244, 21, 83],
      popover: [244, 21, 13],
      "popover-foreground": [244, 21, 83],
      primary: [140, 84, 45],
      "primary-foreground": [324, 84, 100],
      secondary: [199, 94, 47],
      "secondary-foreground": [199, 94, 100],
      muted: [244, 21, 53],
      "muted-foreground": [244, 21, 33],
      accent: [158, 100, 21],
      "accent-foreground": [158, 100, 100],
      destructive: [0, 80, 30],
      "destructive-foreground": [0, 80, 90],
      border: [244, 21, 53],
      input: [244, 21, 53],
      ring: [324, 84, 100],
      radius: "0.5rem",
      chart1: [324, 84, 45],
      chart2: [199, 94, 47],
      chart3: [158, 100, 21],
      chart4: [158, 100, 31],
      chart5: [324, 84, 55],
    },
  },
  "soft-jewel": {
    ...softJewelPalette,
  },
  "elegant-lively": {
    ...elegantLivelyPalette,
  },
  "vibrant-complementary": {
    ...vibrantComplementaryPalette,
  },
  "modern-warm": {
    ...modernWarmPalette,
  },
  "clean-charming": {
    ...cleanCharmingPalette,
  },
};

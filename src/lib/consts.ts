import { generatePalette } from "@/lib/palette/utils";
import { Palette, ParsedPalette } from "@/models/palette";

// const nordPalette = generatePalette({
//   primary: [210, 34, 63],
//   secondary: [220, 15, 55],
//   accent: [197, 45, 67],
//   background: [220, 16, 20],
//   error: [0, 79, 55],
//   card: [220, 16, 20],
//   theme: "light",
// });

// const naturePalette = generatePalette({
//   primary: [120, 57, 40],
//   secondary: [60, 70, 50],
//   accent: [180, 50, 60],
//   background: [210, 20, 95],
//   error: [0, 70, 50],
//   card: [210, 20, 95],
//   theme: "light",
// });

// const duskPalette = generatePalette({
//   primary: [285, 45, 60],
//   secondary: [205, 65, 50],
//   accent: [33, 85, 45],
//   background: [260, 30, 90],
//   error: [0, 80, 65],
//   card: [260, 30, 90],
//   theme: "light",
// });

// const earthyPalette = generatePalette({
//   primary: [25, 60, 35],
//   secondary: [50, 35, 40],
//   accent: [112, 55, 50],
//   background: [30, 25, 85],
//   error: [0, 70, 45],
//   card: [30, 25, 85],
//   theme: "light",
// });

// const pastelDreamPalette = generatePalette({
//   primary: [190, 80, 85],
//   secondary: [320, 70, 75],
//   accent: [100, 65, 65],
//   background: [220, 20, 95],
//   error: [0, 75, 50],
//   card: [220, 20, 95],
//   theme: "light",
// });

// const retroWavePalette = generatePalette({
//   primary: [290, 65, 75],
//   secondary: [180, 75, 55],
//   accent: [60, 90, 65],
//   background: [250, 30, 85],
//   error: [0, 80, 55],
//   card: [250, 30, 85],
//   theme: "light",
// });

// const citrusPalette = generatePalette({
//   primary: [35, 85, 55],
//   secondary: [60, 90, 65],
//   accent: [45, 80, 70],
//   background: [55, 25, 90],
//   error: [0, 75, 60],
//   card: [55, 25, 90],
//   theme: "light",
// });

// const oceanBreezePalette = generatePalette({
//   primary: [200, 85, 65],
//   secondary: [175, 75, 75],
//   accent: [190, 80, 70],
//   background: [210, 25, 95],
//   error: [0, 70, 55],
//   card: [210, 25, 95],
//   theme: "light",
// });

// const midnightGlowPalette = generatePalette({
//   primary: [260, 75, 50],
//   secondary: [280, 55, 45],
//   accent: [240, 60, 55],
//   background: [270, 20, 90],
//   error: [0, 70, 50],
//   card: [270, 20, 90],
//   theme: "light",
// });

// const sunsetPalette = generatePalette({
//   primary: [20, 85, 65],
//   secondary: [40, 75, 55],
//   accent: [10, 90, 75],
//   background: [15, 25, 85],
//   error: [0, 80, 60],
//   card: [15, 25, 85],
//   theme: "light",
// });

// const softJewelPalette = generatePalette({
//   primary: [271, 79, 63],
//   secondary: [2, 64, 69],
//   accent: [45, 90, 74],
//   background: [210, 11, 94],
//   error: [0, 79, 55],
//   card: [210, 11, 94],
//   theme: "light",
// });

// const elegantLivelyPalette = generatePalette({
//   primary: [33, 92, 52], // Primary
//   secondary: [220, 52, 67], // Secondary
//   accent: [44, 92, 81], // Accent
//   background: [36, 10, 92], // Neutral
//   error: [20, 100, 45], // Error
//   card: [36, 10, 92],
//   theme: "light",
// });

// const vibrantComplementaryPalette = generatePalette({
//   primary: [25, 85, 47], // Primary
//   secondary: [310, 62, 84], // Secondary
//   accent: [112, 73, 69], // Accent
//   background: [285, 13, 91], // Neutral
//   error: [18, 90, 52], // Error
//   card: [285, 13, 91],
//   theme: "light",
// });

// const modernWarmPalette = generatePalette({
//   primary: [240, 71, 45], // Primary
//   secondary: [212, 66, 78], // Secondary
//   accent: [320, 83, 73], // Accent
//   background: [150, 27, 87], // Neutral
//   error: [25, 90, 59], // Error
//   card: [150, 27, 87],
//   theme: "light",
// });

// const cleanCharmingPalette = generatePalette({
//   primary: [32, 100, 49], // Primary
//   secondary: [260, 79, 72], // Secondary
//   accent: [45, 93, 71], // Accent
//   background: [220, 15, 93], // Neutral
//   error: [10, 79, 47], // Error
//   card: [220, 15, 93],
//   theme: "light",
// });

// const poopUp = generatePalette({
//   primary: [35, 100, 65], // Primary
//   secondary: [13, 37, 42], // Secondary
//   accent: [159, 44, 40], // Accent
//   background: [37, 79, 94], // Neutral
//   error: [0, 91, 71], // Error
//   card: [36, 77, 90],
//   text: [14, 41, 10],
//   theme: "light",
// });

export const basePalette: ParsedPalette = {
  name: "base",
  owner: "system",
  colors: {
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
      "chart-1": [324, 84, 65],
      "chart-2": [199, 94, 67],
      "chart-3": [158, 100, 41],
      "chart-4": [158, 100, 51],
      "chart-5": [324, 84, 75],
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
      "chart-1": [324, 84, 45],
      "chart-2": [199, 94, 47],
      "chart-3": [158, 100, 21],
      "chart-4": [158, 100, 31],
      "chart-5": [324, 84, 55],
    },
  },
  id: "a1b2c3",
};
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

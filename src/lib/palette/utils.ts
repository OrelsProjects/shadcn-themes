"use client";

import { HSL, ThemePalette } from "@/models/palette";

interface Palettes {
  light: ThemePalette;
  dark: ThemePalette;
}

export function generatePalette(
  primary: HSL,
  secondary: HSL,
  accent: HSL,
  neutral: HSL,
  error: HSL,
): Palettes {
  function clampLightness(l: number): number {
    return Math.min(Math.max(l, 0), 100);
  }

  // A gentle function to adjust lightness without going overboard
  function adjustLightness(color: HSL, delta: number): HSL {
    const [h, s, l] = color;
    return [h, s, clampLightness(l + delta)];
  }

  // For light mode, we start with a brighter background and ensure foregrounds are readable.
  // We’ll pick moderate offsets that don’t stray too far from the original:
  const light: ThemePalette = {
    background: adjustLightness(neutral,  +30), // brighten neutral
    foreground: adjustLightness(neutral,  -40),
    card:       adjustLightness(neutral,  +25),
    "card-foreground": adjustLightness(neutral, -40),
    popover:    adjustLightness(neutral,  +30),
    "popover-foreground": adjustLightness(neutral, -40),

    // Keep primary/secondary/accent closer to their base, only slightly nudging lightness
    primary: adjustLightness(primary, +0),
    "primary-foreground": adjustLightness(primary, -60),

    secondary: adjustLightness(secondary, +0),
    "secondary-foreground": adjustLightness(secondary, -60),

    muted: adjustLightness(primary, -10),
    "muted-foreground": adjustLightness(primary, -40),

    accent: adjustLightness(accent, +0),
    "accent-foreground": adjustLightness(accent, -60),

    destructive: adjustLightness(error, +0),
    "destructive-foreground": adjustLightness(error, +60),

    border: adjustLightness(neutral, +0),
    input: adjustLightness(neutral, +5),
    ring: adjustLightness(primary, -10),

    radius: "0.5rem",

    // Charts can follow a similar approach, keeping close to the original colors:
    chart1: adjustLightness(primary, +0),
    chart2: adjustLightness(secondary, +0),
    chart3: adjustLightness(accent, +0),
    chart4: adjustLightness(accent, +10),
    chart5: adjustLightness(primary, +10),
  };

  // For dark mode, we go darker by decreasing lightness, but not to extremes.
  // Keep the relationships similar, but shift all neutrals and base colors downward.
  const dark: ThemePalette = {
    background: adjustLightness(neutral, -70),
    foreground: adjustLightness(neutral, +40),
    card:       adjustLightness(neutral, -60),
    "card-foreground": adjustLightness(neutral, +40),
    popover:    adjustLightness(neutral, -70),
    "popover-foreground": adjustLightness(neutral, +40),

    primary: adjustLightness(primary, -20),
    "primary-foreground": adjustLightness(primary, +60),

    secondary: adjustLightness(secondary, -20),
    "secondary-foreground": adjustLightness(secondary, +60),

    muted: adjustLightness(primary, +20),
    "muted-foreground": adjustLightness(primary, -50),

    accent: adjustLightness(accent, -20),
    "accent-foreground": adjustLightness(accent, +60),

    destructive: adjustLightness(error, -20),
    "destructive-foreground": adjustLightness(error, +60),

    border: adjustLightness(neutral, -20),
    input: adjustLightness(neutral, +20),
    ring: adjustLightness(primary, +20),

    radius: "0.5rem",

    chart1: adjustLightness(primary, -20),
    chart2: adjustLightness(secondary, -20),
    chart3: adjustLightness(accent, -20),
    chart4: adjustLightness(accent, -10),
    chart5: adjustLightness(primary, -10),
  };

  return { light, dark };
}

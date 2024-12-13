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
  // Helper function to adjust lightness
  function adjustLightness(color: HSL, percentage: number): HSL {
    const [h, s, l] = color;
    const newLightness = Math.min(Math.max(l + percentage, 0), 100); // Clamp between 0 and 100
    return [h, s, newLightness];
  }

  // Base light and dark palettes
  const light: ThemePalette = {
    background: adjustLightness(neutral, 90),
    foreground: adjustLightness(neutral, -70),
    card: adjustLightness(neutral, 80),
    "card-foreground": adjustLightness(neutral, -50),
    popover: adjustLightness(neutral, 90),
    "popover-foreground": adjustLightness(neutral, -70),
    primary: adjustLightness(neutral, 90),
    "primary-foreground": adjustLightness(neutral, -70),
    secondary: adjustLightness(neutral, 50),
    "secondary-foreground": adjustLightness(neutral, 50),
    muted: primary,
    "muted-foreground": adjustLightness(primary, -60),
    accent: secondary,
    "accent-foreground": adjustLightness(secondary, -60),
    destructive: accent,
    "destructive-foreground": adjustLightness(accent, -60),
    border: error,
    input: adjustLightness(error, 60),
    ring: adjustLightness(primary, -20),
    radius: "0.5rem", // Radius as a string for consistent UI components
    chart1: primary,
    chart2: secondary,
    chart3: accent,
    chart4: adjustLightness(accent, 20),
    chart5: adjustLightness(primary, 10),
  };

  const dark: ThemePalette = {
    background: adjustLightness(neutral, -80),
    foreground: adjustLightness(neutral, 80),
    card: adjustLightness(neutral, -60),
    "card-foreground": adjustLightness(neutral, 40),
    popover: adjustLightness(neutral, -80),
    "popover-foreground": adjustLightness(neutral, 80),
    primary: adjustLightness(neutral, -80),
    "primary-foreground": adjustLightness(neutral, 80),
    secondary: adjustLightness(neutral, -60),
    "secondary-foreground": adjustLightness(neutral, -60),
    muted: adjustLightness(primary, -20),
    "muted-foreground": adjustLightness(primary, 60),
    accent: adjustLightness(secondary, -20),
    "accent-foreground": adjustLightness(secondary, 60),
    destructive: adjustLightness(accent, -20),
    "destructive-foreground": adjustLightness(accent, 60),
    border: adjustLightness(error, -20),
    input: adjustLightness(error, 80),
    ring: adjustLightness(primary, 40),
    chart1: adjustLightness(primary, -20),
    chart2: adjustLightness(secondary, -20),
    chart3: adjustLightness(accent, -20),
    chart4: adjustLightness(accent, -10),
    chart5: adjustLightness(primary, -10),
    radius: "0.5rem", // Same consistent radius
  };

  return { light, dark };
}

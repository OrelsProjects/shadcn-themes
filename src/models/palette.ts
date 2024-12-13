
export type HSL = [number, number, number]; // [hue, saturation, lightness]
export type ThemeType = "light" | "dark";
export type PaletteName = string;

export type Palette = Record<PaletteName, Record<ThemeType, ThemePalette>>;

export interface ThemePalette {
  background: HSL;
  foreground: HSL;
  card: HSL;
  "card-foreground": HSL;
  popover: HSL;
  "popover-foreground": HSL;
  primary: HSL;
  "primary-foreground": HSL;
  secondary: HSL;
  "secondary-foreground": HSL;
  muted: HSL;
  "muted-foreground": HSL;
  accent: HSL;
  "accent-foreground": HSL;
  destructive: HSL;
  "destructive-foreground": HSL;
  border: HSL;
  input: HSL;
  ring: HSL;
  radius: string;
  chart1: HSL;
  chart2: HSL;
  chart3: HSL;
  chart4: HSL;
  chart5: HSL;
}

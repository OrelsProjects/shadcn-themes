export type HSL = [number, number, number]; // [hue, saturation, lightness]
export type ThemeType = "light" | "dark";
export type PaletteName = string;

export type Palette = Record<PaletteName, Record<ThemeType, ThemePalette>>;

export type EncryptedPalette = {
  id: string;
  name: string;
  owner: string;
  iv: string;
  encryptedKey: string;
  encryptedColors: string;
};

export type ParsedPalette = {
  id: string;
  name: string;
  owner: string;
  views: number;
  colors: Record<ThemeType, ThemePalette>;
};

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
  "chart-1": HSL;
  "chart-2": HSL;
  "chart-3": HSL;
  "chart-4": HSL;
  "chart-5": HSL;
}

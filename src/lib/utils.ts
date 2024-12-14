import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ThemePalette } from "@/models/palette";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThemeColor(
  color: keyof ThemePalette,
  theme: ThemePalette,
  addHsl?: boolean,
): string {
  if (!theme[color]) {
    return "";
  }
  const hslString = `${theme[color][0]} ${theme[color][1]}% ${theme[color][2]}%`;
  const value = addHsl ? `hsl(${hslString})` : `${hslString}`;
  return value;
}

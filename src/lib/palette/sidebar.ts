import { Colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import { BasePalette, ThemeType, SidebarTheme } from "@/models/palette";
import { darkenHSL } from "@/lib/palette/utils";

extend([mixPlugin, a11yPlugin, harmoniesPlugin]);

/**
 * Utility: clamp & round to 1 digit.
 */
function finalizeHSL(h: number, s: number, l: number): [number, number, number] {
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));
  // wrap negative hue properly
  const hh = ((h % 360) + 360) % 360;
  const ss = clamp(s, 0, 100);
  const ll = clamp(l, 0, 100);
  return [
    parseFloat(hh.toFixed(1)),
    parseFloat(ss.toFixed(1)),
    parseFloat(ll.toFixed(1)),
  ];
}

function toColord(hsl: [number, number, number]): Colord {
  return new Colord({ h: hsl[0], s: hsl[1], l: hsl[2] });
}
function fromColord(c: Colord): [number, number, number] {
  const hsl = c.toHsl();
  return finalizeHSL(hsl.h, hsl.s, hsl.l);
}

/**
 * A more robust ensureContrast:
 *  - Keep the original hue & saturation.
 *  - Do a binary search on L in [0..100].
 *  - Return a color that tries to meet `minContrastRatio` vs. the background.
 *
 * Typical usage: ensureContrast(fg, bg, 4.5).
 */
export function ensureContrast(
  colorHSL: [number, number, number],
  bgHSL: [number, number, number],
  minContrastRatio = 4.5,
  maxSteps = 10,
): [number, number, number] {
  const colBg = toColord(bgHSL);
  const bgIsLight = colBg.isLight();

  // If color is already good, just return it.
  let col = toColord(colorHSL);
  if (col.contrast(colBg) >= minContrastRatio) {
    return colorHSL;
  }

  // We'll preserve the original hue & saturation but adjust lightness.
  const { h, s } = col.toHsl();
  // We'll do a binary search for L in [0..100].
  let low = 0;
  let high = 100;
  let bestColor = col;
  let bestContrast = 0;

  for (let i = 0; i < maxSteps; i++) {
    // This midpoint is a guess for L
    const mid = (low + high) / 2;

    const candidate = new Colord({ h, s, l: mid });
    const cRatio = candidate.contrast(colBg);

    if (cRatio > bestContrast) {
      bestContrast = cRatio;
      bestColor = candidate;
    }

    // If we already surpass minContrastRatio, move “inward” 
    // so we can keep searching for an even better (darker/lighter) color 
    // that still meets the ratio:
    if (cRatio >= minContrastRatio) {
      // If the background is light, we want a darker color => push ‘high’ upward
      // (that is, move toward 0 for L).
      // If the background is dark, we want a lighter color => push ‘low’ upward.
      if (bgIsLight) {
        high = mid;
      } else {
        low = mid;
      }
    } else {
      // Not enough contrast => move in the direction that increases contrast.
      // If bg is light, we need to go lower with L to get more contrast.
      // If bg is dark, we need to go higher with L.
      if (bgIsLight) {
        high = mid;
      } else {
        low = mid;
      }
    }
  }

  return fromColord(bestColor);
}
export function buildSidebarTheme(theme: BasePalette, type: ThemeType): SidebarTheme {
  // Slight darkening for the base
  const factor = type === "dark" ? 0.1 : 0.05;

  // "base" darker backgrounds etc.
  const sidebarBackground = darkenHSL(theme.background, factor);

  // Now ensure "foreground" has enough contrast on that new background
  const sidebarForeground = ensureContrast(
    theme.foreground,
    sidebarBackground,
    4.5,
  );

  const sidebarPrimary = darkenHSL(theme.primary, factor);
  const sidebarPrimaryForeground = ensureContrast(
    theme["primary-foreground"],
    sidebarPrimary,
    4.5,
  );

  const sidebarAccent = darkenHSL(theme.accent, factor);
  const sidebarAccentForeground = ensureContrast(
    theme["accent-foreground"],
    sidebarAccent,
    4.5,
  );

  // border/ring typically not text, so no forced contrast
  const sidebarBorder = darkenHSL(theme.border, factor);
  const sidebarRing = darkenHSL(theme.ring, factor);

  return {
    "sidebar-background": sidebarBackground,
    "sidebar-foreground": sidebarForeground,
    "sidebar-primary": sidebarPrimary,
    "sidebar-primary-foreground": sidebarPrimaryForeground,
    "sidebar-accent": sidebarAccent,
    "sidebar-accent-foreground": sidebarAccentForeground,
    "sidebar-border": sidebarBorder,
    "sidebar-ring": sidebarRing,
  };
}

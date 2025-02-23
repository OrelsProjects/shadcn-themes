import { Colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";

import {
  BasePalette,
  HSL,
  SidebarTheme,
  ThemePalette,
  ThemeType,
} from "@/models/palette";
import { buildSidebarTheme } from "@/lib/palette/sidebar";

// Ensure .mix() is available
extend([a11yPlugin, harmoniesPlugin, mixPlugin]);

/**
 * Round a number to 1 digit after the decimal.
 */
function roundOne(num: number): number {
  return parseFloat(num.toFixed(1));
}

/**
 * Clamp a number into [min, max].
 */
function clamp(val: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Convert [h, s, l] to a new triple, clamped & rounded to 1 decimal place.
 */
function finalizeHSL(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  const hh = ((h % 360) + 360) % 360; // wrap negative
  const ss = clamp(s, 0, 100);
  const ll = clamp(l, 0, 100);
  return [roundOne(hh), roundOne(ss), roundOne(ll)];
}

/**
 * Return a random integer in [min, max].
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return a random HSL with minimal saturation to avoid bland colors.
 */
function randomHSL(): [number, number, number] {
  const h = randomInt(0, 359);
  const s = randomInt(20, 100);
  const l = randomInt(0, 100);
  return finalizeHSL(h, s, l);
}

/**
 * Convert [h,s,l] <-> colord, so we can use .mix(), .darken(), etc.
 */
function toColord(hsl: [number, number, number]): Colord {
  return new Colord({ h: hsl[0], s: hsl[1], l: hsl[2] });
}
function fromColord(c: Colord): [number, number, number] {
  const hsl = c.toHsl();
  return finalizeHSL(hsl.h, hsl.s, hsl.l);
}

/**
 * Darkens the color by a given factor (0..1).
 */
export function darkenHSL(hsl: [number, number, number], factor: number) {
  const col = toColord(hsl);
  // .darken() factor is in [0..1], e.g. 0.4 => 40% darker
  return fromColord(col.darken(factor));
}

/**
 * Lightens the color by a given factor (0..1).
 */
export function lightenHSL(hsl: [number, number, number], factor: number) {
  const col = toColord(hsl);
  return fromColord(col.lighten(factor));
}

/**
 * Slightly nudge color => target by factor in [0..1].
 */
function nudgeTowards(
  color: [number, number, number],
  target: [number, number, number],
  factor = 0.1,
): [number, number, number] {
  const c1 = toColord(color);
  const c2 = toColord(target);
  return fromColord(c1.mix(c2, factor));
}

/**
 * Create or use a "primary" [h, s, l].
 */
function createPrimary(hue?: number): [number, number, number] {
  const h = hue ?? randomInt(0, 359);
  const s = randomInt(70, 95);
  const l = randomInt(40, 60);
  return finalizeHSL(h, s, l);
}

/**
 * Create a random "destructive" (red).
 */
function createDestructive(): [number, number, number] {
  const s = randomInt(80, 95);
  const l = randomInt(50, 60);
  return finalizeHSL(0, s, l);
}

/**
 * Build baseline LIGHT theme (shadcn-like).
 */
function buildLightTheme(
  primary: [number, number, number],
  destructive: [number, number, number],
): ThemePalette {
  const background = finalizeHSL(0, 0, 100);
  const foreground = finalizeHSL(20, 14, 4);

  const popover = background;
  const popoverForeground = foreground;
  const card = background;
  const cardForeground = foreground;
  const border = finalizeHSL(20, 6, 90);
  const input = border;

  const muted = finalizeHSL(60, 5, 96);
  const mutedForeground = finalizeHSL(25, 6, 45);

  // secondary, accent = muted
  const secondary = muted;
  const accent = muted;

  const primaryForeground = finalizeHSL(60, 9, 98);
  const destructiveForeground = finalizeHSL(60, 9, 98);
  const ring = primary;

  const basePalette: BasePalette = {
    background,
    foreground,
    popover,
    "popover-foreground": popoverForeground,
    card,
    "card-foreground": cardForeground,
    border,
    input,
    primary,
    "primary-foreground": primaryForeground,
    secondary,
    "secondary-foreground": mutedForeground,
    accent,
    "accent-foreground": mutedForeground,
    muted,
    "muted-foreground": mutedForeground,
    destructive,
    "destructive-foreground": destructiveForeground,
    ring,
    radius: "0.95rem",
    "chart-1": primary,
    "chart-2": secondary,
    "chart-3": accent,
    "chart-4": muted,
    "chart-5": background,
  };

  const sideBar = buildSidebarTheme(basePalette, "light");
  return {
    ...basePalette,
    ...sideBar,
  };
}

/**
 * Build baseline DARK theme (shadcn-like), but *derived*
 * from the light theme's values. So we do *not* randomize
 * the background, etc. Instead, we systematically transform
 * each color to be truly dark, but maintain hue relationships.
 */
function buildDarkTheme(
  primary: [number, number, number],
  destructive: [number, number, number],
  lightTheme: ThemePalette,
): ThemePalette {
  // We transform the light background => a dark background
  // e.g. darken by 0.85
  const background = darkenHSL(lightTheme.background, 0.85);
  // Similarly, lighten the light foreground (since it's near black, it might become near white if we want)
  // But let's do the opposite: if the light foreground is dark, we lighten it enough to be readable.
  const foreground = lightenHSL(lightTheme.foreground, 0.7);

  const popover = background;
  const popoverForeground = foreground;

  // For card, let's darken it more than background for variety, or lighten it slightly if the light card is the same as background.
  const card = darkenHSL(lightTheme.card, 0.75);
  const cardForeground = foreground;

  const border = darkenHSL(lightTheme.border, 0.5);
  const input = border;

  // For muted, we can darken it but keep the same hue
  const muted = darkenHSL(lightTheme.muted, 0.7);
  // The muted foreground can be lightly brightened
  const mutedForeground = lightenHSL(lightTheme["muted-foreground"], 0.5);

  // Keep the same hue for primary, but clamp to a lower L. If you want even darker, do darkenHSL.
  // We'll do a partial approach: if the light is [ph, ps, pl], we do something like .darken(0.3).
  const primaryDark = primary;
  // Foreground => near white
  const primaryForeground = [210, 40, 98] as [number, number, number];

  // Destructive => same approach
  const destructiveDark = darkenHSL(destructive, 0.3);
  const destructiveForeground: HSL = [210, 40, 98];

  // ring => same as primaryDark
  const ring = primaryDark;

  const baseTheme = {
    background,
    foreground,
    popover,
    "popover-foreground": popoverForeground,
    card,
    "card-foreground": cardForeground,
    border,
    input,
    primary: primaryDark,
    "primary-foreground": primaryForeground,
    secondary: darkenHSL(lightTheme.secondary, 0.65),
    "secondary-foreground": lightenHSL(lightTheme["secondary-foreground"], 0.5),
    accent: darkenHSL(lightTheme.accent, 0.65),
    "accent-foreground": lightenHSL(lightTheme["accent-foreground"], 0.5),
    muted,
    "muted-foreground": mutedForeground,
    destructive: destructiveDark,
    "destructive-foreground": destructiveForeground,
    ring,
    radius: "",
    "chart-1": darkenHSL(lightTheme["chart-1"], 0.3),
    "chart-2": darkenHSL(lightTheme["chart-2"], 0.3),
    "chart-3": darkenHSL(lightTheme["chart-3"], 0.3),
    "chart-4": darkenHSL(lightTheme["chart-4"], 0.3),
    "chart-5": background,
  };

  const sideBar = buildSidebarTheme(baseTheme, "dark");

  return {
    ...baseTheme,
    ...sideBar,
  };
}

// We skip messing with 'primary' and 'primary-foreground'.
const skipKeys = ["primary", "primary-foreground"] as const;

function isHSLValue(val: HSL | string): val is HSL {
  return Array.isArray(val) && val.length === 3;
}
function isSkipKey(key: keyof ThemePalette): key is (typeof skipKeys)[number] {
  return skipKeys.includes(key as (typeof skipKeys)[number]);
}

/**
 * Applies the entire "crazy" logic to the theme, for crazyRate in [0..100].
 */
function applyCrazy(theme: ThemePalette, crazyRate: number): ThemePalette {
  // If exactly 100 => fully random
  if (crazyRate === 100) {
    const newTheme = { ...theme };

    // 1) random bg + contrast fg
    const randomBg = randomHSL();
    const bgCol = toColord(randomBg);
    let randomFg = randomHSL();
    for (let i = 0; i < 20; i++) {
      const fgCol = toColord(randomFg);
      if (fgCol.contrast(bgCol) >= 4.5) break;
      randomFg = randomHSL();
    }
    newTheme.background = randomBg;
    newTheme.foreground = randomFg;
    newTheme.popover = randomBg;
    newTheme["popover-foreground"] = randomFg;
    newTheme.card = randomBg;
    newTheme["card-foreground"] = randomFg;

    // randomize others (skip primary, primary-foreground)
    for (const key of Object.keys(newTheme) as (keyof ThemePalette)[]) {
      if (isSkipKey(key)) continue;
      if (key === "radius") continue;
      const val = newTheme[key];
      if (!isHSLValue(val)) continue;
      newTheme[key] = randomHSL();
    }
    return newTheme;
  }

  // Otherwise => multi-step approach
  function rangeFactor(start: number, end: number) {
    if (crazyRate <= start) return 0;
    if (crazyRate >= end) return 1;
    return (crazyRate - start) / (end - start);
  }

  const factorA = rangeFactor(0, 10);
  const factorB = rangeFactor(10, 30);
  const factorC = rangeFactor(30, 60);
  const factorD = rangeFactor(60, 90);
  const factorE = rangeFactor(90, 100);

  const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

  // shift amounts
  const hueShiftA = 5;
  const satShiftA = 5;
  const lightShiftA = 3;

  const hueShiftB = 10;
  const satShiftB = 10;
  const lightShiftB = 8;

  const hueShiftC = 40;
  const satShiftC = 40;
  const lightShiftC = 35;

  const hueShiftD = 100;
  const satShiftD = 70;
  const lightShiftD = 45;

  const hueShiftE = 150;
  const satShiftE = 90;
  const lightShiftE = 50;

  const totalHueShift =
    hueShiftA * factorA * randomSign() +
    hueShiftB * factorB * randomSign() +
    hueShiftC * factorC * randomSign() +
    hueShiftD * factorD * randomSign() +
    hueShiftE * factorE * randomSign();

  const totalSatShift =
    satShiftA * factorA * randomSign() +
    satShiftB * factorB * randomSign() +
    satShiftC * factorC * randomSign() +
    satShiftD * factorD * randomSign() +
    satShiftE * factorE * randomSign();

  const totalLightShift =
    lightShiftA * factorA * randomSign() +
    lightShiftB * factorB * randomSign() +
    lightShiftC * factorC * randomSign() +
    lightShiftD * factorD * randomSign() +
    lightShiftE * factorE * randomSign();

  function shiftHSL([h, s, l]: [number, number, number]): [
    number,
    number,
    number,
  ] {
    h += totalHueShift;
    s += totalSatShift;
    l += totalLightShift;
    return finalizeHSL(h, s, l);
  }

  const newTheme = { ...theme };

  // Shift everything except skipKeys, radius, etc.
  for (const key of Object.keys(newTheme) as (keyof ThemePalette)[]) {
    if (isSkipKey(key)) continue;
    if (key === "radius") continue;
    const val = newTheme[key];
    if (!isHSLValue(val)) continue;
    newTheme[key] = shiftHSL(val);
  }

  // If factorA > 0 => mild nudge on card & muted toward 'primary'
  if (factorA > 0) {
    const nudgeBase = 0.3 * factorA;
    if (isHSLValue(newTheme.card) && isHSLValue(newTheme.primary)) {
      newTheme.card = nudgeTowards(newTheme.card, newTheme.primary, nudgeBase);
    }
    if (isHSLValue(newTheme.muted) && isHSLValue(newTheme.primary)) {
      newTheme.muted = nudgeTowards(
        newTheme.muted,
        newTheme.primary,
        nudgeBase,
      );
    }
  }

  return newTheme;
}

/**
 * Build a baseline LIGHT theme derived from an existing dark theme
 * (inverse of buildDarkTheme).
 */
export function buildLightThemeFromDark(darkTheme: ThemePalette): ThemePalette {
  // lighten background by 0.85
  const background = lightenHSL(darkTheme.background, 0.85);

  // darken foreground by 0.7
  const foreground = darkenHSL(darkTheme.foreground, 0.7);

  // popover
  const popover = background;
  const popoverForeground = foreground;

  // card => was 0.75, now 0.5 to avoid clashing with primary
  const card = darkenHSL(background, 0.01);
  const cardForeground = foreground;

  // border => lighten by 0.5
  const border = lightenHSL(darkTheme.border, 0.5);
  const input = border;

  // muted => lighten by 0.7
  const muted = lightenHSL(darkTheme.muted, 0.7);
  // muted foreground => darken by 0.5
  const mutedForeground = darkenHSL(darkTheme["muted-foreground"], 0.5);

  // primary => same hue, a bit lighter
  const primaryLight = darkenHSL(darkTheme.primary, 0.1);
  // primary foreground => same as darkTheme.primary-foreground, but a bit darker
  const primaryForeground = darkenHSL(darkTheme["primary-foreground"], 0.1);

  // destructive => lighten by 0.3
  const destructiveLight = lightenHSL(darkTheme.destructive, 0.3);
  const destructiveForeground: HSL = [20, 14, 4];

  // ring => reuse the primary color
  const ring = primaryLight;

  // charts => invert the “darken by 0.3” to lighten by 0.3
  const chart1 = lightenHSL(darkTheme["chart-1"], 0.3);
  const chart2 = lightenHSL(darkTheme["chart-2"], 0.3);
  const chart3 = lightenHSL(darkTheme["chart-3"], 0.3);
  const chart4 = lightenHSL(darkTheme["chart-4"], 0.3);
  const chart5 = background;

  const baseTheme: BasePalette = {
    background,
    foreground,
    popover,
    "popover-foreground": popoverForeground,
    card,
    "card-foreground": cardForeground,
    border,
    input,
    primary: primaryLight,
    "primary-foreground": primaryForeground,
    secondary: lightenHSL(darkTheme.secondary, 0.65),
    "secondary-foreground": darkenHSL(darkTheme["secondary-foreground"], 0.5),
    accent: lightenHSL(darkTheme.accent, 0.65),
    "accent-foreground": darkenHSL(darkTheme["accent-foreground"], 0.5),
    muted,
    "muted-foreground": mutedForeground,
    destructive: destructiveLight,
    "destructive-foreground": destructiveForeground,
    ring,
    radius: "",
    "chart-1": chart1,
    "chart-2": chart2,
    "chart-3": chart3,
    "chart-4": chart4,
    "chart-5": chart5,
  };

  // build a "light" sidebar from the baseTheme
  const sideBar = buildSidebarTheme(baseTheme, "light");

  return {
    ...baseTheme,
    ...sideBar,
  };
}

/**
 * Final function that returns { light, dark } for any crazyRate=0..100,
 * ensuring the dark theme is derived from the light theme's colors
 * (no random background).
 */
export function createThemeConfig(
  crazyRate: number,
  primaryColor?: [number, number, number] | null,
): { light: ThemePalette; dark: ThemePalette } {
  const chosenPrimary = primaryColor
    ? finalizeHSL(primaryColor[0], primaryColor[1], primaryColor[2])
    : createPrimary();

  const destructive = createDestructive();

  // 1) Build light baseline
  const lightBase = buildLightTheme(chosenPrimary, destructive);

  // 2) Build dark baseline by deriving from light (no random BG)
  const darkBase = buildDarkTheme(chosenPrimary, destructive, lightBase);

  // 3) Then apply "crazy" transformations to each
  const finalLight = applyCrazy(lightBase, crazyRate);
  const finalDark = applyCrazy(darkBase, crazyRate);

  return { light: finalLight, dark: finalDark };
}

import { Colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";

import { HSL, ThemePalette } from "@/models/palette";

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
function finalizeHSL(h: number, s: number, l: number): [number, number, number] {
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
 * Convert [h,s,l] <-> colord, so we can use .mix().
 */
function toColord(hsl: [number, number, number]): Colord {
  return new Colord({ h: hsl[0], s: hsl[1], l: hsl[2] });
}
function fromColord(c: Colord): [number, number, number] {
  const hsl = c.toHsl();
  return finalizeHSL(hsl.h, hsl.s, hsl.l);
}

/**
 * Nudges color `color` slightly toward `target` by a factor in [0..1].
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
  const s = randomInt(80, 95);
  const l = randomInt(50, 60);
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

  return {
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
}

/**
 * Build baseline DARK theme (shadcn-like).
 */
function buildDarkTheme(
  primary: [number, number, number],
  destructive: [number, number, number],
): ThemePalette {
  const [ph, ps, pl] = primary;

  // Very dark background
  const background = finalizeHSL(ph, randomInt(70, 85), randomInt(4, 5));
  const foreground = finalizeHSL(210, 40, 98);

  const popover = background;
  const popoverForeground = foreground;
  const card = background;
  const cardForeground = foreground;

  const bgL = background[2];
  const mutedL = clamp(bgL + 12, 0, 30);
  const muted = finalizeHSL(background[0], clamp(background[1] - 40), mutedL);
  const mutedForeground = finalizeHSL(215, 20, 65);

  const secondary = muted;
  const accent = muted;

  const border = muted;
  const input = muted;

  // clamp primary ~50–60% L for dark
  const primaryDark = finalizeHSL(ph, clamp(ps, 50, 95), clamp(pl, 50, 60));
  const primaryForeground = finalizeHSL(ph + 2, 47, 12);

  const [dh, ds, dl] = destructive;
  const destructiveDark = finalizeHSL(dh, clamp(ds, 60, 90), clamp(dl, 30, 50));
  const destructiveForeground = finalizeHSL(210, 40, 98);

  const ring = primaryDark;

  return {
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
    secondary,
    "secondary-foreground": mutedForeground,
    accent,
    "accent-foreground": mutedForeground,
    muted,
    "muted-foreground": mutedForeground,
    destructive: destructiveDark,
    "destructive-foreground": destructiveForeground,
    ring,
    radius: "",
    "chart-1": primaryDark,
    "chart-2": secondary,
    "chart-3": accent,
    "chart-4": muted,
    "chart-5": background,
  };
}

/**
 * We skip messing with 'primary' and 'primary-foreground'.
 */
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
function applyCrazy(
  theme: ThemePalette,
  crazyRate: number,
): ThemePalette {
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
  // factorA => 0..10
  // factorB => 10..30
  // factorC => 30..60
  // factorD => 60..90
  // factorE => 90..100
  function rangeFactor(start: number, end: number) {
    if (crazyRate <= start) return 0;
    if (crazyRate >= end) return 1;
    return (crazyRate - start) / (end - start);
  }

  const factorA = rangeFactor(0, 10);   // mild
  const factorB = rangeFactor(10, 30);  // more (nerfed)
  const factorC = rangeFactor(30, 60);  // bigger
  const factorD = rangeFactor(60, 90);  // large
  const factorE = rangeFactor(90, 100); // extreme

  const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

  // factorA => 0..10 => old "10..30" => 5 shift
  const hueShiftA = 5;
  const satShiftA = 5;
  const lightShiftA = 3;

  // factorB => 10..30 => old "30..60" => now nerfed
  // originally we used 25, let's reduce to 15
  const hueShiftB = 10;  // was 25
  const satShiftB = 10;  // was 25
  const lightShiftB = 8; // was 15

  // factorC => 30..60 => old "60..90" => big => 60
  const hueShiftC = 40;
  const satShiftC = 40;
  const lightShiftC = 35;

  // factorD => 60..90 => old "90..100" => huge => 100
  const hueShiftD = 100;
  const satShiftD = 70;
  const lightShiftD = 45;

  // factorE => 90..100 => brand-new => 150
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

  function shiftHSL([h, s, l]: [number, number, number]): [number, number, number] {
    h += totalHueShift;
    s += totalSatShift;
    l += totalLightShift;
    return finalizeHSL(h, s, l);
  }

  const newTheme = { ...theme };

  // Step 1: Shift everything except skipKeys, radius, etc.
  for (const key of Object.keys(newTheme) as (keyof ThemePalette)[]) {
    if (isSkipKey(key)) continue;
    if (key === "radius") continue;
    const val = newTheme[key];
    if (!isHSLValue(val)) continue;
    newTheme[key] = shiftHSL(val);
  }

  // Step 2: If factorA > 0 => do a mild "nudge" on card & muted toward 'primary'.
  if (factorA > 0) {
    const nudgeBase = 0.3 * factorA;
    if (isHSLValue(newTheme.card) && isHSLValue(newTheme.primary)) {
      newTheme.card = nudgeTowards(newTheme.card, newTheme.primary, nudgeBase);
    }
    if (isHSLValue(newTheme.muted) && isHSLValue(newTheme.primary)) {
      newTheme.muted = nudgeTowards(newTheme.muted, newTheme.primary, nudgeBase);
    }
  }

  return newTheme;
}

/**
 * Final function that returns { light, dark } for any crazyRate=0..100.
 */
export function createThemeConfig(
  crazyRate: number,
  primaryColor?: [number, number, number] | null,
): { light: ThemePalette; dark: ThemePalette } {
  const chosenPrimary = primaryColor
    ? finalizeHSL(primaryColor[0], primaryColor[1], primaryColor[2])
    : createPrimary();

  const destructive = createDestructive();

  // Baseline
  const lightBase = buildLightTheme(chosenPrimary, destructive);
  const darkBase = buildDarkTheme(chosenPrimary, destructive);

  // Then apply "crazy" logic, for all ranges.
  const finalLight = applyCrazy(lightBase, crazyRate);
  const finalDark = applyCrazy(darkBase, crazyRate);

  return { light: finalLight, dark: finalDark };
}

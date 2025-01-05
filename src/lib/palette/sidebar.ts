import { Colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";
import { BasePalette, ThemeType, SidebarTheme } from "@/models/palette";
import { darkenHSL } from "@/lib/palette/utils";

extend([mixPlugin, a11yPlugin, harmoniesPlugin]);

/**
 * A simpler version that ensures the accent color is "visible"
 * against a background by requiring a lower contrast ratio
 * (e.g. 2.0 or 2.5) — enough to stand out visually but
 * not necessarily meeting strict text contrast guidelines.
 */
export function ensureAccentVisibility(
  accentHSL: [number, number, number],
  bgHSL: [number, number, number],
  minContrastRatio = 2.0,
  maxSteps = 10,
): [number, number, number] {
  const bgCol = toColord(bgHSL);

  // If accent is already sufficiently different, return it.
  let accentCol = toColord(accentHSL);
  if (accentCol.contrast(bgCol) >= minContrastRatio) {
    return accentHSL;
  }

  // We'll do a binary search on L in [0..100], preserving the accent's hue & saturation.
  const { h, s } = accentCol.toHsl();
  let low = 0;
  let high = 100;
  let bestCol = accentCol;
  let bestContrast = 0;

  const bgIsLight = bgCol.isLight();

  for (let i = 0; i < maxSteps; i++) {
    const mid = (low + high) / 2;
    const candidate = new Colord({ h, s, l: mid });
    const cRatio = candidate.contrast(bgCol);

    if (cRatio > bestContrast) {
      bestContrast = cRatio;
      bestCol = candidate;
    }

    // If we meet or exceed the minimal “visibility” ratio,
    // push further in the same direction to see if we can
    // still remain visible without going too extreme.
    if (cRatio >= minContrastRatio) {
      // If bg is light, that means we got enough contrast by going “darker” => keep searching downward
      if (bgIsLight) {
        high = mid;
      } else {
        low = mid;
      }
    } else {
      // Not enough contrast => we push further in the needed direction
      if (bgIsLight) {
        high = mid;
      } else {
        low = mid;
      }
    }
  }

  return fromColord(bestCol);
}

/**
 * Utility: clamp & round to 1 digit.
 */
function finalizeHSL(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
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

/**
 * Ensures `colorHSL` has a contrast ratio with `bgHSL` that is
 * between `minRatio` and `maxRatio` if possible.
 *
 * We'll do a binary search for L in [0..100], preserving H & S.
 */
function ensureModerateContrast(
  colorHSL: [number, number, number],
  bgHSL: [number, number, number],
  minRatio: number, // e.g. 4.5
  maxRatio: number, // e.g. 7.0
  maxSteps = 10,
): [number, number, number] {
  const colBg = toColord(bgHSL);

  let col = toColord(colorHSL);
  const { h, s } = col.toHsl();
  let bestColor = col;
  let bestDistance = Number.MAX_VALUE; // distance from the target [min..max]

  const initialContrast = col.contrast(colBg);
  if (initialContrast >= minRatio && initialContrast <= maxRatio) {
    return colorHSL; // already in the sweet spot
  }

  // We'll do a binary search on L in [0..100]
  let low = 0;
  let high = 100;

  for (let i = 0; i < maxSteps; i++) {
    const mid = (low + high) / 2;
    const candidate = new Colord({ h, s, l: mid });
    const cRatio = candidate.contrast(colBg);

    // Determine how far we are from [minRatio..maxRatio]
    let distance = 0;
    if (cRatio < minRatio) distance = minRatio - cRatio;
    else if (cRatio > maxRatio) distance = cRatio - maxRatio;

    // If it's better than what we had, store it
    if (distance < bestDistance) {
      bestDistance = distance;
      bestColor = candidate;
    }

    const bgIsLight = colBg.isLight();

    // If cRatio is below min, we move away from background
    // If above max, we move closer to background
    // If in [min..max], we can break or keep going. Let’s break to keep it simple.
    if (cRatio < minRatio) {
      if (bgIsLight) {
        // background is light => we need to go darker
        high = mid;
      } else {
        // background is dark => go lighter
        low = mid;
      }
    } else if (cRatio > maxRatio) {
      if (bgIsLight) {
        // too much contrast => lighten color
        low = mid;
      } else {
        // too much contrast => darken color
        high = mid;
      }
    } else {
      // cRatio is in [min..max], so we’re good
      bestDistance = 0;
      bestColor = candidate;
      break;
    }
  }

  return fromColord(bestColor);
}

export function buildSidebarTheme(
  theme: BasePalette,
  type: ThemeType,
): SidebarTheme {
  const factor = type === "dark" ? 0.048 : 0.03;

  // Slightly darken the background
  const sidebarBackground = darkenHSL(theme.background, factor);

  //
  // 1) Foreground: Ensure at least 4.5 but max 7.0 contrast
  //
  //   a) Start by darkening or lightening the original foreground:
  const fgBase = darkenHSL(theme.foreground, factor);
  //   b) Then ensure it's between 4.5..7.0 vs. the background
  const sidebarForeground = ensureModerateContrast(
    fgBase,
    sidebarBackground,
    5.2,
    7.0,
  );

  //
  // 2) Accent: visible vs. background, but not extreme
  //
  //   a) Darken accent
  const accentBase = darkenHSL(theme.accent, factor);
  //   b) Ensure 2..5 contrast vs. background => "visible but not super-high"
  const sidebarAccent = ensureModerateContrast(
    accentBase,
    sidebarBackground,
    2.0,
    5.0,
  );
  //   c) accent-foreground => standard "ensureContrast" with min=4.5
  const accentForegroundBase = theme["accent-foreground"];
  const sidebarAccentForeground = ensureContrast(
    accentForegroundBase,
    sidebarAccent,
    4.5,
  );

  //
  // 3) Primary: same approach as accent
  //
  const primaryBase = darkenHSL(theme.primary, factor);
  const sidebarPrimary = ensureModerateContrast(
    primaryBase,
    sidebarBackground,
    2.0,
    5.0,
  );
  const sidebarPrimaryForeground = ensureContrast(
    theme["primary-foreground"],
    sidebarPrimary,
    4.5,
  );

  //
  // 4) Border & ring => not text. Just darken them, or ensure a minimal contrast if you want
  //
  const sidebarBorder = darkenHSL(theme.border, factor);
  const sidebarRing = darkenHSL(theme.ring, factor);

  //
  // Finally, return:
  //
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

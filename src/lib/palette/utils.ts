import { HSL, ThemePalette } from "@/models/palette";

export interface Palettes {
  light?: ThemePalette;
  dark?: ThemePalette;
}

export function generatePalette({
  primary,
  secondary,
  accent,
  background,
  error,
  card,
  text,
  theme,
}: {
  primary: HSL;
  secondary: HSL;
  accent: HSL;
  background: HSL;
  error: HSL;
  card: HSL;
  text?: HSL;
  theme: "light" | "dark";
}): Palettes {
  function clampLightness(l: number): number {
    return Math.min(Math.max(l, 0), 100);
  }

  function adjustLightness([h, s, l]: HSL, delta: number): HSL {
    return [h, s, clampLightness(l + delta)];
  }

  const MIN_CONTRAST = 50;
  function ensureContrast(bg: HSL, fg: HSL): HSL {
    const [bh, bs, bl] = bg;
    let [fh, fs, fl] = fg;
    const diff = Math.abs(bl - fl);

    if (diff < MIN_CONTRAST) {
      if (bl > fl) {
        fl = clampLightness(bl - MIN_CONTRAST);
      } else {
        fl = clampLightness(bl + MIN_CONTRAST);
      }
    }
    return [fh, fs, fl];
  }

  // If theme is "light", input is considered tuned for light mode.
  // If theme is "dark", input is considered tuned for dark mode.

  let baseLightBackground: HSL;
  let baseDarkBackground: HSL;
  let baseForeground: HSL;

  let basePrimary: HSL;
  let baseSecondary: HSL;
  let baseAccent: HSL;
  let baseError: HSL;
  let baseCard: HSL;
  let baseText: HSL;

  if (theme === "light") {
    // Given colors are for light mode
    baseLightBackground = background;
    baseForeground = text || [
      background[0],
      background[1],
      clampLightness(background[2] - 70),
    ];

    // Derive dark mode by darkening background
    baseDarkBackground = adjustLightness(background, -60);

    basePrimary = primary;
    baseSecondary = secondary;
    baseAccent = accent;
    baseError = error;
    baseCard = card;
    baseText = baseForeground;
  } else {
    // Given colors are for dark mode
    baseDarkBackground = background;
    // Derive light mode by reversing the logic: lighten background by +60
    console.log("backgrouynd", background);
    baseLightBackground = adjustLightness(background, +60);
    baseForeground = text || [
      baseLightBackground[0],
      baseLightBackground[1],
      clampLightness(baseLightBackground[2] - 70),
    ];

    // The given primaries etc. are for dark mode
    // For the light mode version, we will invert the adjustments we made previously.
    basePrimary = primary;
    baseSecondary = secondary;
    baseAccent = accent;
    baseError = error;
    baseCard = card;
    baseText = baseForeground;
  }

  // ===== Light Mode Palette =====
  const baseLightForeground = ensureContrast(baseLightBackground, baseText);

  // Muted slightly above background in light
  const lightMuted = adjustLightness(baseLightBackground, +5);
  const lightMutedForeground = ensureContrast(lightMuted, baseLightForeground);

  const primaryLightness = basePrimary[2];
  const initialPrimaryForeground =
    primaryLightness < 50
      ? adjustLightness(basePrimary, 80)
      : adjustLightness(basePrimary, -80);
  const finalPrimaryForeground = ensureContrast(
    basePrimary,
    initialPrimaryForeground,
  );

  const lightCard = baseCard;
  const lightCardForeground = ensureContrast(
    lightCard,
    adjustLightness(baseLightBackground, -10),
  );

  const light: ThemePalette = {
    background: baseLightBackground,
    foreground: baseLightForeground,
    card: lightCard,
    "card-foreground": lightCardForeground,
    popover: ensureContrast(
      baseLightBackground,
      adjustLightness(baseLightBackground, 30),
    ),
    "popover-foreground": ensureContrast(
      adjustLightness(baseLightBackground, 30),
      adjustLightness(baseLightBackground, -40),
    ),

    primary: basePrimary,
    "primary-foreground": finalPrimaryForeground,

    secondary: baseSecondary,
    "secondary-foreground": ensureContrast(
      baseSecondary,
      adjustLightness(baseSecondary, -60),
    ),

    muted: lightMuted,
    "muted-foreground": ensureContrast(lightMutedForeground, lightCard),

    accent: baseAccent,
    "accent-foreground": ensureContrast(
      baseAccent,
      adjustLightness(baseAccent, -60),
    ),

    destructive: baseError,
    "destructive-foreground": ensureContrast(
      baseError,
      adjustLightness(baseError, +60),
    ),

    border: baseLightBackground,
    input: adjustLightness(baseLightBackground, 5),
    ring: adjustLightness(basePrimary, -10),

    radius: "0.5rem",

    "chart-1": basePrimary,
    "chart-2": baseSecondary,
    "chart-3": baseAccent,
    "chart-4": adjustLightness(baseAccent, 10),
    "chart-5": adjustLightness(basePrimary, 10),
  };

  // ===== Dark Mode Palette =====
  const darkForeground = ensureContrast(
    baseDarkBackground,
    adjustLightness(text || baseDarkBackground, +70),
  );

  // Dark mode: card +20 lightness from darkBackground
  const darkCard = adjustLightness(baseDarkBackground, 20);
  const darkCardForeground = ensureContrast(darkCard, darkForeground);

  // muted in dark mode: +10 lightness from darkBackground
  const darkMuted = adjustLightness(baseDarkBackground, 10);
  const darkMutedForeground = ensureContrast(darkMuted, darkForeground);

  // Adjust primary for dark mode
  // If starting from light theme: dark mode = basePrimary -30
  // If starting from dark theme: we already have dark mode colors as basePrimary
  const darkPrimary =
    theme === "light" ? adjustLightness(basePrimary, -30) : basePrimary;

  const darkPrimaryLightness = darkPrimary[2];
  const initialDarkPrimaryForeground =
    darkPrimaryLightness < 50
      ? adjustLightness(darkPrimary, 80)
      : adjustLightness(darkPrimary, -80);
  const finalDarkPrimaryForeground = ensureContrast(
    darkPrimary,
    initialDarkPrimaryForeground,
  );

  // For secondary, accent, error in dark mode, we do the same logic:
  const darkSecondary =
    theme === "light" ? adjustLightness(baseSecondary, -30) : baseSecondary;
  const darkAccent =
    theme === "light" ? adjustLightness(baseAccent, -20) : baseAccent;
  const darkError =
    theme === "light" ? adjustLightness(baseError, -20) : baseError;

  const dark: ThemePalette = {
    background: baseDarkBackground,
    foreground: darkForeground,
    card: darkCard,
    "card-foreground": darkCardForeground,
    popover: ensureContrast(
      baseDarkBackground,
      adjustLightness(baseDarkBackground, -80),
    ),
    "popover-foreground": ensureContrast(
      adjustLightness(baseDarkBackground, -80),
      adjustLightness(baseDarkBackground, +60),
    ),

    primary: darkPrimary,
    "primary-foreground": finalDarkPrimaryForeground,

    secondary: ensureContrast(baseDarkBackground, darkSecondary),
    "secondary-foreground": ensureContrast(
      darkSecondary,
      adjustLightness(darkSecondary, +60),
    ),

    muted: darkMuted,
    "muted-foreground": ensureContrast(darkMutedForeground, darkCard),

    accent: ensureContrast(baseDarkBackground, darkAccent),
    "accent-foreground": ensureContrast(
      darkAccent,
      adjustLightness(darkAccent, +60),
    ),

    destructive: ensureContrast(baseDarkBackground, darkError),
    "destructive-foreground": ensureContrast(
      darkError,
      adjustLightness(darkError, +60),
    ),

    border: ensureContrast(
      baseDarkBackground,
      adjustLightness(baseDarkBackground, -20),
    ),
    input: ensureContrast(
      baseDarkBackground,
      adjustLightness(baseDarkBackground, +20),
    ),
    ring: ensureContrast(baseDarkBackground, adjustLightness(darkPrimary, +20)),

    radius: "0.5rem",

    "chart-1": ensureContrast(
      baseDarkBackground,
      adjustLightness(darkPrimary, -20),
    ),
    "chart-2": ensureContrast(
      baseDarkBackground,
      adjustLightness(darkSecondary, -20),
    ),
    "chart-3": ensureContrast(
      baseDarkBackground,
      adjustLightness(darkAccent, -20),
    ),
    "chart-4": ensureContrast(
      baseDarkBackground,
      adjustLightness(darkAccent, -10),
    ),
    "chart-5": ensureContrast(
      baseDarkBackground,
      adjustLightness(darkPrimary, -10),
    ),
  };

  return { light, dark };
}

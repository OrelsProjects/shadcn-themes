import { Colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import harmoniesPlugin from "colord/plugins/harmonies";

import { HSL, ThemePalette } from "@/models/palette";

extend([a11yPlugin, harmoniesPlugin]);

type HSLJson = {
  h: number;
  s: number;
  l: number;
};

export interface Palettes {
  light?: ThemePalette;
  dark?: ThemePalette;
}

const faker = {
  number: {
    int: (options: { min: number; max: number }) => {
      return (
        Math.floor(Math.random() * (options.max - options.min + 1)) +
        options.min
      );
    },
    float: (options: { min: number; max: number }) => {
      return Math.random() * (options.max - options.min) + options.min;
    },
  },
  datatype: {
    boolean: () => {
      return Math.random() < 0.5;
    },
  },
  helpers: {
    arrayElement: <T extends readonly unknown[] | Array<unknown>>(
      arr: T,
    ): T[number] => {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  },
};

// Our available modes
const modes = ["complementary", "triadic", "analogous", "slick"] as const;

const createPrimaryColor = (): HSLJson => {
  return {
    h: faker.number.int({ min: 0, max: 360 }),
    s: faker.number.int({ min: 0, max: 100 }),
    l: faker.number.int({ min: 10, max: 90 }),
  };
};

const createForegroundDark = (hue: number): HSLJson => {
  return {
    h: hue,
    s: faker.number.int({ min: 10, max: 40 }),
    l: faker.number.int({ min: 97, max: 100 }),
  };
};

export const createDestructive = () => {
  return new Colord({
    h: faker.number.int({ min: 0, max: 22 }),
    s: faker.number.int({ min: 80, max: 100 }),
    l: faker.number.int({ min: 20, max: 45 }),
  });
};

const createContrast = (color: Colord) => {
  const isLight = color.isLight();
  let opposite = color;

  let i = 0;
  while (opposite.contrast(color) < 6) {
    opposite = isLight ? opposite.darken(0.2) : opposite.lighten(0.2);
    if (i++ > 10) break;
  }
  return opposite;
};

const createBackgroundLight = (hue: number): HSLJson => {
  return {
    h: hue,
    s: faker.number.int({ min: 30, max: 70 }),
    l: faker.number.int({ min: 98, max: 100 }),
  };
};

const createBackgroundDark = (hue: number): HSLJson => {
  return {
    h: hue,
    s: faker.number.int({ min: 30, max: 60 }),
    l: faker.number.int({ min: 0, max: 4 }),
  };
};

const createForegroundLight = (hue: number): HSLJson => {
  return {
    h: hue,
    s: faker.number.int({ min: 50, max: 80 }),
    l: faker.number.int({ min: 0, max: 5 }),
  };
};

const createColorHarmony = (
  primary: Colord,
  mode: (typeof modes)[number],
  shouldMatch: boolean,
  isDark?: boolean,
) => {
  if (mode === "triadic") {
    const [, secondary, accent] = primary.harmonies(mode);
    if (!secondary || !accent) throw new Error("Failed to create harmony");
    return { secondary, accent };
  }

  if (mode === "complementary") {
    const [, secondary] = primary.harmonies(mode);
    if (!secondary) throw new Error("Failed to create harmony");
    return { secondary, accent: secondary };
  }

  if (mode === "analogous") {
    const [secondary, , accent] = primary.harmonies(mode);
    if (!secondary || !accent) throw new Error("Failed to create harmony");
    return { secondary, accent };
  }

  // "slick" is your custom approach.
  if (mode === "slick") {
    if (isDark) {
      const baseSaturation = faker.number.int({ min: 0, max: 20 });
      const baseLightness = faker.number.int({ min: 8, max: 20 });

      const clr = new Colord({
        h: primary.hue(),
        s: baseSaturation,
        l: baseLightness,
      });

      return {
        secondary: clr,
        accent: shouldMatch
          ? clr
          : clr
              .saturate(faker.number.float({ min: 0.05, max: 0.1 }))
              .lighten(faker.number.float({ min: 0.05, max: 0.1 })),
      };
    }

    const baseSaturation = faker.number.int({ min: 0, max: 20 });
    const baseLightness = faker.number.int({ min: 80, max: 92 });

    const clr = new Colord({
      h: primary.hue(),
      s: baseSaturation,
      l: baseLightness,
    });

    return {
      secondary: clr,
      accent: shouldMatch
        ? clr
        : clr
            .darken(faker.number.float({ min: 0.05, max: 0.1 }))
            .saturate(faker.number.float({ min: 0.05, max: 0.1 })),
    };
  }

  throw new Error("Invalid mode");
};

const colordToHsl = (color: Colord): HSLJson => {
  const hsla = color.toHsl();
  return { h: hsla.h, s: hsla.s, l: hsla.l };
};

export const createThemeConfig = (
  primaryColor?: [number, number, number] | null,
): { light: ThemePalette; dark: ThemePalette } => {
  const primaryJson = primaryColor
    ? { h: primaryColor[0], s: primaryColor[1], l: primaryColor[2] }
    : undefined;

  const primaryBase = new Colord(primaryJson || createPrimaryColor());

  // 10% chance to go "not basic"
  const isNotBasic = Math.random() < 0.2;

  // Base backgrounds
  let backgroundLight = createBackgroundLight(primaryBase.hue());
  let backgroundDark = createBackgroundDark(primaryBase.hue());

  // If "not basic", unify the background color with the primary hue
  // (So if primary is bluish, backgrounds also go bluish, etc.)
  if (isNotBasic) {
    const baseHue = primaryBase.hue();
    // Light background
    backgroundLight = {
      h: baseHue,
      s: faker.number.int({ min: 40, max: 80 }),
      l: faker.number.int({ min: 75, max: 98 }),
    };
    // Dark background
    backgroundDark = {
      h: baseHue,
      s: faker.number.int({ min: 20, max: 40 }),
      l: faker.number.int({ min: 2, max: 8 }),
    };
  }

  // Keep the same primary for both light & dark
  const primaryLightColord = primaryBase;
  const primaryDarkColord = primaryBase;

  const primaryLight = colordToHsl(primaryLightColord);
  const primaryDark = colordToHsl(primaryDarkColord);

  const primaryLightForeground = colordToHsl(createContrast(primaryLightColord));
  const primaryDarkForeground = colordToHsl(createContrast(primaryDarkColord));

  // Foreground
  let foregroundLight = createForegroundLight(primaryBase.hue());
  let foregroundDark = createForegroundDark(primaryBase.hue());

  if (isNotBasic) {
    // Possibly unify these a bit if you want them "super matched"
    foregroundLight = {
      h: backgroundLight.h,
      s: faker.number.int({ min: 30, max: 60 }),
      l: faker.number.int({ min: 0, max: 10 }),
    };
    foregroundDark = {
      h: backgroundDark.h,
      s: faker.number.int({ min: 10, max: 30 }),
      l: faker.number.int({ min: 90, max: 100 }),
    };
  }

  // Card colors
  const cardBoolean = faker.datatype.boolean();
  let cardLight = cardBoolean
    ? colordToHsl(new Colord(backgroundLight).darken(0.01))
    : backgroundLight;
  let cardDark = cardBoolean
    ? colordToHsl(new Colord(backgroundDark).lighten(0.01))
    : backgroundDark;

  if (isNotBasic) {
    // Maybe push these closer to background too
    const cLight = new Colord(backgroundLight);
    const cLightHSL = cLight.toHsl();
    cLightHSL.l = Math.max(0, cLightHSL.l - 1); // slightly darker than BG
    cardLight = colordToHsl(new Colord(cLightHSL));

    const cDark = new Colord(backgroundDark);
    const cDarkHSL = cDark.toHsl();
    cDarkHSL.l = Math.min(100, cDarkHSL.l + 1); // slightly lighter than BG
    cardDark = colordToHsl(new Colord(cDarkHSL));
  }

  // Card foreground
  const cardLightForeground = cardBoolean
    ? colordToHsl(new Colord(foregroundLight).darken(0.01))
    : foregroundLight;
  const cardDarkForeground = cardBoolean
    ? colordToHsl(new Colord(foregroundDark).lighten(0.01))
    : foregroundDark;

  // Popover colors
  const popoverBoolean = faker.datatype.boolean();
  const popoverLight = popoverBoolean ? cardLight : backgroundLight;
  const popoverDark = popoverBoolean ? cardDark : backgroundDark;
  const popoverLightForeground = popoverBoolean
    ? cardLightForeground
    : foregroundLight;
  const popoverDarkForeground = popoverBoolean
    ? cardDarkForeground
    : foregroundDark;

  // Harmonies
  const harmonyMode = faker.helpers.arrayElement(modes);
  const shouldMatch = faker.datatype.boolean();

  const lightHarmonies = createColorHarmony(
    primaryLightColord,
    harmonyMode,
    shouldMatch,
    false,
  );
  const darkHarmonies = createColorHarmony(
    primaryDarkColord,
    harmonyMode,
    shouldMatch,
    true,
  );

  // Secondary
  const secondaryLight = colordToHsl(lightHarmonies.secondary);
  const secondaryLightForeground = colordToHsl(
    createContrast(lightHarmonies.secondary),
  );
  const secondaryDark = colordToHsl(darkHarmonies.secondary);
  const secondaryDarkForeground = colordToHsl(
    createContrast(darkHarmonies.secondary),
  );

  // Accent (initial, based on harmony)
  let accentLightColord = lightHarmonies.accent;
  let accentDarkColord = darkHarmonies.accent;

  // For light: make accent a bit darker than the card
  // For dark: make accent a bit lighter than the card
  const cLight = new Colord(cardLight);
  const aLight = accentLightColord;
  const cDark = new Colord(cardDark);
  const aDark = accentDarkColord;

  const cLightHSL = cLight.toHsl();
  const aLightHSL = aLight.toHsl();
  // Increase offset for “a bit darker” in light
  const offsetLight = 3; 
  aLightHSL.l = Math.max(0, cLightHSL.l - offsetLight);
  accentLightColord = new Colord(aLightHSL);

  const cDarkHSL = cDark.toHsl();
  const aDarkHSL = aDark.toHsl();
  // Increase offset for “a bit brighter” in dark
  const offsetDark = 3;
  aDarkHSL.l = Math.min(100, cDarkHSL.l + offsetDark);
  accentDarkColord = new Colord(aDarkHSL);

  // Recompute accent foregrounds
  const accentLightForegroundColord = createContrast(accentLightColord);
  const accentDarkForegroundColord = createContrast(accentDarkColord);

  const accentLight = colordToHsl(accentLightColord);
  const accentLightForeground = colordToHsl(accentLightForegroundColord);
  const accentDark = colordToHsl(accentDarkColord);
  const accentDarkForeground = colordToHsl(accentDarkForegroundColord);

  // Destructive
  const destructiveBase = createDestructive();
  const destructiveLight = colordToHsl(destructiveBase);
  const destructiveDark = {
    h: destructiveLight.h,
    s: destructiveLight.s,
    l: faker.number.int({ min: 45, max: 60 }),
  };

  const destructiveLightForeground = colordToHsl(
    createContrast(destructiveBase),
  );
  const destructiveDarkForeground = colordToHsl(
    createContrast(new Colord(destructiveDark)),
  );

  // Muted
  const mutedBaseDeviations = {
    s: faker.number.int({ min: 5, max: 40 }),
    l: faker.number.int({ min: 0, max: 10 }),
  };

  const mutedLight = {
    h: secondaryLight.h,
    s: mutedBaseDeviations.s,
    l: 85 + mutedBaseDeviations.l,
  };
  const mutedDark = {
    h: secondaryDark.h,
    s: mutedBaseDeviations.s,
    l: 15 - mutedBaseDeviations.l,
  };

  // Muted foreground
  const mutedForegroundBaseDeviations = {
    s: faker.number.int({ min: 0, max: 15 }),
    l: faker.number.int({ min: 0, max: 15 }),
  };

  const mutedForegroundLight = {
    h: mutedLight.h,
    s: mutedForegroundBaseDeviations.s,
    l: 25 + mutedForegroundBaseDeviations.l,
  };
  const mutedForegroundDark = {
    h: mutedDark.h,
    s: mutedForegroundBaseDeviations.s,
    l: 75 - mutedForegroundBaseDeviations.l,
  };

  // Borders / Inputs
  const inputBaseDeviations = {
    s: faker.number.int({ min: 2, max: 15 }),
    l: faker.number.int({ min: 5, max: 10 }),
  };

  const borderLight = {
    h: backgroundLight.h,
    s: inputBaseDeviations.s,
    l: backgroundLight.l - inputBaseDeviations.l,
  };
  const borderDark = {
    h: backgroundDark.h,
    s: inputBaseDeviations.s,
    l: faker.number.int({ min: 10, max: 15 }),
  };

  // Chart
  const buildChartTheme = (theme: {
    secondary: HSLJson;
    primary: HSLJson;
    accent: HSLJson;
  }) => {
    const chart4 = {
      h: theme.secondary.h,
      s: theme.secondary.s,
      l: 3 + theme.secondary.l,
    };

    const chart5 = {
      h: theme.primary.h,
      s: 3 + theme.primary.s,
      l: theme.primary.l,
    };

    return {
      "chart-1": theme.primary,
      "chart-2": theme.secondary,
      "chart-3": theme.accent,
      "chart-4": chart4,
      "chart-5": chart5,
    };
  };

  const chartLight = buildChartTheme({
    secondary: secondaryLight,
    primary: primaryLight,
    accent: accentLight,
  });

  const chartDark = buildChartTheme({
    secondary: secondaryDark,
    primary: primaryDark,
    accent: accentDark,
  });

  // Convert to final HSL arrays
  const convertToHSLArray = (hsl: HSLJson): HSL => [hsl.h, hsl.s, hsl.l];

  return {
    light: {
      background: convertToHSLArray(backgroundLight),
      foreground: convertToHSLArray(foregroundLight),
      card: convertToHSLArray(cardLight),
      "card-foreground": convertToHSLArray(cardLightForeground),
      popover: convertToHSLArray(popoverLight),
      "popover-foreground": convertToHSLArray(popoverLightForeground),
      primary: convertToHSLArray(primaryLight),
      "primary-foreground": convertToHSLArray(primaryLightForeground),
      secondary: convertToHSLArray(secondaryLight),
      "secondary-foreground": convertToHSLArray(secondaryLightForeground),
      accent: convertToHSLArray(accentLight),
      "accent-foreground": convertToHSLArray(accentLightForeground),
      muted: convertToHSLArray(mutedLight),
      "muted-foreground": convertToHSLArray(mutedForegroundLight),
      destructive: convertToHSLArray(destructiveLight),
      "destructive-foreground": convertToHSLArray(destructiveLightForeground),
      border: convertToHSLArray(borderLight),
      input: convertToHSLArray(borderLight),
      ring: convertToHSLArray(primaryLight),
      radius: "4px",
      "chart-1": convertToHSLArray(chartLight["chart-1"]),
      "chart-2": convertToHSLArray(chartLight["chart-2"]),
      "chart-3": convertToHSLArray(chartLight["chart-3"]),
      "chart-4": convertToHSLArray(chartLight["chart-4"]),
      "chart-5": convertToHSLArray(chartLight["chart-5"]),
    },
    dark: {
      background: convertToHSLArray(backgroundDark),
      foreground: convertToHSLArray(foregroundDark),
      card: convertToHSLArray(cardDark),
      "card-foreground": convertToHSLArray(cardDarkForeground),
      popover: convertToHSLArray(popoverDark),
      "popover-foreground": convertToHSLArray(popoverDarkForeground),
      primary: convertToHSLArray(primaryDark),
      "primary-foreground": convertToHSLArray(primaryDarkForeground),
      secondary: convertToHSLArray(secondaryDark),
      "secondary-foreground": convertToHSLArray(secondaryDarkForeground),
      accent: convertToHSLArray(accentDark),
      "accent-foreground": convertToHSLArray(accentDarkForeground),
      muted: convertToHSLArray(mutedDark),
      "muted-foreground": convertToHSLArray(mutedForegroundDark),
      destructive: convertToHSLArray(destructiveDark),
      "destructive-foreground": convertToHSLArray(destructiveDarkForeground),
      border: convertToHSLArray(borderDark),
      input: convertToHSLArray(borderDark),
      ring: convertToHSLArray(primaryDark),
      radius: "4px",
      "chart-1": convertToHSLArray(chartDark["chart-1"]),
      "chart-2": convertToHSLArray(chartDark["chart-2"]),
      "chart-3": convertToHSLArray(chartDark["chart-3"]),
      "chart-4": convertToHSLArray(chartDark["chart-4"]),
      "chart-5": convertToHSLArray(chartDark["chart-5"]),
    },
  };
};

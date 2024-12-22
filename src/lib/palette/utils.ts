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

const createForegroundDark = (hue: number): HSLJson => {
  return {
    h: hue,
    s: faker.number.int({
      min: 10,
      max: 40,
    }),
    l: faker.number.int({
      min: 97,
      max: 100,
    }),
  };
};

export const createDestructive = () => {
  return new Colord({
    h: faker.number.int({
      min: 0,
      max: 22,
    }),
    s: faker.number.int({
      min: 80,
      max: 100,
    }),
    l: faker.number.int({
      min: 20,
      max: 45,
    }),
  });
};

const modes = ["complementary", "triadic", "analogous", "slick"] as const;

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

const createPrimaryColor = (): HSLJson => {
  return {
    h: faker.number.int({ min: 0, max: 360 }),
    s: faker.number.int({ min: 0, max: 100 }),
    l: faker.number.int({ min: 10, max: 90 }),
  };
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
    s: faker.number.int({
      min: 50,
      max: 80,
    }),
    l: faker.number.int({
      min: 0,
      max: 5,
    }),
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

    return {
      secondary,
      accent,
    };
  }

  if (mode === "complementary") {
    const [, secondary] = primary.harmonies(mode);
    if (!secondary) throw new Error("Failed to create harmony");

    return {
      secondary,
      accent: secondary,
    };
  }

  if (mode === "analogous") {
    const [secondary, , accent] = primary.harmonies(mode);
    if (!secondary || !accent) throw new Error("Failed to create harmony");

    return {
      secondary,
      accent,
    };
  }

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

  return {
    h: hsla.h,
    s: hsla.s,
    l: hsla.l,
  };
};

export const generateRandomPalette = (
  primaryColor?: HSL | null,
): { light: ThemePalette; dark: ThemePalette } => {
  const primaryJson = primaryColor
    ? {
        h: primaryColor[0],
        s: primaryColor[1],
        l: primaryColor[2],
      }
    : undefined;
  const primaryBase = new Colord(primaryJson || createPrimaryColor());

  const primaryLightColord = primaryBase;
  const primaryDarkColord = primaryBase;

  const primaryLight = colordToHsl(primaryLightColord);
  const primaryDark = colordToHsl(primaryDarkColord);
  const primaryLightForeground = colordToHsl(
    createContrast(primaryLightColord),
  );
  const primaryDarkForeground = colordToHsl(createContrast(primaryDarkColord));

  const backgroundDark = createBackgroundDark(primaryBase.hue());
  const backgroundLight = createBackgroundLight(primaryBase.hue());

  const foregroundDark = createForegroundDark(primaryBase.hue());
  const foregroundLight = createForegroundLight(primaryBase.hue());

  const cardBoolean = faker.datatype.boolean();

  const cardLight = cardBoolean
    ? colordToHsl(new Colord(backgroundLight).darken(0.01))
    : backgroundLight;
  const cardDark = cardBoolean
    ? colordToHsl(new Colord(backgroundDark).lighten(0.01))
    : backgroundDark;

  const cardLightForeground = cardBoolean
    ? colordToHsl(new Colord(foregroundLight).darken(0.01))
    : foregroundLight;

  const cardDarkForeground = cardBoolean
    ? colordToHsl(new Colord(foregroundDark).lighten(0.01))
    : foregroundDark;

  const popoverBoolean = faker.datatype.boolean();

  const popoverLight = popoverBoolean ? cardLight : backgroundLight;
  const popoverDark = popoverBoolean ? cardDark : backgroundDark;

  const popoverLightForeground = popoverBoolean
    ? cardLightForeground
    : foregroundLight;

  const popoverDarkForeground = popoverBoolean
    ? cardDarkForeground
    : foregroundDark;

  const harmonyMode = faker.helpers.arrayElement(modes);

  const shouldMatch = faker.datatype.boolean();

  const lightHarmonies = createColorHarmony(
    primaryLightColord,
    harmonyMode,
    shouldMatch,
    false,
  );

  const secondaryLight = colordToHsl(lightHarmonies.secondary);
  const secondaryLightForeground = colordToHsl(
    createContrast(lightHarmonies.secondary),
  );

  const accentLight = colordToHsl(lightHarmonies.accent);
  const accentLightForeground = colordToHsl(
    createContrast(lightHarmonies.accent),
  );

  const darkHarmonies = createColorHarmony(
    primaryDarkColord,
    harmonyMode,
    shouldMatch,
    true,
  );

  const secondaryDark = colordToHsl(darkHarmonies.secondary);
  const secondaryDarkForeground = colordToHsl(
    createContrast(darkHarmonies.secondary),
  );

  const accentDark = colordToHsl(darkHarmonies.accent);
  const accentDarkForeground = colordToHsl(
    createContrast(darkHarmonies.accent),
  );

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
      muted: convertToHSLArray(mutedLight),
      "muted-foreground": convertToHSLArray(mutedForegroundLight),
      accent: convertToHSLArray(accentLight),
      "accent-foreground": convertToHSLArray(accentLightForeground),
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
      muted: convertToHSLArray(mutedDark),
      "muted-foreground": convertToHSLArray(mutedForegroundDark),
      accent: convertToHSLArray(accentDark),
      "accent-foreground": convertToHSLArray(accentDarkForeground),
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

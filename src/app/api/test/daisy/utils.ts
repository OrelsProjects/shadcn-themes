type DaisyUITheme = { [key: string]: string }; // Single theme object
type HSL = { h: number; s: number; l: number; };

type ShadCNConfig = {
  name: string;
  config: {
    light?: {
      background: HSL;
      foreground: HSL;
      card: HSL;
      cardForeground: HSL;
      popover: HSL;
      popoverForeground: HSL;
      primary: HSL;
      primaryForeground: HSL;
      secondary: HSL;
      secondaryForeground: HSL;
      muted: HSL;
      mutedForeground: HSL;
      accent: HSL;
      accentForeground: HSL;
      destructive: HSL;
      destructiveForeground: HSL;
      border: HSL;
      input: HSL;
      ring: HSL;
    };
    dark?: {
      background: HSL;
      foreground: HSL;
      card: HSL;
      cardForeground: HSL;
      popover: HSL;
      popoverForeground: HSL;
      primary: HSL;
      primaryForeground: HSL;
      secondary: HSL;
      secondaryForeground: HSL;
      muted: HSL;
      mutedForeground: HSL;
      accent: HSL;
      accentForeground: HSL;
      destructive: HSL;
      destructiveForeground: HSL;
      border: HSL;
      input: HSL;
      ring: HSL;
    };
  };
};

function parseDaisyHSL(value: string): HSL {
  const trimmed = value.trim();
  if (trimmed === "0% 0 0") {
    return { h: 0, s: 0, l: 0 };
  }

  const parts = trimmed.split(" ").map((p) => p.trim());
  if (parts.length !== 3) {
    return { h: 0, s: 0, l: 0 };
  }

  const [hPart, sPart, lPart] = parts;
  const huePercent = parseFloat(hPart.replace("%", ""));
  const satFraction = parseFloat(sPart);
  const lightness = parseFloat(lPart);

  const h = huePercent * 3.6;
  const s = satFraction * 100;
  const l = lightness;
  return { h, s, l };
}

interface Mapping {
  background: string;           
  foreground: string;          
  card: string;                
  cardForeground: string;      
  popover: string;             
  popoverForeground: string;   
  primary: string;             
  primaryForeground: string;   
  secondary: string;           
  secondaryForeground: string; 
  muted: string;               
  mutedForeground: string;     
  accent: string;              
  accentForeground: string;    
  destructive: string;         
  destructiveForeground: string;
  border: string;              
  input: string;               
  ring: string;                
}

const variableMapping: Mapping = {
  background: "b1",
  foreground: "n",
  card: "b2",
  cardForeground: "n",
  popover: "b3",
  popoverForeground: "n",
  primary: "p",
  primaryForeground: "pc",
  secondary: "s",
  secondaryForeground: "sc",
  muted: "b3",
  mutedForeground: "n",
  accent: "a",
  accentForeground: "ac",
  destructive: "er",
  destructiveForeground: "erc",
  border: "b3",
  input: "b3",
  ring: "p",
};

function convertDaisyToShadCN(name: string, theme: DaisyUITheme): ShadCNConfig {
  const scheme = theme["color-scheme"];
  const mode = scheme === "light" ? "light" : "dark";

  const resultMode: Record<string, HSL> = {};
  for (const [shadKey, daisyKey] of Object.entries(variableMapping)) {
    const val = theme[daisyKey];
    if (val) {
      resultMode[shadKey] = parseDaisyHSL(val);
    } else {
      resultMode[shadKey] = { h: 0, s: 0, l: 0 };
    }
  }

  const config: ShadCNConfig = {
    name,
    config: {
      [mode]: {
        background: resultMode.background,
        foreground: resultMode.foreground,
        card: resultMode.card,
        cardForeground: resultMode.cardForeground,
        popover: resultMode.popover,
        popoverForeground: resultMode.popoverForeground,
        primary: resultMode.primary,
        primaryForeground: resultMode.primaryForeground,
        secondary: resultMode.secondary,
        secondaryForeground: resultMode.secondaryForeground,
        muted: resultMode.muted,
        mutedForeground: resultMode.mutedForeground,
        accent: resultMode.accent,
        accentForeground: resultMode.accentForeground,
        destructive: resultMode.destructive,
        destructiveForeground: resultMode.destructiveForeground,
        border: resultMode.border,
        input: resultMode.input,
        ring: resultMode.ring,
      }
    }
  };

  return config;
}

/**
 * Convert multiple DaisyUI themes at once.
 * Input: { [themeName: string]: DaisyUITheme }
 * Output: { [themeName: string]: ShadCNConfig }
 */
export function convertAllDaisyThemes(themes: { [key: string]: DaisyUITheme }): { [key: string]: ShadCNConfig } {
  const result: { [key: string]: ShadCNConfig } = {};
  for (const [name, theme] of Object.entries(themes)) {
    result[name] = convertDaisyToShadCN(name, theme);
  }
  return result;
}
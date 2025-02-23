import convert from "color-convert";

export type ColorSpace = "rgb" | "hsl" | "hex" | "oklch";
export type RGB = [number, number, number];
export type HSL = [number, number, number];
export type LCH = [number, number, number];
export type OKLCH = [number, number, number];
export type HEX = string;

export function parseColor(
  input: string,
  format: ColorSpace,
): { space: ColorSpace; values: RGB | HSL | OKLCH | [number] } | null {
  // Remove all whitespace and convert to lowercase
  let cleanInput = input.toLowerCase();

  // Split by common separators (space, comma)
  const values = cleanInput.split(/[\s,]+/).map(Number);

  switch (format) {
    case "hex":
      // Remove # if present and validate hex format
      const hex = cleanInput.startsWith("#") ? cleanInput.slice(1) : cleanInput;
      if (hex.match(/^[0-9a-f]{3}|[0-9a-f]{6}$/)) {
        return { space: "hex", values: [parseInt(hex, 16)] as [number] };
      }
      break;

    case "rgb":
      // Check for rgb(r,g,b) format or three numbers
      const rgbMatch = cleanInput.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
      if (rgbMatch) {
        const rgb = rgbMatch.slice(1).map(Number) as RGB;
        if (rgb.every(v => v >= 0 && v <= 255)) {
          return { space: "rgb", values: rgb };
        }
      } else if (values.length === 3 && values.every(v => v >= 0 && v <= 255)) {
        return { space: "rgb", values: values as RGB };
      }
      break;

    case "hsl":
      // Check for hsl(h,s%,l%) format with optional spaces
      const hslMatch = cleanInput.match(/^hsl\((\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\)$/);
      const hslMatchComma = cleanInput.match(/^(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?$/);
      const hslMatchSpace = cleanInput.match(/^(\d+)\s+(\d+)%?\s+(\d+)%?$/);
      const hslMatchNoSpaceNoComma = cleanInput.match(/^(\d+)(\d+)%?(\d+)%?$/);
      
      let match = hslMatch || hslMatchComma || hslMatchSpace || hslMatchNoSpaceNoComma;
      if (hslMatchNoSpaceNoComma) {
        // Don't remove spaces
        cleanInput = input;
        // Make it be ["the whole hsl", "h", "s", "l"]
        match = cleanInput.match(/^(\d+)\s+(\d+)%?\s+(\d+)%?$/); // this one will be the one that works
      }
      if (match) {
        const hsl = hslMatch
          ? (match.slice(1).map(Number) as HSL)
          : hslMatchNoSpaceNoComma
            ? (match.slice(1).map(Number) as HSL)
            : hslMatchComma
              ? (match.slice(1).map(Number) as HSL)
              : hslMatchSpace
                ? (match.slice(1).map(Number) as HSL)
                : [];
        // clamp h to 0-360, s to 0-100, l to 0-100
        hsl[0] = Math.min(Math.max(hsl[0], 0), 360);
        hsl[1] = Math.min(Math.max(hsl[1], 0), 100);
        hsl[2] = Math.min(Math.max(hsl[2], 0), 100);
        return { space: "hsl", values: hsl as HSL };
      }
      break;

    case "oklch":
      debugger;
      // Check for oklch(l%,c,h) format or three numbers with optional % and spaces
      const fullOklchMatch = cleanInput.match(
        /^oklch\(([\d.]+)%?\s*([\d.]+)\s*([\d.]+)\)$/,
      );
      // Match three space/comma separated numbers with optional %
      const oklchMatchSimple = cleanInput.match(
        /^([\d.]+)%?\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)$/,
      );

      const oklchMatch = fullOklchMatch || oklchMatchSimple;
      if (oklchMatch) {
        const oklch = oklchMatch.slice(1).map(Number) as OKLCH;
        if (
          oklch[0] >= 0 &&
          oklch[0] <= 100 &&
          oklch[1] >= 0 &&
          oklch[1] <= 0.4 &&
          oklch[2] >= 0 &&
          oklch[2] <= 360
        ) {
          return { space: "oklch", values: oklch };
        }
      } else if (
        values.length === 3 &&
        values[0] >= 0 &&
        values[0] <= 100 &&
        values[1] >= 0 &&
        values[1] <= 0.4 &&
        values[2] >= 0 &&
        values[2] <= 360
      ) {
        return { space: "oklch", values: values as OKLCH };
      }
      break;
  }

  return null;
}

export function convertColor(color: { space: ColorSpace; values: number[] }): {
  rgb: string;
  hsl: string;
  hex: string;
  oklch: string;
} {
  let rgb: RGB, hsl: HSL, hex: HEX, oklch: LCH;

  switch (color.space) {
    case "rgb":
      rgb = color.values as RGB;
      hsl = convert.rgb.hsl(rgb) as HSL;
      hex = convert.rgb.hex(rgb);
      oklch = convert.rgb.lch(rgb) as LCH;
      break;
    case "hsl":
      hsl = color.values as HSL;
      rgb = convert.hsl.rgb(hsl) as RGB;
      hex = convert.hsl.hex(hsl);
      oklch = convert.hsl.lch(hsl) as LCH; // this function finally results with oklch values
      break;
    case "hex":
      hex = color.values[0].toString(16).padStart(6, "0");
      rgb = convert.hex.rgb(hex) as RGB;
      hsl = convert.hex.hsl(hex) as HSL;
      oklch = convert.hex.lch(hex) as LCH;
      break;
    case "oklch":
      oklch = color.values as LCH;
      if (oklch[1] < 1) {
        oklch[1] = oklch[1] * 100;
      }
      rgb = convert.lch.rgb(oklch) as RGB;
      hsl = convert.lch.hsl(oklch) as HSL;
      hex = convert.lch.hex(oklch);
      break;
  }

  return {
    rgb: `rgb(${rgb.join(", ")})`,
    hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
    hex: `#${hex}`,
    oklch: `oklch(${oklch[0]}% ${oklch[1]} ${oklch[2]})`,
  };
}

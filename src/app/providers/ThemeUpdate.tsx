"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";
import { getThemeColor } from "@/lib/utils";
import { ThemePalette } from "@/models/palette";

const ThemeUpdate = () => {
  const { selectedPalette, allPalettes, selectedThemeType } = useAppSelector(
    state => state.palette,
  );

  useEffect(() => {
    const root = document.documentElement;
    const colors: ThemePalette | undefined =
      selectedPalette?.colors[selectedThemeType];

    if (!colors) return;

    Object.entries(colors).forEach(([key, value]) => {
      // if value is string -> Take it as is. otherwise, `${value[0]} ${value[1]} ${value[2]}`;
      const hslString =
        value instanceof Array
          ? getThemeColor(key as keyof ThemePalette, colors)
          : value;
      // split by -, add -demo after the first part, then join by -
      const keyParts = key.split("-");
      let demoKey = [keyParts[0], "demo", ...keyParts.slice(1)].join("-");
      if (key.includes("chart")) {
        demoKey = key + "-demo";
      }
      root.style.setProperty(`--${demoKey}`, hslString);
    });
  }, [selectedPalette, allPalettes, selectedThemeType]);

  return null;
};

export default ThemeUpdate;

"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { getThemeColor } from "@/lib/utils";

const ThemeUpdate = () => {
  const { selectedPalette, allPalettes } = useAppSelector(
    state => state.palette,
  );

  useEffect(() => {
    const themeVariables = selectedPalette;
    const root = document.documentElement;
    Object.entries(themeVariables).forEach(([key, value]) => {
      // if value is string -> Take it as is. otherwise, `${value[0]} ${value[1]} ${value[2]}`;
      const hslString =
        value instanceof Array
          ? getThemeColor(key as keyof typeof themeVariables, themeVariables)
          : value;
      root.style.setProperty(`--${key}`, hslString);
    });
  }, [selectedPalette, allPalettes]);

  return null;
};

export default ThemeUpdate;

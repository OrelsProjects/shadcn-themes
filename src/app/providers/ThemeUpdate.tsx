"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { getThemeColor } from "@/lib/utils";
import axios from "axios";
import { Palette } from "@/models/palette";
import { addPalettes } from "@/lib/features/theme/paletteSlice";

const ThemeUpdate = () => {
  const dispatch = useAppDispatch();
  const { selectedPalette, allPalettes } = useAppSelector(
    state => state.palette,
  );
  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    axios
      .get<Palette>("/api/test")
      .then(palettes => {
        dispatch(addPalettes(palettes.data));
      })
      .finally(() => {
        loadingRef.current = false;
      });
  }, [dispatch]);

  useEffect(() => {
    const themeVariables = selectedPalette;
    const root = document.documentElement;
    Object.entries(themeVariables).forEach(([key, value]) => {
      // if value is string -> Take it as is. otherwise, `${value[0]} ${value[1]} ${value[2]}`;
      const hslString =
        value instanceof Array
          ? getThemeColor(key as keyof typeof themeVariables, themeVariables)
          : value;
      // split by -, add -demo after the first part, then join by -
      const keyParts = key.split("-");
      const demoKey = [keyParts[0], "demo", ...keyParts.slice(1)].join("-");
      root.style.setProperty(`--${demoKey}`, hslString);
    });
  }, [selectedPalette, allPalettes]);

  return null;
};

export default ThemeUpdate;

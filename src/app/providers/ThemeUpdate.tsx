"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { getThemeColor } from "@/lib/utils";
import axios from "axios";
import { Palette, ParsedPalette, ThemePalette } from "@/models/palette";
import { addPalettes } from "@/lib/features/theme/paletteSlice";

const ThemeUpdate = () => {
  const dispatch = useAppDispatch();
  const { selectedPalette, allPalettes, selectedThemeType } = useAppSelector(
    state => state.palette,
  );
  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    axios
      .get<ParsedPalette[]>("/api/themes")
      .then(({ data: palettes }) => {
        const parsedPalettes: ParsedPalette[] = palettes.map(theme => ({
          id: theme.id,
          name: theme.name,
          colors: {
            ...theme.colors,
          },
          owner: theme.owner,
        }));

        dispatch(addPalettes(parsedPalettes));
      })
      .finally(() => {
        loadingRef.current = false;
      });
  }, [dispatch]);

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

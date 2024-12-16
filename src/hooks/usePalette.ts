import { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPalettes } from "@/lib/features/theme/paletteSlice";
import { ParsedPalette, ThemeType } from "@/models/palette";
import axios from "axios";
import { generatePalette } from "@/lib/palette/utils";

export function usePalette() {
  const dispatch = useAppDispatch();
  const { allPalettes } = useAppSelector(state => state.palette);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const loadingPagingRef = useRef(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if(loadingRef.current) return;
    loadingRef.current = true;
    if (allPalettes.length === 0) {
      axios
        .get<ParsedPalette[]>("/api/themes")
        .then(({ data: palettes }) => {
          let parsedPalettes: ParsedPalette[] = palettes.map(theme => ({
            id: theme.id,
            name: theme.name,
            colors: {
              ...theme.colors,
            },
            owner: theme.owner,
          }));
          // .map(palette => {
          //   const hasLight = Object.keys(palette.colors.light).length > 0;
          //   const hasDark = Object.keys(palette.colors.dark).length > 0;
          //   let themeToGenerate = "";
          //   if (!hasDark || !hasLight) {
          //     if (hasDark) {
          //       themeToGenerate = "light";
          //     } else if (hasLight) {
          //       themeToGenerate = "dark";
          //     }
          //   }
          //   // debugger;
          //   if (themeToGenerate === "light" || themeToGenerate === "dark") {
          //     const existingTheme =
          //       themeToGenerate === "light" ? "dark" : "light";
          //     const newTheme = generatePalette({
          //       primary: palette.colors[existingTheme].primary,
          //       secondary: palette.colors[existingTheme].secondary,
          //       accent: palette.colors[existingTheme].accent,
          //       background: palette.colors[existingTheme].background,
          //       error: palette.colors[existingTheme].destructive,
          //       card: palette.colors[existingTheme].card,
          //       text: palette.colors[existingTheme].foreground,
          //       theme: existingTheme as ThemeType,
          //     });
          //     return {
          //       ...palette,
          //       colors: {
          //         dark:
          //           themeToGenerate === "dark"
          //             ? newTheme.dark
          //             : palette.colors.dark,
          //         light:
          //           themeToGenerate === "light"
          //             ? newTheme.light
          //             : palette.colors.light,
          //       },
          //     };
          //   }
          //   return palette;
          // });

          dispatch(addPalettes(parsedPalettes));
        })
        .finally(() => {
          setLoadingThemes(false);
          loadingRef.current = false;
        });
    }
  }, []);

  // Paginated themes from the Redux state
  const currentPalettes = useMemo(() => {
    return allPalettes.slice(0, page * itemsPerPage);
  }, [allPalettes, page]);

  const loadMorePalettes = () => {
    if (loadingPagingRef.current) return;
    loadingPagingRef.current = true;
    if (currentPalettes.length < allPalettes.length) {
      setPage(prev => prev + 1);
    }

    setTimeout(() => {
      loadingPagingRef.current = false;
    }, 250);
  };

  const resetPaging = () => {
    setPage(1);
  };

  const hasMore = currentPalettes.length < allPalettes.length;

  return {
    currentPalettes,
    loadMorePalettes,
    hasMore,
    loadingThemes,
    resetPaging,
  };
}

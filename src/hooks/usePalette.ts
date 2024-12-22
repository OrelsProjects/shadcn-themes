import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPalettes } from "@/lib/features/theme/paletteSlice";
import { HSL, ParsedPalette } from "@/models/palette";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import cuid from "cuid";
import { Logger } from "@/logger";
import { throttle } from "lodash";
import axiosInstance from "@/lib/axiosInstance";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { generateRandomPalette } from "@/lib/palette/utils";

export function usePalette() {
  const dispatch = useAppDispatch();
  // media query for mobile
  const matches = useMediaQuery("(max-width: 768px)");
  const [userId, setUserId] = useLocalStorage("shadcn-themes-user-id", "");
  const { allPalettes } = useAppSelector(state => state.palette);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [loadingPaging, setLoadingPaging] = useState(false);
  const [wasInitialized, setWasInitialized] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const loadingPagingRef = useRef(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (!userId) {
      const newUserId = cuid();
      setUserId(newUserId);
    }
  }, []);

  const fetchAndSetPalettes = async (page: number) => {
    try {
      if (loadingRef.current) return;
      loadingRef.current = true;
      const resposne = await axiosInstance.get<{
        palettes: ParsedPalette[];
        hasMore: boolean;
      }>("/api/themes", {
        params: {
          page,
          all: matches,
        },
      });

      const { palettes, hasMore } = resposne.data;

      setHasMore(hasMore);

      let parsedPalettes: ParsedPalette[] = palettes.map(theme => ({
        ...theme,
        id: theme.id,
        name: theme.name,
        colors: {
          ...theme.colors,
        },
        owner: theme.owner,
      }));

      dispatch(addPalettes(parsedPalettes));
    } catch (e: any) {
      Logger.error("Failed to fetch palettes", e);
    } finally {
      loadingRef.current = false;
    }
  };

  const init = useCallback(() => {
    if (allPalettes.length === 0 && !wasInitialized) {
      setLoadingThemes(true);
      fetchAndSetPalettes(1).finally(() => {
        setLoadingThemes(false);
        setWasInitialized(true);
      });
    }
  }, [allPalettes, matches]);

  // Paginated themes from the Redux state
  const currentPalettes = useMemo(() => {
    const uniquePalettes = allPalettes.reduce((acc, palette) => {
      if (!acc.find(p => p.id === palette.id)) {
        acc.push(palette);
      }
      return acc;
    }, [] as ParsedPalette[]);

    return matches
      ? uniquePalettes
      : uniquePalettes.slice(0, page * itemsPerPage);
  }, [allPalettes, page]);

  const loadMorePalettes = () => {
    if (!hasMore) {
      const maxPage = Math.ceil(allPalettes.length / itemsPerPage);
      if (page < maxPage) {
        setPage(maxPage);
      }
      return;
    }
    if (loadingPagingRef.current) return;
    setLoadingPaging(true);
    loadingPagingRef.current = true;
    if (currentPalettes.length < allPalettes.length) {
      setPage(prev => prev + 1);
    }

    fetchAndSetPalettes(page + 1).finally(() => {
      loadingPagingRef.current = false;
      setLoadingPaging(false);
    });
  };

  const resetPaging = () => {
    setPage(1);
  };

  const visitTheme = useMemo(
    () =>
      throttle(async (theme: ParsedPalette) => {
        if (!userId) {
          Logger.error("No user id found");
        }
        try {
          await axiosInstance.post("/api/themes/visit", {
            themeId: theme.id,
            userId: userId || "not-found",
          });
        } catch (e: any) {
          Logger.error("Failed to visit theme", e);
        }
      }, 2000),
    [userId],
  );

  // throttle the above
  const addCopyCode = useMemo(
    () =>
      throttle(
        (theme: ParsedPalette) => {
          try {
            axiosInstance.post("/api/copy", {
              themeId: theme.id,
              userId,
            });
          } catch (e: any) {
            Logger.error("Failed to add copy code", { error: e });
          }
        },
        2000,
        { trailing: false },
      ),
    [userId],
  );

  const generateRandomPalette = (primaryColor?: HSL | null): ParsedPalette => {
    const { light, dark } = generateRandomPalette(primaryColor);
    return {
      name: "Random",
      id: "random",
      owner: "random",
      views: 0,
      colors: {
        light,
        dark,
      },
    };
  };

  return {
    init,
    addCopyCode,
    currentPalettes,
    loadMorePalettes,
    loadingThemes,
    resetPaging,
    loadingPaging,
    visitTheme,
    generateRandomPalette,
  };
}

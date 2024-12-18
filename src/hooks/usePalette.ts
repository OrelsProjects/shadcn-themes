import { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPalettes } from "@/lib/features/theme/paletteSlice";
import { ParsedPalette } from "@/models/palette";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import cuid from "cuid";
import { Logger } from "@/logger";
import { throttle } from "lodash";
import axiosInstance from "@/lib/axiosInstance";

export function usePalette() {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useLocalStorage("shadcn-themes-user-id", "");
  const { allPalettes } = useAppSelector(state => state.palette);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [loadingPaging, setLoadingPaging] = useState(false);
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
        },
      });

      const { palettes, hasMore } = resposne.data;

      setHasMore(hasMore);

      let parsedPalettes: ParsedPalette[] = palettes.map(theme => ({
        id: theme.id,
        name: theme.name,
        colors: {
          ...theme.colors,
        },
        owner: theme.owner,
      }));

      dispatch(addPalettes(parsedPalettes));
    } catch (e) {
      console.error(e);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    if (allPalettes.length === 0) {
      setLoadingThemes(true);
      fetchAndSetPalettes(1).finally(() => {
        setLoadingThemes(false);
      });
    }
  }, []);

  // Paginated themes from the Redux state
  const currentPalettes = useMemo(() => {
    const uniquePalettes = allPalettes.reduce((acc, palette) => {
      if (!acc.find(p => p.id === palette.id)) {
        acc.push(palette);
      }
      return acc;
    }, [] as ParsedPalette[]);
    return uniquePalettes.slice(0, page * itemsPerPage);
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
          Logger.error("No user id found", userId);
          return;
        }
        try {
          await axiosInstance.post("/api/themes/visit", {
            themeId: theme.id,
            userId,
          });
        } catch (e) {
          Logger.error("Failed to visit theme", e);
        }
      }, 2000),
    [userId],
  );

  return {
    currentPalettes,
    loadMorePalettes,
    loadingThemes,
    resetPaging,
    loadingPaging,
    visitTheme,
  };
}

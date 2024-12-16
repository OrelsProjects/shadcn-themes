import { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPalettes } from "@/lib/features/theme/paletteSlice";
import { ParsedPalette } from "@/models/palette";
import axios from "axios";

export function usePalette() {
  const dispatch = useAppDispatch();
  const { allPalettes } = useAppSelector(state => state.palette);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [loadingPaging, setLoadingPaging] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const loadingPagingRef = useRef(false);
  const itemsPerPage = 20;

  const fetchAndSetPalettes = async (page: number) => {
    try {
      if (loadingRef.current) return;
      console.log("fetching themes");
      loadingRef.current = true;
      const resposne = await axios.get<{
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

  return {
    currentPalettes,
    loadMorePalettes,
    hasMore,
    loadingThemes,
    resetPaging,
    loadingPaging,
  };
}

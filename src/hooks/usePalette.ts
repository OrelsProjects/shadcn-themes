import { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPalettes } from "@/lib/features/theme/paletteSlice";
import { ParsedPalette } from "@/models/palette";
import axios from "axios";

export function usePalette() {
  const dispatch = useAppDispatch();
  const { allPalettes } = useAppSelector(state => state.palette);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(true);
  const loadingPagingRef = useRef(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (allPalettes.length === 0) {
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
          setLoadingThemes(false);
          loadingRef.current = false;
        });
    }
  }, [allPalettes]);

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
    }, 500);
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

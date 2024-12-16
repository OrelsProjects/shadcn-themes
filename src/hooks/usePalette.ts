import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { EncryptedPalette, ParsedPalette } from "@/models/palette";
import axios from "axios";
import { decrypt } from "@/lib/encryption";
import { selectPalette as selectPaletteAction } from "@/lib/features/theme/paletteSlice";
import { useAppDispatch } from "@/hooks/redux";

export function usePalette() {
  const dispatch = useAppDispatch();
  const [allPalettes, setAllPalettes] = useState<ParsedPalette[]>([]);
  const [currentPalettes, setCurrentPalettes] = useState<ParsedPalette[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const loadingPagingRef = useRef(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    if (allPalettes.length === 0) {
      axios
        .get<EncryptedPalette[]>("/api/themes")
        .then(({ data }) => {
          const parsePalettes = async () => {
            const parsedPalettes = data.map(palette => ({
              id: palette.id,
              name: palette.name,
              owner: palette.owner,
              colors: JSON.parse(
                decrypt(
                  palette.encryptedKey,
                  palette.iv,
                  palette.encryptedColors,
                ),
              ),
            }));
            setAllPalettes(parsedPalettes);
            updateCurrentPalettes(1, parsedPalettes);
          };
          parsePalettes();
        })
        .finally(() => {
          setLoadingThemes(false);
          loadingRef.current = false;
        });
    }
  }, []);

  const updateCurrentPalettes = useCallback(
    async (page: number, palettes: ParsedPalette[]) => {
      const newPalettes = palettes.slice(0, page * itemsPerPage);
      setCurrentPalettes(newPalettes);
    },
    [allPalettes],
  );

  const loadMorePalettes = async () => {
    if (loadingPagingRef.current) return;
    loadingPagingRef.current = true;
    if (currentPalettes.length < allPalettes.length) {
      setPage(prev => prev + 1);
    }
    updateCurrentPalettes(page + 1, allPalettes);
    setTimeout(() => {
      loadingPagingRef.current = false;
    }, 50);
  };

  const resetPaging = () => {
    setPage(1);
  };

  const hasMore = currentPalettes.length < allPalettes.length;

  const selectPalette = useCallback((name: string) => {
    const newPalette = currentPalettes.find(palette => palette.name === name);
    if (newPalette) {
      dispatch(selectPaletteAction({ newPalette }));
    }
  }, []);

  return {
    currentPalettes,
    selectPalette,
    loadMorePalettes,
    hasMore,
    loadingThemes,
    resetPaging,
  };
}

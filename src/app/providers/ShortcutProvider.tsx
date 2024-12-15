"use client";

import {
  changeThemeType,
  setShowThemePalette,
} from "@/lib/features/theme/paletteSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useCallback, ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface ShortcutProviderProps {
  children: ReactNode;
}

export function ShortcutProvider({ children }: ShortcutProviderProps) {
  const dispatch = useAppDispatch();
  const { selectedThemeType } = useAppSelector(state => state.palette);

  const handleLPress = () => {
    if (selectedThemeType === "light") {
      return;
    }
    dispatch(changeThemeType());
  };
  const handleLRelease = () => {
    if (selectedThemeType === "dark") {
      return;
    }
    dispatch(changeThemeType());
  };

  useHotkeys(
    ["l", "t"],
    (event, handler) => {
      console.log(event.key);
      console.log(event.type);
      switch (event.key) {
        case "l":
          if (event.type === "keydown") {
            handleLPress();
          } else if (event.type === "keyup") {
            handleLRelease();
          }
          break;
        case "t":
          if (event.type === "keyup") {
            dispatch(setShowThemePalette(true));
          }
          break;
      }
    },
    {
      enableOnFormTags: true,
      keyup: true,
      keydown: true,
    },
  );

  return children;
}

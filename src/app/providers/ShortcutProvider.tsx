"use client";

import {
  changeThemeType,
  setHideThemePalette,
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
    ["l", "t", "Escape"],
    (event, handler) => {
      console.log(event.key);
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
            setTimeout(() => {
              dispatch(setShowThemePalette(false));
            }, 200);
            break;
          }
        case "Escape":
          if (event.type === "keyup") {
            dispatch(setHideThemePalette(true));
            setTimeout(() => {
              dispatch(setHideThemePalette(false));
            }, 200);
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

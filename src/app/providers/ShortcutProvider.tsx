"use client";

import { changeThemeType } from "@/lib/features/theme/paletteSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
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
    "l",
    (event, handler) => {
      console.log(event.type);
      if (event.type === "keydown") {
        handleLPress();
      } else if (event.type === "keyup") {
        handleLRelease();
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

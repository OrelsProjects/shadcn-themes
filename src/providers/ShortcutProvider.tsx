"use client";

import {
  changeThemeType,
  setHideThemePalette,
  setShowThemePalette,
} from "@/lib/features/theme/paletteSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ReactNode, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { EventTracker } from "@/eventTracker";

interface ShortcutProviderProps {
  children: ReactNode;
}

export function ShortcutProvider() {
  const dispatch = useAppDispatch();
  const { baseThemeType } = useAppSelector(state => state.palette);
  const [previousKey, setPreviousKey] = useState<{
    keyCode: string;
    type: string;
  } | null>(null);

  const handleLPress = () => {
    dispatch(changeThemeType(baseThemeType === "dark" ? "light" : "dark"));
  };
  const handleLRelease = () => {
    dispatch(changeThemeType(baseThemeType));
  };

  useHotkeys(
    ["l", "t", "Escape"],
    event => {
      EventTracker.track("shortcut", { key: event.code });
      const allowDoubles = ["keyT", "Escape"];
      const keyCode = event.code;
      if (
        !allowDoubles.includes(keyCode) &&
        keyCode === previousKey?.keyCode &&
        event.type === previousKey?.type
      ) {
        return;
      }
      setPreviousKey({ keyCode, type: event.type });
      switch (keyCode) {
        case "KeyL":
          if (event.type === "keydown") {
            handleLPress();
          } else if (event.type === "keyup") {
            handleLRelease();
          }
          break;
        case "KeyT":
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

  return null;
}

"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setSystemTheme } from "@/lib/features/theme/paletteSlice";
import { useEffect } from "react";

export default function Theme({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSystemTheme("light"));

    return () => {
      dispatch(setSystemTheme("dark"));
    };
  }, []);

  return children;
}

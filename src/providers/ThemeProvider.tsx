"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useAppSelector } from "@/hooks/redux";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { systemTheme } = useAppSelector(state => state.palette);

  return (
    <NextThemesProvider attribute="class" forcedTheme={systemTheme} {...props}>
      {children}
    </NextThemesProvider>
  );
}

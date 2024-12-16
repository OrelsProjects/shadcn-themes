import React, { useState, useEffect, useMemo } from "react";
import { Lamp, Menu, Moon, Sun, X } from "lucide-react";
import Logo from "@/components/logo";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";

const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const { baseThemeType } = useAppSelector(state => state.palette);


  const lightDarkText = useMemo(() => {
    if (baseThemeType === "light") {
      return "Dark";
    }
    return "Light";
  }, [baseThemeType]);



  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-col">
            <kbd className="w-fit pointer-events-none h-5 select-none items-center gap-1 rounded border bg-background p-2 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <p className="text-xs">Press L to {lightDarkText}</p>{" "}
              {baseThemeType === "dark" && <Sun className="w-4 h-4" />}
              {baseThemeType === "light" && <Moon className="w-4 h-4" />}
            </kbd>
            <span className="text-xs text-muted flex flex-row gap-1 items-center mt-1"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

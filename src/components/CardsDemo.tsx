"use client";

import { CardsDemo } from "@/components/cards";
import { Button } from "@/components/ui-demo/button";
import { EventTracker } from "@/eventTracker";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeBaseThemeType,
  changeThemeType,
} from "@/lib/features/theme/paletteSlice";
import { LampDesk } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { ThemeType } from "@/models/palette";
import { useAnimation, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const TIME_TO_CHANGE_THEME = 200;

const Header = ({
  selectedThemeType,
  baseThemeType,
}: {
  selectedThemeType: ThemeType;
  baseThemeType: ThemeType;
}) => {
  const lightDarkText = useMemo(() => {
    if (baseThemeType === "light") {
      return "Dark";
    }
    return "Light";
  }, [baseThemeType]);

  const dispatch = useAppDispatch();
  const [isPressed, setIsPressed] = useState(false);
  const [currentY, setCurrentY] = useState(0); // Track the current Y position
  const [timeToChangeTheme, setTimeToChangeTheme] = useState(new Date());
  const controls = useAnimation();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (new Date() < timeToChangeTheme) return;
    setIsPressed(true);
    const newY = currentY + 6; // Incrementally increase the downward movement
    setCurrentY(newY); // Update the state
    controls.start({
      y: newY,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    });
  };

  const handleMouseUp = () => {
    if (new Date() < timeToChangeTheme) return;
    setIsPressed(false);
    controls.start({
      y: [currentY, 0], // Overshoot and return to the initial position
      transition: {
        type: "spring",
        duration: 0.2,
      },
    });
    setCurrentY(0); // Reset position to 0
  };

  const handleThemeChange = (source: string) => {
    EventTracker.track("theme_change", { source });
    if (new Date() < timeToChangeTheme) return;
    setTimeToChangeTheme(new Date(Date.now() + TIME_TO_CHANGE_THEME));
    dispatch(changeBaseThemeType());
  };
  return (
    <div
      className={cn(
        "sticky top-0 sm:top-0 w-full flex justify-center sm:justify-between bg-muted-demo items-center p-4 rounded-t-lg shadow-md sm:border-foreground-demo/40 z-10",
        {
          "border-b border-foreground-demo/30": baseThemeType === "dark",
        },
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <motion.div
          id="header"
          animate={controls}
          initial={{ y: 0 }}
          onClick={() => {
            handleThemeChange("lamp");
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => isPressed && handleMouseUp()}
        >
          <Button
            variant={"outline"}
            className={cn(
              "rounded-lg active:translate-y-1 transition-all w-fit inline-flex items-center border-foreground/30",
              {
                "shadow-md": selectedThemeType === "light",
              },
            )}
          >
            <LampDesk
              className="!w-5 !h-5 text-foreground-demo"
              isDark={selectedThemeType === "dark"}
            />
          </Button>
        </motion.div>
      </div>
      <div
        onClick={() => {
          handleThemeChange("text");
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={cn(
          "w-fit p-4 h-5 select-none items-center gap-1 rounded border border-foreground-demo/20 bg-background-demo font-mono text-[10px] font-medium opacity-100 hidden sm:flex",
          {
            "border-foreground-demo/60": baseThemeType === "light",
          },
        )}
      >
        <p className="text-sm text-foreground-demo">
          Hold <kbd className="border border-border p-1 px-2">L</kbd> to{" "}
          {lightDarkText}
        </p>
        {baseThemeType === "dark" && (
          <Sun className="w-4 h-4 text-foreground-demo" />
        )}
        {baseThemeType === "light" && (
          <Moon className="w-4 h-4 text-foreground-demo" />
        )}
      </div>
    </div>
  );
};

export function CardsDemoContainer({
  minimal = false,
  theme,
}: {
  minimal?: boolean;
  theme?: ThemeType;
}) {
  const dispatch = useAppDispatch();
  const { baseThemeType, selectedThemeType, selectedPalette } = useAppSelector(
    state => state.palette,
  );
  const [previousTheme, setPreviousTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    if (theme && theme !== selectedThemeType) {
      setPreviousTheme(selectedThemeType);
      dispatch(changeThemeType(theme));
    }
    return () => {
      if (theme && previousTheme) {
        dispatch(changeThemeType(previousTheme));
      }
    };
  }, [theme]);

  return (
    <div className="relative md:container md:!px-0 w-full h-full bg-background-demo rounded-lg border border-foreground/10 sm:border-foreground/30 px-0 pb-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full flex flex-col gap-4 relative"
      >
        <Header
          selectedThemeType={selectedThemeType}
          baseThemeType={baseThemeType}
        />
        <div className="w-full flex justify-center px-4">
          <div className="max-w-full">
            <CardsDemo />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

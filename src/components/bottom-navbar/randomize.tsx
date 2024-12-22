"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dices, ChevronDown, RotateCcw, X, Lock, Unlock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HSL, ParsedPalette } from "@/models/palette";
import { usePalette } from "@/hooks/usePalette";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { ColorPicker } from "@/components/ui/color-picker";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { EventTracker } from "@/eventTracker";

export default function RandomizePopover() {
  const dispatch = useAppDispatch();
  const { selectedThemeType, selectedPalette } = useAppSelector(
    state => state.palette,
  );
  const { generateRandomPalette } = usePalette();

  const [primaryColor, setPrimaryColor] = useState<HSL>([0, 0, 0]);
  const [primaryForegroundColor, setPrimaryForegroundColor] = useState<HSL>([
    255, 255, 255,
  ]);
  const [customPrimaryColor, setCustomPrimaryColor] = useState<HSL | null>(
    null,
  );
  const [isLocked, setIsLocked] = useState(false); // Lock state
  const [history, setHistory] = useState<ParsedPalette[]>([selectedPalette]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    setPrimaryColor(history[currentIndex]?.colors[selectedThemeType].primary);
    setPrimaryForegroundColor(
      history[currentIndex]?.colors[selectedThemeType]["primary-foreground"],
    );
  }, [currentIndex, history, selectedThemeType]);

  const generatePalette = () => {
    EventTracker.track("Randomize palette clicked");
    debugger;
    const newPalette = generateRandomPalette(isLocked ? primaryColor : null);
    setHistory(prev => [...prev, newPalette]);
    setCurrentIndex(prev => prev + 1);
    dispatch(selectPalette({ newPalette: newPalette }));
  };

  const currentPalette = useMemo(() => {
    return history[currentIndex] || selectedPalette;
  }, [currentIndex, history]);

  const setSelectedPalette = (value: number | ParsedPalette) => {
    const palette = typeof value === "number" ? history[value] : value;
    if (typeof value === "number") {
      setCurrentIndex(value);
    }
    dispatch(selectPalette({ newPalette: palette }));
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => {
        const newIndex = prev - 1;
        setSelectedPalette(newIndex);
        return newIndex;
      });
    }
  };

  const showNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        setSelectedPalette(newIndex);
        return newIndex;
      });
    }
  };

  const debouncedHandleColorChange = useMemo(
    () =>
      debounce((color: HSL) => {
        setCustomPrimaryColor(color);
        const newPalette: ParsedPalette = {
          ...currentPalette,
          colors: {
            dark: {
              ...currentPalette.colors.dark,
              primary: color,
            },
            light: {
              ...currentPalette.colors.light,
              primary: color,
            },
          },
        };
        setHistory(prev => [...prev, newPalette]);
        setCurrentIndex(prev => prev + 1);
        dispatch(selectPalette({ newPalette }));
      }, 120),
    [currentPalette, dispatch],
  );

  const handleColorChange = (color: HSL) => {
    debouncedHandleColorChange(color);
  };

  const closePicker = () => {
    setIsPickerOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <Dices className="h-5 w-5" />
          <span className="hidden sm:inline-flex">Randomize</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 border-border/60" side="top">
        <div className="flex flex-col space-y-4">
          <AnimatePresence>
            {isPickerOpen && (
              <motion.div
                key="color-picker"
                initial={{
                  scale: 0.8,
                  y: 0,
                  opacity: 0,
                  transformOrigin: "bottom",
                }}
                animate={{
                  scale: 1,
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.8,
                  y: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className={cn(
                  "w-full flex flex-col items-center justify-center gap-2 bg-card-foreground/20 rounded-lg p-2",
                  {
                    "bg-background p-0": !isPickerOpen,
                  },
                )}
              >
                <Button
                  variant="ghost"
                  onClick={closePicker}
                  className="h-6 px-2 self-end"
                >
                  <X className="h-3 w-3" />
                </Button>
                <ColorPicker
                  value={primaryColor}
                  onColorChange={handleColorChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div
            id="primary-color"
            className={cn(
              "h-8 w-full cursor-pointer rounded flex items-center justify-between px-2",
              {
                "opacity-50": !currentPalette,
              },
            )}
            style={{
              backgroundColor: primaryColor
                ? `hsl(${primaryColor[0]}, ${primaryColor[1]}%, ${primaryColor[2]}%)`
                : "transparent",
              color: primaryForegroundColor
                ? `hsl(${primaryForegroundColor[0]}, ${primaryForegroundColor[1]}%, ${primaryForegroundColor[2]}%)`
                : "hsl(var(--card))",
            }}
            onClick={() => {
              if (!currentPalette) return;
              setIsPickerOpen(prev => !prev);
            }}
          >
            {currentPalette && (
              <span className="text-sm font-bold">
                {`hsl(${primaryColor[0]}, ${primaryColor[1]}%, ${primaryColor[2]}%)`}
              </span>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={e => {
                e.stopPropagation();
                EventTracker.track("Color Locked", {
                  color: primaryColor,
                });
                setIsLocked(prev => !prev);
              }}
              className="h-6 w-6 text-foreground"
            >
              {isLocked ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button onClick={generatePalette} className="w-full">
            Generate
          </Button>
          <div className="flex space-x-2">
            <Button
              onClick={showPrevious}
              disabled={currentIndex <= 0}
              variant="outline"
              className="w-full"
            >
              Previous
            </Button>
            <Button
              onClick={showNext}
              disabled={currentIndex >= history.length - 1}
              variant="outline"
              className="w-full"
            >
              Next
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

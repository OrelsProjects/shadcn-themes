import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  selectPalette,
  setShowThemePalette,
} from "@/lib/features/theme/paletteSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { cn, getThemeColor } from "@/lib/utils";
import { ParsedPalette, ThemeType } from "@/models/palette";
import { Moon, Palette, Sun, X } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const ColorSwatch = ({ color }: { color: string }) => (
  <div
    className="w-6 h-6 rounded-full border border-gray-300"
    style={{ backgroundColor: color }}
  />
);

const PaletteCard = ({
  palette,
  isSelected,
  onPaletteSelected,
  selectedThemeType,
}: {
  palette: ParsedPalette;
  isSelected: boolean;
  onPaletteSelected: (e: any) => void;
  selectedThemeType: ThemeType;
}) => {
  const colors = useMemo(() => {
    const isSelectedThemeTypeDark = selectedThemeType === "dark";
    const haveDarkTheme = Object.keys(palette.colors.dark).length > 0;
    const haveLightTheme = Object.keys(palette.colors.light).length > 0;

    if (haveDarkTheme && haveLightTheme) {
      return palette.colors[selectedThemeType];
    }

    if (isSelectedThemeTypeDark) {
      return haveDarkTheme ? palette.colors.dark : palette.colors.light;
    } else {
      return haveLightTheme ? palette.colors.light : palette.colors.dark;
    }
  }, [palette, selectedThemeType]);

  const hasLightTheme = Object.keys(palette.colors.light).length > 0;
  const hasDarkTheme = Object.keys(palette.colors.dark).length > 0;

  return (
    <div
      onClick={onPaletteSelected}
      className={cn(
        "p-2 rounded-lg cursor-pointer hover:bg-muted/40 flex flex-col justify-between border border-foreground/5",
        isSelected && "bg-muted/20",
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-foreground">
          {palette.name
            .split("-")
            .map(x => x[0].toUpperCase() + x.slice(1))
            .join(" ")}
        </h3>
        <div className="flex space-x-1">
          {hasLightTheme && <Sun className="w-3 h-3 text-foreground/50" />}
          {hasDarkTheme && <Moon className="w-3 h-3 text-foreground/50" />}
        </div>
      </div>
      <div className="flex space-x-2">
        <ColorSwatch color={getThemeColor("primary", colors, true)} />
        <ColorSwatch color={getThemeColor("secondary", colors, true)} />
        <ColorSwatch color={getThemeColor("background", colors, true)} />
        <ColorSwatch color={getThemeColor("card", colors, true)} />
      </div>
    </div>
  );
};

export function ThemesDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const mouseOutTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const paletteButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const {
    selectedPaletteName,
    allPalettes,
    selectedThemeType,
    showThemePalette,
  } = useAppSelector(state => state.palette);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showThemePalette) {
      paletteButtonRef.current?.click();
      dispatch(setShowThemePalette(false));
    }
  }, [showThemePalette]);

  const groupedPalettes = useMemo(() => {
    const groups: Record<string, ParsedPalette[]> = {};
    allPalettes.forEach(palette => {
      if (!groups[palette.owner]) {
        groups[palette.owner] = [];
      }
      groups[palette.owner].push(palette);
    });
    return groups;
  }, [allPalettes, selectedThemeType]);

  // 200ms delay to prevent flickering
  const handleMouseLeave = () => {
    mouseOutTimeout.current = setTimeout(() => {
      setIsHover(false);
    }, 200);
  };

  const handleMouseEnter = () => {
    if (mouseOutTimeout.current) {
      clearTimeout(mouseOutTimeout.current);
    }
    setIsHover(true);
  };

  return (
    <div
      className="relative w-fit h-fit flex items-end justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // onBlur={() => setIsOpen(false)}
    >
      <Button
        ref={paletteButtonRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="mr-2 h-4 w-4" />
        Themes <kbd>(T)</kbd>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 0,
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            key="themes-dialog"
            className={cn(
              "absolute bottom-12 w-[42rem] h-[26rem] bg-card/5 transition-all rounded-lg border border-border/5 p-4 overflow-y-auto",
              {
                "bg-card border-border/40 shadow-lg": isHover || !isHover,
              },
            )}
          >
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
              className="absolute top-2 right-2 bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
            <div
              className={cn("p-4 pb-0 opacity-5 transition-opacity", {
                "opacity-100": isHover || !isHover,
              })}
            >
              {Object.entries(groupedPalettes).map(([owner, palettes]) => (
                <div key={owner} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-1 text-foreground">
                    {owner}
                  </h2>
                  <div
                    className="grid grid-cols-4 gap-4"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    {palettes.map(palette => (
                      <PaletteCard
                        key={palette.name}
                        selectedThemeType={selectedThemeType}
                        palette={palette}
                        isSelected={palette.name === selectedPaletteName}
                        onPaletteSelected={(e: any) => {
                          dispatch(selectPalette({ name: palette.name }));
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

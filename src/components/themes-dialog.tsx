import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { cn, getThemeColor } from "@/lib/utils";
import { ParsedPalette, ThemeType } from "@/models/palette";
import { Palette, X } from "lucide-react";
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CopyComponent from "@/components/ui/copy";
import { usePalette } from "@/hooks/usePalette";
import { Skeleton } from "@/components/ui/skeleton";
import ReactDOM from "react-dom";

interface ColorSwatchProps {
  color: string;
  isHover?: boolean;
}

const ColorSwatch = ({ color, isHover }: ColorSwatchProps) => {
  return isHover ? (
    <ColorSwatchTooltip color={color} />
  ) : (
    <div
      className="w-6 h-6 rounded-full opacity-50"
      style={{ backgroundColor: color }}
    />
  );
};

export const ColorSwatchTooltip = ({ color }: ColorSwatchProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger>
          <div
            className="w-6 h-6 rounded-full hover:scale-105"
            style={{ backgroundColor: color }}
          />
        </TooltipTrigger>
        {isTooltipOpen && (
          <TooltipContent
            side="bottom"
            className="flex items-center gap-2 relative bg-muted/70"
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-lg"
              style={{
                backgroundColor: color,
              }}
            />
            <span className="text-sm font-mono text-foreground">{color}</span>
            <CopyComponent text={color} className="h-4 w-4" />
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

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
  const [isHover, setIsHover] = useState(false);

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

  return (
    <div
      onClick={onPaletteSelected}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "w-full p-2 rounded-lg hover:cursor-pointer hover:bg-muted/40 flex flex-col justify-between border border-foreground/5",
        isSelected && "bg-muted/20",
      )}
    >
      <div className="flex justify-between items-start mb-2 ">
        <h3 className="max-w-[80%] text-sm font-semibold text-foreground truncate">
          {palette.name
            .split("-")
            .map(x => x[0].toUpperCase() + x.slice(1))
            .join(" ")}
        </h3>
      </div>
      <div className="flex space-x-2">
        <ColorSwatch
          isHover={isHover}
          color={getThemeColor("primary", colors, true)}
        />
        <ColorSwatch
          isHover={isHover}
          color={getThemeColor("secondary", colors, true)}
        />
        <ColorSwatch
          isHover={isHover}
          color={getThemeColor("background", colors, true)}
        />
        <ColorSwatch
          isHover={isHover}
          color={getThemeColor("card", colors, true)}
        />
      </div>
    </div>
  );
};

const LoadingPalettes = () => (
  <div className="flex flex-col gap-1">
    <Skeleton className="h-6 w-40 rounded-full" />
    <div className="grid grid-cols-4 gap-4">
      {[...new Array(12)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-32 rounded-lg" />
      ))}
    </div>
  </div>
);

export function ThemesDialog() {
  const dispatch = useAppDispatch();
  const {
    currentPalettes,
    loadMorePalettes,
    hasMore,
    resetPaging,
    loadingThemes,
    loadingPaging,
  } = usePalette();
  const {
    selectedPaletteName,
    selectedThemeType,
    showThemePalette,
    hideThemePalette,
  } = useAppSelector(state => state.palette);

  console.log("Rendered at ThemesDialog", new Date().toLocaleTimeString());

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const themesButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showThemePalette) {
      themesButtonRef.current?.click();
    }
  }, [showThemePalette]);

  useEffect(() => {
    if (hideThemePalette) {
      if (isOpen) {
        closeTimeoutRef.current?.click();
      }
    }
  }, [hideThemePalette]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const scrollPosition = scrollTop + clientHeight;

    if (scrollPosition / scrollHeight > 0.7) {
      loadMorePalettes();
    }
  }, [hasMore, loadMorePalettes]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const groupedPalettes = useMemo(() => {
    const groups: Record<string, ParsedPalette[]> = {};
    currentPalettes.forEach(palette => {
      if (!groups[palette.owner]) {
        groups[palette.owner] = [];
      }
      groups[palette.owner].push(palette);
    });

    return groups;
  }, [currentPalettes, selectedThemeType]);

  const toggleDialog = () => setIsOpen(prev => !prev);

  const handleClose = () => {
    setIsOpen(false);
    resetPaging();
  };

  const Background = ({ onClick }: { onClick?: () => void }) =>
    ReactDOM.createPortal(
      <div
        onClick={onClick}
        className="fixed top-0 left-0 w-screen h-screen z-10 overflow-clip"
      />,
      document.getElementById("themes-dialog-portal")!,
    );
  return (
    <div className="w-full h-full flex items-center relative">
      {isOpen && (
        <Background
          onClick={() => {
            handleClose();
          }}
        />
      )}
      <div className="relative w-fit h-fit flex items-end justify-center">
        <Button variant="outline" onClick={toggleDialog} ref={themesButtonRef}>
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
              transition={{ duration: 0.15, ease: "easeInOut" }}
              ref={scrollContainerRef}
              key="themes-dialog"
              className={cn(
                "absolute bottom-16 w-[42rem] h-[26rem] bg-card shadow-lg transition-all rounded-lg border border-border/5 p-4 overflow-y-auto z-20",
              )}
            >
              <Button
                variant="outline"
                onClick={() => {
                  handleClose();
                }}
                ref={closeTimeoutRef}
                className="absolute top-2 right-2 bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
              {loadingThemes ? (
                <div className="flex flex-col gap-8 p-4 pt-6">
                  <LoadingPalettes />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-6 w-40 rounded-full" />
                    <div className="grid grid-cols-4 gap-4">
                      {[...new Array(12)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-32 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "p-4 pb-0 opacity-100 transition-opacity flex flex-col",
                    {
                      // "opacity-100": isHover || !isHover,
                    },
                  )}
                >
                  {Object.entries(groupedPalettes).map(([owner, palettes]) => (
                    <div key={owner} className="mb-8">
                      <h2 className="text-2xl font-semibold mb-1 text-foreground pointer-events-none">
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
                              dispatch(selectPalette({ newPalette: palette }));
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  {loadingPaging && <LoadingPalettes />}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

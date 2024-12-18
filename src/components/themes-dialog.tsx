import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { cn, getThemeColor } from "@/lib/utils";
import { ParsedPalette, ThemeType } from "@/models/palette";
import { ArrowDown, Palette, X } from "lucide-react";
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
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { EventTracker } from "@/eventTracker";

const dialogVariants = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
  transition: { duration: 0.15, ease: "easeInOut" },
};

interface ColorSwatchProps {
  color: string;
  isHover?: boolean;
  className?: string;
}

interface PaletteDialogProps {
  groupedPalettes: Record<string, ParsedPalette[]>;
  selectedThemeType: ThemeType;
  onPaletteSelected: (parsedPalette: ParsedPalette) => void;
  selectedPaletteName: string;
  loadingThemes?: boolean;
  className?: string;
  onClose: () => void;
  loading?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const PaletteDialogMobile = React.forwardRef<
  HTMLDivElement,
  PaletteDialogProps
>(({ ...props }) =>
  ReactDOM.createPortal(
    <PaletteDialog {...props} ref={props.ref} />,
    document.getElementById("themes-dialog-portal")!,
  ),
);

PaletteDialogMobile.displayName = "PaletteDialogMobile";

const PaletteDialog = React.forwardRef<HTMLDivElement, PaletteDialogProps>(
  (
    {
      groupedPalettes,
      selectedThemeType,
      onPaletteSelected,
      selectedPaletteName,
      onClose,
      className,
      loadingThemes,
      loading,
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref} // <-- pass the forwarded ref here
        {...dialogVariants}
        key="themes-dialog"
        className={cn(
          "fixed bottom-20 w-[calc(100%-1rem)] h-[30%] max-sm:left-2 sm:w-[42rem] sm:h-[26rem] bg-card shadow-lg transition-all rounded-lg border border-foreground/15 p-4 overflow-y-auto z-20",
          className,
        )}
      >
        <Button
          variant="outline"
          className="absolute top-2 right-2 z-50"
          onClick={() => {
            EventTracker.track("Themes Dialog close button clicked");
            onClose();
          }}
        >
          <X className="h-4 w-4 text-foreground" />
        </Button>
        {loadingThemes ? (
          <LoadingPalettes />
        ) : (
          <div className={cn("opacity-100 transition-opacity flex flex-col")}>
            {Object.entries(groupedPalettes).map(([owner, palettes]) => (
              <div key={owner} className="relative mb-8 text-sm sm:text-base">
                <h2 className="sticky -top-8 sm:-top-4 py-2 w-full bg-card text-xl sm:text-2xl font-semibold mb-1 text-foreground pointer-events-none z-40">
                  {owner}
                </h2>
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
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
                      onPaletteSelected={onPaletteSelected}
                    />
                  ))}
                </div>
              </div>
            ))}
            {loading && <LoadingPalettes />}
          </div>
        )}
      </motion.div>
    );
  },
);

PaletteDialog.displayName = "PaletteDialog";

const ColorSwatch = ({ color, isHover, className }: ColorSwatchProps) => {
  return isHover ? (
    <ColorSwatchTooltip color={color} className={className} />
  ) : (
    <div
      className={cn("w-4 h-4 sm:w-6 sm:h-6 rounded-full opacity-50", className)}
      style={{ backgroundColor: color }}
    />
  );
};

export const ColorSwatchTooltip = ({ color, className }: ColorSwatchProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger>
          <div
            className={cn(
              "w-4 h-4 sm:w-6 sm:h-6 rounded-full opacity-50",
              className,
            )}
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
  onPaletteSelected: (e: ParsedPalette) => void;
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
      onClick={() => onPaletteSelected(palette)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "w-full p-2 rounded-lg hover:cursor-pointer hover:bg-muted/40 flex flex-col justify-between border border-foreground/5",
        isSelected && "bg-muted/20",
      )}
    >
      <div className="flex justify-between items-start mb-2 ">
        <h3 className="max-w-[80%] text-xs sm:text-sm font-semibold text-foreground truncate">
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
          className="hidden sm:block"
          color={getThemeColor("background", colors, true)}
        />
      </div>
    </div>
  );
};

const LoadingPalettes = () => (
  <div className="flex flex-col gap-2 pt-2">
    <Skeleton className="h-6 w-40 rounded-full" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[...new Array(12)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-32 rounded-lg" />
      ))}
    </div>
  </div>
);

export function ThemesDialog() {
  const dispatch = useAppDispatch();
  const [themeClicked, setThemeClicked] = useLocalStorage(
    "theme-clicked",
    false,
  );

  const {
    currentPalettes,
    loadMorePalettes,
    resetPaging,
    init,
    loadingThemes,
    loadingPaging,
    visitTheme,
  } = usePalette();
  const {
    selectedPaletteName,
    selectedThemeType,
    showThemePalette,
    hideThemePalette,
  } = useAppSelector(state => state.palette);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const themesButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [wasThemeClicked, setWasThemeClicked] = useState(false);

  useEffect(() => {
    setWasThemeClicked(themeClicked);
  }, [themeClicked]);

  useEffect(() => {
    if (!themeClicked && isOpen) {
      setThemeClicked(true);
    }
  }, [isOpen]);

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
    if (!scrollContainerRef.current) {
      console.log("Scroll container ref is not set");
      return;
    }
    console.log("Scrolling");
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const scrollPosition = scrollTop + clientHeight;

    if (scrollPosition / scrollHeight > 0.7) {
      loadMorePalettes();
    }
  }, [loadMorePalettes]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      console.log("Scroll container ref is not set");
      return;
    }
    console.log("Adding scroll event listener");

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

  const toggleDialog = () => {
    EventTracker.track("Themes Dialog", {
      action: isOpen ? "close" : "open",
    });
    if (!isOpen) {
      init();
    }
    setIsOpen(prev => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetPaging();
  };

  const handlePaletteSelected = (parsedPalette: ParsedPalette) => {
    dispatch(selectPalette({ newPalette: parsedPalette }));
    visitTheme(parsedPalette);
  };

  const Background = ({
    onClick,
    className,
  }: {
    onClick?: () => void;
    className?: string;
  }) =>
    ReactDOM.createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
        className={cn(
          "fixed top-0 left-0 w-screen h-screen z-10 overflow-clip",
          className,
        )}
      />,
      document.getElementById("themes-dialog-background-portal")!,
    );

  return (
    <div className="w-full h-full flex items-center relative">
      {(isOpen || !wasThemeClicked) && (
        <Background
          onClick={() => {
            EventTracker.track("Themes Dialog outside click");
            handleClose();
          }}
          className={cn({
            "bg-black/60": !wasThemeClicked,
          })}
        />
      )}
      <div className="relative w-fit h-fit flex items-end justify-center">
        <AnimatePresence>
          {!wasThemeClicked && (
            <motion.div
              key="arrow-down"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="w-full absolute bottom-12 flex flex-col items-center justify-center gap-2 animate-bounce"
            >
              <ArrowDown className="h-10 w-10 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant={wasThemeClicked ? "outline" : "default"}
          onClick={toggleDialog}
          ref={themesButtonRef}
          className={cn("ring-ring/0", {
            "border-primary": !wasThemeClicked,
          })}
        >
          <div
            className={cn(
              "shimmer-animation hover:opacity-0 transition-all rounded-md",
              {
                hidden: wasThemeClicked,
              },
            )}
          />
          <Palette className="sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">
            Themes{" "}
            <kbd
              className={cn("border border-border p-1 px-2 ml-1", {
                "border-primary-foreground": !wasThemeClicked,
              })}
            >
              T
            </kbd>
          </span>
        </Button>
        <AnimatePresence>
          {isOpen && (
            <>
              <PaletteDialog
                onClose={handleClose}
                groupedPalettes={groupedPalettes}
                selectedThemeType={selectedThemeType}
                onPaletteSelected={handlePaletteSelected}
                selectedPaletteName={selectedPaletteName}
                loadingThemes={loadingThemes}
                loading={loadingPaging}
                ref={scrollContainerRef}
                className="hidden sm:block"
              />
              <PaletteDialogMobile
                onClose={handleClose}
                groupedPalettes={groupedPalettes}
                selectedThemeType={selectedThemeType}
                onPaletteSelected={handlePaletteSelected}
                selectedPaletteName={selectedPaletteName}
                loadingThemes={loadingThemes}
                loading={loadingPaging}
                ref={scrollContainerRef}
                className="sm:hidden"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

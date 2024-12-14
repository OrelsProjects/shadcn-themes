import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { cn, getThemeColor } from "@/lib/utils";
import { ParsedPalette, ThemeType } from "@/models/palette";
import { Moon, Palette, Sun } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

const ColorSwatch = ({ color }: { color: string }) => (
  <div
    className="w-6 h-6 rounded-full border border-gray-300"
    style={{ backgroundColor: color }}
  />
);

const PaletteCard = ({
  palette,
  isSelected,
  onClick,
  selectedThemeType,
}: {
  palette: ParsedPalette;
  isSelected: boolean;
  onClick: () => void;
  selectedThemeType: ThemeType;
}) => {
  const colors = useMemo(() => {
    const isSelectedThemeTypeDark = selectedThemeType === "dark";
    const doesPaletteHaveDark = Object.keys(palette.colors.dark).length > 0;
    const doesPaletteHaveLight = Object.keys(palette.colors.light).length > 0;

    if (doesPaletteHaveDark && doesPaletteHaveLight) {
      return palette.colors[selectedThemeType];
    }

    if (isSelectedThemeTypeDark) {
      return doesPaletteHaveDark ? palette.colors.dark : palette.colors.light;
    } else {
      return doesPaletteHaveLight ? palette.colors.light : palette.colors.dark;
    }
  }, [palette, selectedThemeType]);

  const hasLightTheme = Object.keys(palette.colors.light).length > 0;
  const hasDarkTheme = Object.keys(palette.colors.dark).length > 0;

  return (
    <div
      onClick={onClick}
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
  const [dialogHeight, setDialogHeight] = useState("70vh");

  const { selectedPaletteName, allPalettes, selectedThemeType } =
    useAppSelector(state => state.palette);
  const dispatch = useAppDispatch();

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

  const handleHeightChange = (height: string) => {
    setDialogHeight(height);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Palette className="mr-2 h-4 w-4" />
          Themes
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[60vw] pb-4 !p-0"
        style={{ height: dialogHeight }}
      >
        <div className="w-full h-full p-4 overflow-y-auto ">
          <div className="p-4 pb-0">
            {Object.entries(groupedPalettes).map(([owner, palettes]) => (
              <div key={owner} className="mb-8">
                <h2 className="text-2xl font-semibold mb-1 text-foreground">
                  {owner}
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {palettes.map(palette => (
                    <PaletteCard
                      key={palette.name}
                      selectedThemeType={selectedThemeType}
                      palette={palette}
                      isSelected={palette.name === selectedPaletteName}
                      onClick={() =>
                        dispatch(selectPalette({ name: palette.name }))
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

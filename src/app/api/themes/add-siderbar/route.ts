import prisma from "@/app/api/_db/db";
import { NextRequest } from "next/server";
import { buildSidebarTheme } from "@/lib/palette/utils";
import {
  BasePalette,
  Palette,
  ThemePalette,
  ThemeType,
} from "@/models/palette";

export async function GET(req: NextRequest) {
  const allThemes = await prisma.theme.findMany();
  // go over all themes, .parse it to BasePalette, and then build the sidebar theme.
  const allThemesBasePalettes = allThemes.map(theme => {
    const palette = JSON.parse(theme.themeColors) as Record<
      ThemeType,
      BasePalette
    >;
    const sideBarDark = buildSidebarTheme(palette.dark, "dark");
    const sideBarLight = buildSidebarTheme(palette.light, "light");
    const newPalette: Record<ThemeType, ThemePalette> = {
      dark: {
        ...palette.dark,
        ...sideBarDark,
      },
      light: {
        ...palette.light,
        ...sideBarLight,
      },
    };
    return {
      ...theme,
      themeColors: JSON.stringify(newPalette),
    };
  });

  for(const theme of allThemesBasePalettes) {
    await prisma.theme.update({
      where: {
        id: theme.id,
      },
      data: {
        themeColors: theme.themeColors,
      },
    });
  }

}

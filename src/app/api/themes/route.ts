import prisma from "@/app/api/_db/db";
import { generatePalette } from "@/lib/palette/utils";
import { ParsedPalette, ThemePalette, ThemeType } from "@/models/palette";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const themes = await prisma.theme.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        owner: {
          position: "asc",
        },
      },
      include: { owner: true },
    });

    let parsedThemes: ParsedPalette[] = themes.map(theme => ({
      id: theme.id,
      name: theme.themeName,
      owner: theme.owner.name,
      colors: JSON.parse(theme.themeColors) as Record<ThemeType, ThemePalette>,
    }));

    // Go over each, if they dont have light or dark, generate them.
    parsedThemes = parsedThemes.map(theme => {
      const isLight = Object.keys(theme.colors.light).length > 0;
      const isDark = Object.keys(theme.colors.dark).length > 0;
      if (isDark && isLight) {
        return theme;
      }
      return {
        ...theme,
        colors: {
          dark: theme.colors.dark,
          light: theme.colors.light,
        },
      };
    });

    return NextResponse.json(parsedThemes);
  } catch (error: any) {
    return NextResponse.error();
  } // hsl(203, %, 23%)
}

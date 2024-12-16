import prisma from "@/app/api/_db/db";
import { ParsedPalette, ThemePalette, ThemeType } from "@/models/palette";
import { NextRequest, NextResponse } from "next/server";

const PALETTES_PER_PAGE = 20;

export async function GET(req: NextRequest) {
  try {
    const pageString = req.nextUrl.searchParams.get("page") || "1";
    const page = parseInt(pageString, 10);

    const themes = await prisma.theme.findMany({
      where: {
        visible: true,
        owner: {
          visible: true,
        },
      },
      orderBy: {
        owner: {
          position: "asc",
        },
      },
      include: { owner: true },
      skip: (page - 1) * PALETTES_PER_PAGE,
      take: PALETTES_PER_PAGE,
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

    return NextResponse.json({
      palettes: parsedThemes,
      hasMore: themes.length === PALETTES_PER_PAGE,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

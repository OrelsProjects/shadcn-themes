import prisma from "@/app/api/_db/db";
import loggerServer from "@/loggerServer";
import { ParsedPalette, ThemePalette, ThemeType } from "@/models/palette";
import { NextRequest, NextResponse } from "next/server";

const PALETTES_PER_PAGE = 20;

export async function GET(req: NextRequest) {
  try {
    const pageString = req.nextUrl.searchParams.get("page") || "1";
    const getAll = req.nextUrl.searchParams.get("all") === "true";
    const page = parseInt(pageString, 10);

    const themes = await prisma.theme.findMany({
      where: {
        visible: true,
        owner: {
          visible: true,
        },
      },
      orderBy: {
        // visits: {
        //   _count: "desc",
        // },
        owner: {
          position: "asc",
        },
      },
      include: {
        owner: true,
        visits: {
          select: { id: true },
        },
      },
      skip: (page - 1) * PALETTES_PER_PAGE,
      take: getAll ? PALETTES_PER_PAGE * 100 : PALETTES_PER_PAGE,
    });

    let parsedThemes: ParsedPalette[] = themes.map(theme => ({
      id: theme.id,
      name: theme.themeName,
      owner: theme.owner.name,
      views: theme.visits.length || 0,
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
    loggerServer.error("Error getting themes", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

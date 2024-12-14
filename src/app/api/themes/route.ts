import prisma from "@/app/api/_db/db";
import { ParsedTheme, ThemePalette, ThemeType } from "@/models/palette";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const themes = await prisma.theme.findMany({
      include: { owner: true },
    });

    const parsedThemes: ParsedTheme[] = themes.map(theme => ({
      id: theme.id,
      name: theme.themeName,
      owner: theme.owner.name,
      colors: JSON.parse(theme.themeColors) as Record<ThemeType, ThemePalette>,
    }));

    return NextResponse.json(parsedThemes);
  } catch (error: any) {
    return NextResponse.error();
  }
}

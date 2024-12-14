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
    // parsedThemes = parsedThemes.map(theme => {
    //   const isLight = Object.keys(theme.colors.light).length > 0;
    //   const isDark = Object.keys(theme.colors.dark).length > 0;
    //   if (isDark && isLight) {
    //     return theme;
    //   }
    //   const data = {
    //     primary: isLight
    //       ? theme.colors.light.primary
    //       : theme.colors.dark.primary,
    //     secondary: isLight
    //       ? theme.colors.light.secondary
    //       : theme.colors.dark.secondary,
    //     accent: isLight ? theme.colors.light.accent : theme.colors.dark.accent,
    //     background: isLight
    //       ? theme.colors.light.background
    //       : theme.colors.dark.background,
    //     error: isLight
    //       ? theme.colors.light.destructive
    //       : theme.colors.dark.destructive,
    //     card: isLight ? theme.colors.light.card : theme.colors.dark.card,
    //     text: isLight
    //       ? theme.colors.light.foreground
    //       : theme.colors.dark.foreground,
    //   };
    //   const generatedPalette = generatePalette({
    //     ...data,
    //     theme: isLight ? "light" : "dark",
    //   });
    //   const light = generatedPalette.light;
    //   const dark = generatedPalette.dark;
    //   // if no light, set it to the light theme and vice versa
    //   return {
    //     ...theme,
    //     colors: {
    //       light: isLight ? theme.colors.light : light,
    //       dark: isLight ? dark : theme.colors.dark,
    //     },
    //   };
    // });

    return NextResponse.json(parsedThemes);
  } catch (error: any) {
    return NextResponse.error();
  } // hsl(203, 40%, 23%)
}

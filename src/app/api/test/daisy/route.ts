import { NextRequest, NextResponse } from "next/server";
import daisyThemes from "./daisyThemes.json";
import { Palette, ThemePalette, ThemeType } from "@/models/palette";
import { convertAllDaisyThemes } from "@/app/api/test/daisy/utils";
import prisma from "@/app/api/_db/db";
import { Theme } from "@prisma/client";

export async function GET(req: NextRequest) {
  const daisyOwner = await prisma.themeOwner.findFirst({
    where: {
      name: "DaisyUI",
    },
  });
  if (!daisyOwner) {
    throw new Error("DaisyUI owner not found");
  }
  const themes = await prisma.theme.findMany({
    where: {
      themeOwnerId: daisyOwner.id,
    },
  });

  const themesNotJson = themes.map(it => ({
    ...it,
    themeColors: JSON.parse(it.themeColors),
  }));

  const colors = themesNotJson.map(
    it => it.themeColors as Record<ThemeType, ThemePalette>,
  );
  const x = 4;
  // const themes = convertAllDaisyThemes(daisyThemes);

  // const formattedThemes: Palette = Object.entries(themes).reduce(
  //   (acc, [name, theme]) => {
  //     // Right now each color is {"h": 0, "s": 0, "l": 0}, I want to convert it to [0, 0, 0]
  //     let dark = {};
  //     let light = {};

  //     if (theme.config.dark) {
  //       dark = Object.keys(theme.config.dark).reduce((acc, key) => {
  //         const value = theme.config.dark?.[
  //           key as keyof typeof theme.config.dark
  //         ] as { h: number; s: number; l: number };
  //         acc[key] = [value.h, value.s, value.l];
  //         return acc;
  //       }, {} as any);
  //     }
  //     if (theme.config.light) {
  //       light = Object.keys(theme.config.light).reduce((acc, key) => {
  //         const value = theme.config.light?.[
  //           key as keyof typeof theme.config.light
  //         ] as { h: number; s: number; l: number };
  //         acc[key] = [value.h, value.s, value.l];
  //         return acc;
  //       }, {} as any);
  //     }
  //     return {
  //       ...acc,
  //       [name]: {
  //         light,
  //         dark,
  //       },
  //     };
  //   },
  //   {} as Palette,
  // );

  // let owner = await prisma.themeOwner.findFirst({
  //   where: {
  //     name: "DaisyUI",
  //   },
  // });

  // if (!owner) {
  //   owner = await prisma.themeOwner.create({
  //     data: {
  //       name: "DaisyUI",
  //     },
  //   });
  // }

  // const themesForDb: Omit<Theme, "id" | "createdAt" | "updatedAt">[] =
  //   Object.entries(formattedThemes).map(([name, theme]) => {
  //     return {
  //       visible: true,
  //       themeName: name,
  //       themeOwnerId: owner.id,
  //       themeColors: JSON.stringify(theme),
  //     };
  //   });

  // await prisma.theme.createMany({
  //   data: themesForDb,
  // });

  return NextResponse.json(x, { status: 200 });
}

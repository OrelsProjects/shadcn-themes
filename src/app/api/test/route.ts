import { NextRequest, NextResponse } from "next/server";
import themes from "./themes.json";
import { Palette, ThemePalette } from "@/models/palette";
import { Theme } from "@prisma/client";
import prisma from "@/app/api/_db/db";

export async function GET(req: NextRequest) {
  // Name -> ((light, dark)-> ThemePalette)
  // const formattedThemes: Palette = themes.reduce((acc, theme) => {
  //   const name = theme.name;
  //   // Right now each color is {"h": 0, "s": 0, "l": 0}, I want to convert it to [0, 0, 0]
  //   const dark = Object.keys(theme.config.dark).reduce((acc, key) => {
  //     const value = theme.config.dark[
  //       key as keyof typeof theme.config.dark
  //     ] as { h: number; s: number; l: number };
  //     acc[key] = [value.h, value.s, value.l];
  //     return acc;
  //   }, {} as any);

  //   const light = Object.keys(theme.config.light).reduce((acc, key) => {
  //     const value = theme.config.light[
  //       key as keyof typeof theme.config.light
  //     ] as { h: number; s: number; l: number };
  //     acc[key] = [value.h, value.s, value.l];
  //     return acc;
  //   }, {} as any);

  //   return {
  //     ...acc,
  //     [name]: {
  //       light,
  //       dark,
  //     },
  //   };
  // }, {} as Palette);
  // // Record<ThemeType, ThemePalette>

  // let owner = await prisma.themeOwner.findFirst({
  //   where: {
  //     name: "Random",
  //   },
  // });

  // if (!owner) {
  //   owner = await prisma.themeOwner.create({
  //     data: {
  //       name: "Random",
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

  return NextResponse.json(formattedThemes, { status: 200 });
}

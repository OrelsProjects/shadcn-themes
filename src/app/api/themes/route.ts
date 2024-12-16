import prisma from "@/app/api/_db/db";
import { encrypt } from "@/lib/encryption";
import {
  EncryptedPalette,
  ParsedPalette,
  ThemePalette,
  ThemeType,
} from "@/models/palette";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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
    });

    const encryptedPalette: EncryptedPalette[] = themes.map(theme => {
      const encryptedColors = encrypt(theme.themeColors);
      return {
        id: theme.id,
        name: theme.themeName,
        owner: theme.owner.name,
        iv: encryptedColors.iv,
        encryptedKey: encryptedColors.encryptedKey,
        encryptedColors: encryptedColors.encryptedData,
      };
    });

    return NextResponse.json(encryptedPalette);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

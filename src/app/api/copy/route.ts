import prisma from "@/app/api/_db/db";
import loggerServer from "@/loggerServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { userId, themeId } = body;
    const copy = await prisma.copy.create({
      data: {
        userId,
        themeId,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(copy.id);
  } catch (e: any) {
    loggerServer.error("Failed to add copy report", e);
    return NextResponse.json(
      { error: "Failed to add copy report" },
      { status: 500 },
    );
  }
}
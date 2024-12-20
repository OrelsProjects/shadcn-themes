import prisma from "@/app/api/_db/db";
import loggerServer from "@/loggerServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { themeId, userId } = body;

    await prisma.themeVisit.create({
      data: {
        themeId,
        userId,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    loggerServer.error("Error visiting theme", "", { error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

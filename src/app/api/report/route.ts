import prisma from "@/app/api/_db/db";
import loggerServer from "@/loggerServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { userId, themeId } = body;
    const report = await prisma.report.create({
      data: {
        userId,
        themeId,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(report.id);
  } catch (e: any) {
    loggerServer.error("Failed to report theme", e);
    return NextResponse.json(
      { error: "Failed to report theme" },
      { status: 500 },
    );
  }
}

// In body.comments, update the comment for the report
export async function PATCH(req: NextRequest) {
  const body = await req.json();

  try {
    const { id, comments } = body;
    await prisma.report.update({
      where: {
        id,
      },
      data: {
        comments,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    loggerServer.error("Failed to update report", e);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 },
    );
  }
}

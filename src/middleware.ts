// middleware.ts
import { decrypt } from "@/lib/encryption";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAX_TIME_TO_PROCESS_REQUEST = 30;

export function middleware(req: NextRequest) {
  let requestTimestamp =
    req.headers.get("X-Request-Timestamp") ||
    req.headers.get("x-request-timestamp");
  if (!requestTimestamp) {
    console.log("Header entries: ", req.headers.entries());
    return NextResponse.json(
      { error: "Invalid request, no timestamp" },
      { status: 400 },
    );
  }
  requestTimestamp = decrypt(requestTimestamp);
  const url = req.nextUrl.clone();
  let isValidRequest = false;

  if (requestTimestamp) {
    const requestTime = parseInt(requestTimestamp, 10);
    const currentTime = Date.now();
    const diffInSec = (currentTime - requestTime) / 1000;

    if (diffInSec <= MAX_TIME_TO_PROCESS_REQUEST) {
      isValidRequest = true;
    }
  }
  if (!isValidRequest) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/api/:path*",
};

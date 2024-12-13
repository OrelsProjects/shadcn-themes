import { getStripeInstance } from "@/app/api/_payment/stripe";
import { authOptions } from "@/auth/authOptions";
import loggerServer from "@/loggerServer";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {

    const stripe = getStripeInstance();
    const products = stripe.products.list();

  } catch (error: any) {
    loggerServer.error(
      "Error getting webhook details",
      session?.user?.userId || "Unknown user",
      error,
    );
  }
}

import prisma from "@/app/api/_db/db";
import { getStripeInstance } from "@/app/api/_payment/stripe";
import loggerServer from "@/loggerServer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "Invalid session_id" }, { status: 400 });
  }
  try {
    const stripe = getStripeInstance();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: "Invalid session_id" },
        { status: 400 },
      );
    }

    const userId = session.client_reference_id;
    const productId = session.metadata?.productId;
    const priceId = session.metadata?.priceId;

    if (!userId || !productId || !priceId) {
      return NextResponse.json(
        { error: "Invalid session_id" },
        { status: 400 },
      );
    }

    const product = await getStripeInstance().products.retrieve(productId);
    const price = await getStripeInstance().prices.retrieve(priceId);

    await prisma.payment.create({
      data: {
        sessionId,
        productId,
        priceId,
        productName: product.name,
        status: session.payment_status,
        amountReceived: (price.unit_amount as number) / 100,
        currency: price.currency as string,
        appUser: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.redirect(
      req.nextUrl.origin + `/dashboard?success=true`,
    );
  } catch (error: any) {
    loggerServer.error(
      "Failed to complete subscription",
      "stripe callback",
      error,
    );
    return NextResponse.redirect(req.nextUrl.origin + "/dashboard?error=true");
  }
}


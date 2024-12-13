import { getStripeInstance } from "@/app/api/_payment/stripe";
import { authOptions } from "@/auth/authOptions";
import loggerServer from "@/loggerServer";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const nextUrl = req.nextUrl;
    const { priceId, productId } = await req.json();
    const stripe = getStripeInstance();

    const product = await stripe.products.retrieve(productId);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${nextUrl.origin}/api/stripe/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${nextUrl.origin}/cancel`,
      client_reference_id: session.user.userId,
      customer_email: session.user.email || "",
      metadata: {
        clientName: session.user.name || "",
        productId,
        priceId,
      },
    });
    return NextResponse.json({ sessionId: stripeSession.id }, { status: 200 });
  } catch (error: any) {
    loggerServer.error(
      "Error creating a checkout session",
      session?.user?.userId || "Unknown user",
      error,
    );
    return NextResponse.json(
      { error: "Error creating a checkout session" },
      { status: 500 },
    );
  }
}

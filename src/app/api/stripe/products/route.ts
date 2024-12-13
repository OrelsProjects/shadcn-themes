import { getStripeInstance } from "@/app/api/_payment/stripe";
import loggerServer from "@/loggerServer";
import { Product } from "@/models/payment";
import { NextRequest, NextResponse } from "next/server";

const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

export async function GET(req: NextRequest) {
  try {
    const stripe = getStripeInstance();
    const { data: stripeProducts } = await stripe.products.list();

    const products: Product[] = [];

    const appProducts = stripeProducts
      .filter(stripeProduct => stripeProduct.active)
      .filter(stripeProduct =>
        stripeProduct.metadata.app
          ?.toLowerCase()
          .includes(appName.toLowerCase()),
      );

    for (const stripeProduct of appProducts) {
      const { data: stripePrices } = await stripe.prices.list({
        product: stripeProduct.id,
      });
      stripePrices
        .filter(stripePrice => stripePrice.active && stripePrice.unit_amount)
        // only those that have StripeGuard
        .map(stripePrice => {
          const product: Product = {
            id: stripeProduct.id,
            name: stripeProduct.description || stripeProduct.name,
            priceStructure: {
              id: stripePrice.id,
              currency: stripePrice.currency,
              price: stripePrice.unit_amount! / 100,
              tokens: parseInt(stripeProduct.metadata.tokens),
            },
            noCreditCard: stripeProduct.metadata.noCreditCard === "true",
            features: stripeProduct.marketing_features.map(
              feature => feature.name || "",
            ),
            recommended: stripeProduct.metadata.recommended === "true",
          };
          products.push(product);
        });
    }

    const productsSortedByPrice = products.sort(
      (a, b) => b.priceStructure.price - a.priceStructure.price,
    );

    return NextResponse.json(productsSortedByPrice, { status: 200 });
  } catch (error: any) {
    loggerServer.error("Error getting products", "system", error);
    return NextResponse.json(
      { error: "Error getting products" },
      { status: 500 },
    );
  }
}

import Stripe from "stripe";

export const getStripeInstance = (
  data?:
    | {
        apiKey: string;
        accountId?: string;
      }
    | {
        apiKey?: string;
        accountId: string;
      },
) => {
  const apiVersion = "2024-11-20.acacia";
  if (!data) {
    return new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion });
  }

  const { apiKey, accountId } = data;
  if (accountId) {
    return new Stripe(apiKey || (process.env.STRIPE_SECRET_KEY as string), {
      stripeAccount: accountId,
      apiVersion,
    });
  } else {
    return new Stripe(apiKey as string, { apiVersion });
  }
};

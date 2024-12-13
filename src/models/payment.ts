import Stripe from "stripe";

export type Event = Stripe.Event;
export type WebhookCreationResponse = Stripe.Response<Stripe.WebhookEndpoint>;
export type EnabledEvent = Stripe.WebhookEndpointCreateParams.EnabledEvent;

const paymentIntentEvents: EnabledEvent[] = [
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
];

export const chargeEvents: EnabledEvent[] = [
  "charge.succeeded",
  "charge.failed",
];

export const subscriptionEvents: EnabledEvent[] = [
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

export const invoiceEvents: EnabledEvent[] = [
  "invoice.payment_failed",
  "invoice.payment_succeeded",
];

export const sendAlertToUserEvents: EnabledEvent[] = [
  "charge.succeeded",
  "invoice.payment_succeeded",
  "customer.subscription.created",
  "customer.subscription.updated",
];

export const allEvents: Stripe.WebhookEndpointCreateParams.EnabledEvent[] = [
  ...paymentIntentEvents,
  ...chargeEvents,
  ...subscriptionEvents,
  ...invoiceEvents,
];

export interface PriceStructure {
  id: string;
  price: number;
  tokens: number;
  currency: string;
}

export interface Product {
  id: string;
  name: string;
  noCreditCard?: boolean;
  priceStructure: PriceStructure;
  features: string[];
  recommended?: boolean;
}

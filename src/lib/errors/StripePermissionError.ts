export const StripePermissionErrorName = "StripePermissionError";

export class StripePermissionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "StripePermissionError";
  }
}

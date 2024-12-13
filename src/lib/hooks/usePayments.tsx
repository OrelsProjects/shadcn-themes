import axios from "axios";
import { Logger } from "@/logger";
import { Product } from "@/models/payment";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "@/lib/hooks/redux";
import { setProducts } from "@/lib/features/products/productsSlice";
import { useRef } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function usePayments() {
  const dispatch = useAppDispatch();
  const loadingProducts = useRef(false);

  const getProducts = async () => {
    try {
      if (loadingProducts.current) {
        return;
      }
      loadingProducts.current = true;
      const response = await axios.get<Product[]>("/api/stripe/products");
      dispatch(setProducts(response.data));
      return response.data;
    } catch (error: any) {
      Logger.error("Error getting products", { error });
      throw error;
    } finally {
      loadingProducts.current = false;
    }
  };

  const goToCheckout = async (priceId: string, productId: string) => {
    try {
      const response = await axios.post<{ sessionId: string }>(
        "/api/stripe/checkout",
        { priceId, productId },
      );
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        Logger.error("Error redirecting to checkout", { error });
        throw error;
      }
    } catch (error: any) {
      Logger.error("Error starting checkout", { error });
      throw error;
    }
  };

  return {
    getProducts,
    goToCheckout,
  };
}

import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/models/payment";

export interface ProductsState {
  products: Product[];
}

export const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

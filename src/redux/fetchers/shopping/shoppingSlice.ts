import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingItem {
  productId: string;
  name: string;
  variantId: string;
  variantName: string;
  price: number;
  image: string;
}

export interface CartItem extends ShoppingItem {
  quantity: number;
}

interface ShoppingState {
  cart: CartItem[];
  wishlist: ShoppingItem[];
}

const initialState: ShoppingState = { cart: [], wishlist: [] };

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<ShoppingItem>) => {
      const existing = state.cart.find((item) => item.productId === payload.productId && item.variantId === payload.variantId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
    },
    toggleWishlist: (state, { payload }: PayloadAction<ShoppingItem>) => {
      const index = state.wishlist.findIndex((item) => item.productId === payload.productId);
      if (index >= 0) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(payload);
      }
    },
  },
});

export const { addToCart, toggleWishlist } = shoppingSlice.actions;
export default shoppingSlice.reducer;

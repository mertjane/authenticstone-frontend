import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type CartState = {
  isCartOpen: boolean;
  cartItemCount: number;
};

const initialState: CartState = {
  isCartOpen: false,
  cartItemCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartItemCount: (state, action: PayloadAction<number>) => {
      state.cartItemCount = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { openCart, closeCart, toggleCart, setCartItemCount } = cartSlice.actions;

// Selectors
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isCartOpen;
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.cartItemCount;

export default cartSlice.reducer;
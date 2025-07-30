import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/FilterSlice"
import cartSlice  from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    filters: filterSlice,
    cart: cartSlice
  },
});

// Typescript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

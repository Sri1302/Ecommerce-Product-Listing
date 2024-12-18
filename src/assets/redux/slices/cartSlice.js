// src/assets/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex === -1) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

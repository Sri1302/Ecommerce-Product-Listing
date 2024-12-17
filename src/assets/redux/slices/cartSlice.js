import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Initialize the cart state as an empty array
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload); // Adds the product to the cart
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id); // Removes the product from the cart
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

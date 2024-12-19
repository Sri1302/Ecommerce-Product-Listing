import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [] : [];
};

const saveCartToLocalStorage = (cart, shippingDetails, totalAmount) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    localStorage.setItem(`shippingDetails_${user.id}`, JSON.stringify(shippingDetails));
    localStorage.setItem(`totalAmount_${user.id}`, JSON.stringify(totalAmount));
  }
};

const initialState = {
  cartItems: getCartFromLocalStorage(),
  shippingDetails: {
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },
  totalAmount: 0,
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
      saveCartToLocalStorage(state.cartItems, state.shippingDetails, state.totalAmount);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(state.cartItems, state.shippingDetails, state.totalAmount);
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.cartItems, state.shippingDetails, state.totalAmount);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.shippingDetails = { name: "", address: "", city: "", state: "", zipCode: "" };
      state.totalAmount = 0;
      saveCartToLocalStorage(state.cartItems, state.shippingDetails, state.totalAmount);
    },
    loadCart: (state) => {
      state.cartItems = getCartFromLocalStorage();
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.shippingDetails = JSON.parse(localStorage.getItem(`shippingDetails_${user.id}`)) || state.shippingDetails;
        state.totalAmount = JSON.parse(localStorage.getItem(`totalAmount_${user.id}`)) || 0;
      }
    },
    setShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
      saveCartToLocalStorage(state.cartItems, state.shippingDetails, state.totalAmount);
    },
    calculateTotalAmount: (state) => {
      const total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.totalAmount = total;
      saveCartToLocalStorage(state.cartItems, state.shippingDetails, state.totalAmount);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  loadCart, 
  setShippingDetails, 
  calculateTotalAmount 
} = cartSlice.actions;

export default cartSlice.reducer;

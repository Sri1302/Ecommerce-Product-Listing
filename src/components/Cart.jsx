// src/components/Cart.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../assets/redux/slices/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems) || [];  // Fetch cart items from Redux store
  const dispatch = useDispatch();  // Dispatch function to modify Redux store
  const navigate = useNavigate();  // Initialize navigate hook

  // Calculate total price based on item price and quantity
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle Buy Now logic for individual product
  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item, quantity: item.quantity  } });  // Pass the product details to checkout page
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4 text-lg text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="mt-6">
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                  />
                  <span className="text-lg font-medium">{item.name}</span>
                </div>

                {/* Quantity display */}
                <div className="flex items-center">
                  <span className="text-lg font-medium mr-4">x{item.quantity}</span>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}  // Remove item from cart
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Remove
                  </button>
                  <button
                    onClick={() => handleBuyNow(item)}  // Navigate to checkout with product details
                    className="bg-green-500 text-white px-4 py-2 ml-4 rounded-md hover:bg-green-700"
                  >
                    Buy Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
        <div className="mx-20 my-5  ">
      <button
            onClick={()=>{navigate('/')}}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          > 
            Go to 🏠 page
          </button>
          </div>
    </div>
  );
};

export default Cart;

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../assets/redux/slices/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineAmazon } from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaSun,
  FaMoon,
  FaShoppingCart,
  FaUserCircle,
  FaBoxOpen,
} from "react-icons/fa";
// Placeholder for clearCart action
import { clearCart } from "../assets/redux/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems) || []; // Fetch cart items from Redux store
  const dispatch = useDispatch(); // Dispatch function to modify Redux store
  const navigate = useNavigate(); // Initialize navigate hook
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  // Calculate total price based on item price and quantity
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle Buy Now logic for individual product
  const handleBuyNow = (item) => {
    navigate("/checkout", {
      state: { product: item, quantity: item.quantity },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser(null); // Update user state
    dispatch(clearCart()); // Clear cart items
    navigate("/login"); // Redirect to login page
  };

  const handleAddToCart = () => {
    if (user) {
      navigate("/cart"); // Navigate to cart if user is logged in
    } else {
      navigate("/signup"); // Otherwise, prompt user to log in/sign up
    }
  };

  return (
    <div className="mt-8">
      <header className="max-w-screen-lg mx-auto p-4 shadow-lg border-4 border-blue-500 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Main Flex Container */}
        <div className="flex justify-between items-center">
          {/* Amazon logo with transition effect */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transform transition-all duration-300"
            onClick={() => navigate("/")}
          >
            <AiOutlineAmazon className="text-5xl text-blue-600 hover:text-blue-800 transition-all duration-300" />
            <h1 className="text-4xl font-extrabold text-blue-600 hover:text-blue-800 transition-all transform duration-300">
              Amaz0n
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Add to Cart button for non-logged-in users */}
            {!user && (
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow-lg transform transition-all duration-300 flex items-center gap-2"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            )}

            {/* Account section */}
            {user ? (
              <div className="relative group cursor-pointer flex items-center gap-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md">
                <FaUserCircle className="text-3xl text-white" />
                <div className="text-white font-semibold">
                  <p>Welcome, {user.username || user.email}</p>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 hidden group-hover:block bg-white text-black shadow-xl rounded-md mt-2 w-48 py-2">
                  <button
                    onClick={() => navigate("/cart")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                  >
                    <FaShoppingCart className="mr-2" />
                    My Cart
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                  >
                    <FaBoxOpen className="mr-2" />
                    My Orders
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <br/>
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4 text-lg text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="mt-6">
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3 border-b"
              >
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
                  <span className="text-lg font-medium mr-4">
                    x{item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Remove
                  </button>
                  <button
                    onClick={() => handleBuyNow(item)}
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

      <div className="mx-20 my-5">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Go to 🏠 page
        </button>
      </div>
    </div>
  );
};

export default Cart;

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../assets/redux/slices/cartSlice";
import { FaTrashAlt, FaShoppingCart, FaUserCircle, FaBoxOpen } from "react-icons/fa";
import { AiOutlineAmazon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item, quantity: item.quantity } });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    dispatch(clearCart());
    navigate("/login");
  };

  const handleAddToCart = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="mt-8">
      <header className="max-w-screen-lg mx-auto p-4 shadow-lg border-4 border-blue-500 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transform transition-all duration-300"
            onClick={() => navigate("/")}
          >
            <AiOutlineAmazon className="text-5xl text-blue-600 hover:text-blue-800 transition-all duration-300" />
            <h1 className="text-4xl font-extrabold text-blue-600 hover:text-blue-800">
              Amaz0n
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="text-blue-600 flex items-center gap-2 text-md px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              <FaShoppingCart />
              Cart
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="text-blue-600 flex items-center gap-2 text-md px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              <FaBoxOpen />
              Orders
            </button>
          </div>

          <div className="flex items-center gap-6">
            {!user ? (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
              >
                Add to Cart
              </button>
            ) : (
              <div className="relative group cursor-pointer flex items-center gap-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                <FaUserCircle className="text-xl text-white" />
                <div className="text-white text-sm">
                  <p>Welcome, {user.username || user.email}</p>
                </div>

                <div className="absolute right-0 hidden group-hover:block bg-white text-black shadow-md rounded-md mt-2 py-2">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-200 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mt-6 max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md mb-6 animate-pulse">
       Cart
      </h2>
        {cart.length === 0 ? (
          <p className="mt-4 text-lg text-center text-gray-500">Your cart is empty!</p>
        ) : (
          <div className="mt-4">
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

                  <div className="flex items-center">
                    <span className="text-lg font-medium mr-4">
                      x{item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item))}
                      className="text-red-500 hover:text-red-700 text-sm px-2"
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="bg-green-500 text-white text-sm px-4 py-2 ml-2 rounded-md hover:bg-green-600"
                    >
                      Buy Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-lg font-bold">Total: ${totalPrice.toFixed(2)}</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;

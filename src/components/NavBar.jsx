import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AiOutlineAmazon } from "react-icons/ai"; // Amazon logo icon
import { FaSun, FaMoon, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../assets/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import gif from '../assets/gif.png'
import gif2 from '../assets/gif2.png'
import grs from '../assets/grs.png'
import { MdNavigateNext } from "react-icons/md";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to manage the current image
  const images = [gif,gif2,grs]; // List of images

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Move to the next image
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      } transition-colors`}
    >
      <header className="max-w-screen-lg mx-auto px-4 py-6 flex justify-between items-center">
        {/* Amazon logo with transition effect */}
        <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transform transition-all duration-300">
          <AiOutlineAmazon className="text-5xl text-blue-600 hover:text-blue-800 transition-all duration-300" />
          <h1 className="text-4xl font-extrabold text-blue-600 hover:text-blue-800 transition-all transform duration-300">
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
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "light" ? (
              <FaMoon className="text-xl" />
            ) : (
              <FaSun className="text-xl" />
            )}
          </button>

          {!user && (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow-lg transform transition-all duration-300"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          )}

          {user ? (
            <div className="relative group cursor-pointer flex items-center gap-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md">
              <FaUserCircle className="text-3xl text-white" />
              <div className="text-white font-semibold">
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
          ) : null}
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4 py-6">
        {/* Marquee Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8 shadow-lg flex items-center justify-center">
  <div className="absolute whitespace-nowrap animate-scroll text-2xl font-extrabold tracking-wide py-1">
    <span className="m-4">
      🔥 50% Discount on All Items Purchased! Limited Time Offer! 🔥
    </span>
    <span className="m-4">
      🔥 50% Discount on All Items Purchased! Limited Time Offer! 🔥
    </span>
  </div>
</div>

{/* Image carousel with button to change image */}
<div className="flex justify-center my-6 relative max-w-screen-lg mx-auto">
  <img
    src={images[currentImageIndex]}
    alt="Product"
    className="w-full h-50 object-cover rounded-lg shadow-lg"
  />
  <button
    onClick={nextImage}
    className="absolute top-1/2 left-full ml-4 transform -translate-y-1/2 text-white bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
  >
    <MdNavigateNext size={24}  />
  </button>
</div>


        {/* Main Content */}
        <br />
        <ProductList />
      </main>
    </div>
  );
};

export default NavBar;

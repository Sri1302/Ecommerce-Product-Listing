import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import ProductList from "./components/ProductList";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { AiOutlineAmazon } from "react-icons/ai"; // Amazon logo icon
import { clearCart } from "./assets/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { FaBoxOpen } from "react-icons/fa"

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use Theme Context
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    dispatch(clearCart());
    navigate('/login');
  };

  const handleAddToCart = () => {
    if (user) {
      // Navigate to cart if user is logged in
      navigate("/cart");
    } else {
      // Otherwise, prompt user to log in/sign up
      navigate("/signup");
    }
  };

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"} transition-colors`}
    >
      <header className="max-w-screen-lg mx-auto px-4 py-6 flex justify-between items-center">
        {/* Amazon logo with transition effect */}
        <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transform transition-all duration-300">
          <AiOutlineAmazon className="text-5xl text-blue-600 hover:text-blue-800 transition-all duration-300" />
          <h1 className="text-4xl font-extrabold text-blue-600 hover:text-blue-800 transition-all transform duration-300">
            Amaz0n
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "light" ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
          </button>

          {/* Show Add to Cart button only if the user is not logged in */}
          {!user && (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-md shadow-lg transform transition-all duration-300"
            >
              <FaShoppingCart className="mr-2" />
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
  <FaBoxOpen className="mr-2" /> {/* Changed to a box icon */}
  My Orders
</button>
              </div>
            </div>
          ) : null}
        </div>
      </header>
      <main className="max-w-screen-lg mx-auto px-4 py-6">
        <ProductList />
      </main>
    </div>
  );
};

export default App;

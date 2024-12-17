// src/App.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import ProductList from "../src/components/ProductList"
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaShoppingCart } from "react-icons/fa";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use Theme Context
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      } transition-colors`}
    >
      <header className="max-w-screen-lg mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Shopping App</h1>
        <div className="flex items-center gap-4">
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
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <FaShoppingCart />
            My Cart
          </button>
        </div>
      </header>
      <main className="max-w-screen-lg mx-auto px-4 py-6">
        <ProductList />
      </main>
    </div>
  );
};

export default App;

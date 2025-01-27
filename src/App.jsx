import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import ProductList from "./components/ProductList";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { clearCart } from "./assets/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { FaBoxOpen } from "react-icons/fa"
import NavBar from "./components/NavBar";

const App = () => {
  
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
   <NavBar/>
  );
};

export default App;

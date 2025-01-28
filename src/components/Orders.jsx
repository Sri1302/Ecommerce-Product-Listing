import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineAmazon } from "react-icons/ai";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    dispatch(clearCart());
    navigate("/login");
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

  // Fetch orders and user information from localStorage on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    if (!loggedInUser) {
      console.log("No user found in localStorage");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = savedOrders.filter(
      (order) => order.userId === loggedInUser.id
    );
    setOrders(userOrders);
  }, []);

  // Generate expected delivery date (1-3 days from order date)
  const getExpectedDelivery = (orderDate) => {
    const orderDateObj = new Date(orderDate);
    const randomDays = Math.floor(Math.random() * 3) + 1; // Random between 1-3 days
    orderDateObj.setDate(orderDateObj.getDate() + randomDays);
    return orderDateObj.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
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
        </div>
      </header>
      <br />

      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md mb-6 animate-pulse">
        My Orders
      </h2>

      {user ? (
        <div>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="border-b py-4 mb-4"
                style={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h3 className="text-xl font-semibold mb-2">
                  Order #{index + 1}
                </h3>
                <div className="text-lg font-bold mb-1">
                  Total: $
                  {typeof order.totalAmount === "number"
                    ? order.totalAmount.toFixed(2)
                    : "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                  Ordered on: {new Date(order.date).toLocaleString()}
                </div>
                <div className="mt-2 text-md font-semibold">
                  Expected Delivery: {getExpectedDelivery(order.date)}
                </div>

                {/* Products List */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Products:</h4>
                  <ul className="list-disc pl-6">
                    {order.products?.length > 0 ? (
                      order.products.map((product, prodIndex) => (
                        <li key={prodIndex} className="mb-1">
                          {product.name} - {product.quantity} x $
                          {typeof product.price === "number"
                            ? product.price.toFixed(2)
                            : "N/A"}
                        </li>
                      ))
                    ) : (<li className="text-center text-gray-500 text-lg font-medium py-4">
                      No products available
                    </li>
                    
                    
                    )}
                  </ul>
                </div>

                {/* Shipping Details */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Shipping Address:
                  </h4>
                  {order.shippingDetails ? (
                    <>
                      <p>{order.shippingDetails.name}</p>
                      <p>{order.shippingDetails.address}</p>
                      <p>
                        {order.shippingDetails.city},{" "}
                        {order.shippingDetails.state},{" "}
                        {order.shippingDetails.zipCode}
                      </p>
                    </>
                  ) : (
                    <p>Shipping details not available</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your orders.</p>
      )}
    </div>
  );
};

export default Orders;

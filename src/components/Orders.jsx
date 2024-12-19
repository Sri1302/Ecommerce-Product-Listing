import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  // Fetch orders and user information from localStorage on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    if (!loggedInUser) {
      console.log("No user found in localStorage");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = savedOrders.filter((order) => order.userId === loggedInUser.id);
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
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      <div className="mx-20 my-5">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Go to 🏠 page
        </button>
      </div>

      {user ? (
        <div>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="border-b py-4 mb-4"
                style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "15px", borderRadius: "10px" }}
              >
                <h3 className="text-xl font-semibold mb-2">Order #{index + 1}</h3>
                <div className="text-lg font-bold mb-1">
                  Total: $
                  {typeof order.totalAmount === "number" ? order.totalAmount.toFixed(2) : "N/A"}
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
                          {product.price?.toFixed(2) || "N/A"}
                        </li>
                      ))
                    ) : (
                      <li>No products available</li>
                    )}
                  </ul>
                </div>

                {/* Shipping Details */}
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Shipping Address:</h4>
                  {order.shippingDetails ? (
                    <>
                      <p>{order.shippingDetails.name}</p>
                      <p>{order.shippingDetails.address}</p>
                      <p>
                        {order.shippingDetails.city}, {order.shippingDetails.state},{" "}
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

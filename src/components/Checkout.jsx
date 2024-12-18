import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { clearCart } from "../assets/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

 const Checkout = () => {
  const location = useLocation();
  const { product, quantity } = location.state || {};  // Destructure product and quantity from state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product || quantity === undefined) {
    // Redirect or show error if no product details or quantity is passed
    navigate("/");  // Redirect if no product/quantity is passed
    return <p>Redirecting...</p>;  // Placeholder for redirect or error message
  }

  // Handle place order logic
  const handlePlaceOrder = () => {
    // Typically, here, you would handle the order logic (e.g., API call)
    alert("Order placed successfully!");
    dispatch(clearCart());  // Optionally clear cart after placing the order
    navigate("/");  // Redirect to home or main page
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <div>
        {/* Order Summary */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <ul>
            <li className="flex justify-between py-2 border-b">
              <div>
                <span className="font-medium">{product.name}</span> x{quantity}
              </div>
              <div className="font-bold">${(product.price * quantity).toFixed(2)}</div>
            </li>
          </ul>
          <div className="mt-4 text-lg font-bold">
            Total: ${(product.price * quantity).toFixed(2)}
          </div>
        </div>

        {/* Payment Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Payment</h3>
          <div className="mt-4 flex items-center gap-2">
            <FaCreditCard className="text-xl" />
            <input
              type="text"
              placeholder="Enter your credit card details"
              className="p-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Place Order Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FaShoppingCart />
            Place Order
          </button>
        </div>
      </div>
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


export default Checkout
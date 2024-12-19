import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShippingDetails, calculateTotalAmount } from "../assets/redux/slices/cartSlice";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { clearCart } from "../assets/redux/slices/cartSlice";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingDetails, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotalAmount());
  }, [cartItems, dispatch]);

  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    dispatch(setShippingDetails({ ...shippingDetails, [name]: value }));
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return; // Stripe.js not yet loaded

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address: {
          line1: shippingDetails.address,
          city: shippingDetails.city,
          state: shippingDetails.state,
          postal_code: shippingDetails.zipCode,
        },
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    // Simulate payment success
    if (paymentMethod) {
      console.log("Payment successful!", paymentMethod);

      // Create order object
      const newOrder = {
        userId: JSON.parse(localStorage.getItem("user")).id,
        totalAmount,
        date: new Date().toISOString(),
        products: cartItems,
        shippingDetails,
      };

      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

      // Clear cart and navigate to orders
      dispatch(clearCart());
      navigate("/orders");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold">Checkout</h2>

      {/* Order Summary */}
      <div>
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <div className="mt-4 text-lg font-bold">
          Total: ${totalAmount.toFixed(2)} {/* Display directly in dollars */}
        </div>
      </div>

      {/* Cart Items */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Items</h3>
        <ul className="list-disc pl-6 mt-4">
          {cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span> - {item.quantity} x ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping Address */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        <div className="mt-4">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={shippingDetails.name}
            onChange={handleShippingChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingDetails.address}
            onChange={handleShippingChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingDetails.state}
            onChange={handleShippingChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="zipCode">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingDetails.zipCode}
            onChange={handleShippingChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Payment</h3>
        <form onSubmit={handlePayment}>
          <div className="mt-4">
            <CardElement />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 mt-6"
            disabled={!stripe}
          >
            <FaShoppingCart />
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

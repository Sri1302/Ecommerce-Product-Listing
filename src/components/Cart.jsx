import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../assets/redux/slices/cartSlice";
import { FaTrashAlt } from "react-icons/fa";  // Trash icon for remove button

const Cart = () => {
  const cart = useSelector((state) => state.cart) || [];  // Fetch cart items from Redux store
  const dispatch = useDispatch();  // Dispatch function to modify Redux store

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-4 text-lg text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="mt-6">
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                  />
                  <span className="text-lg font-medium">{item.name}</span>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item))}  // Remove item from cart
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrashAlt className="mr-2" />
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-bold">
            Total: ${cart.reduce((acc, item) => acc + item.price, 0)}  // Calculate total price
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

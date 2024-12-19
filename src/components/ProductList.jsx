import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "../assets/redux/slices/cartSlice";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa"; // Import icons for buttons

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const cart = useSelector((state) => state.cart.cartItems) || []; // Ensure cart is always an array
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://6760fdbb6be7889dc35f683a.mockapi.io/products")
      .then((res) => {
        setProducts(res.data);
        // Initialize quantities based on cart items
        const initialQuantities = res.data.reduce((acc, product) => {
          const cartItem = cart.find(item => item.id === product.id);
          if (cartItem) {
            acc[product.id] = cartItem.quantity;
          } else {
            acc[product.id] = 1; // Default quantity is 1
          }
          return acc;
        }, {});
        setQuantities(initialQuantities);
      })
      .catch((err) => console.log(err));
  }, [cart]); // Dependency on cart to handle changes

  const isInCart = (productId) => {
    return Array.isArray(cart) && cart.some((item) => item.id === productId);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.min(7, Math.max(1, value)) }));
    dispatch(updateQuantity({ id, quantity: Math.min(7, Math.max(1, value)) }));
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Create an array of cart items with their quantities to pass to checkout
    const cartDetails = cart.map(item => ({
      ...item, // Spread product details
      quantity: quantities[item.id] || 1, // Get the quantity from state or default to 1
    }));

    // Navigate to checkout with cart details
    navigate("/checkout", { state: { cartDetails } });
  };

  const increaseQuantity = (productId) => {
    setQuantities((prev) => {
      const newQuantity = (prev[productId] || 1) + 1;
      return { ...prev, [productId]: Math.min(7, newQuantity) };
    });
    dispatch(updateQuantity({ id: productId, quantity: Math.min(7, (quantities[productId] || 1) + 1) }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => {
      const newQuantity = (prev[productId] || 1) - 1;
      return { ...prev, [productId]: Math.max(1, newQuantity) };
    });
    dispatch(updateQuantity({ id: productId, quantity: Math.max(1, (quantities[productId] || 1) - 1) }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          {/* Product Name */}
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

          {/* Product Price */}
          <p className="text-lg font-bold mb-4">${product.price}</p>

          {/* Quantity Selector with + and - buttons */}
          <div className="flex items-center mb-4">
            <label
              htmlFor={`quantity-${product.id}`}
              className="mt-5 text-sm font-medium mr-2"
            >
              Quantity:
            </label>
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="border rounded px-2 py-1 text-xl font-semibold"
            >
              -
            </button>
            <span className="mx-4">{quantities[product.id] || 1}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className="border rounded px-2 py-1 text-xl font-semibold"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center space-x-4">
            {/* Add to Cart / Remove Button */}
            {isInCart(product.id) ? (
              <button
                onClick={() => dispatch(removeFromCart(product))}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center w-full"
              >
                <FaTrashAlt className="mr-2" />
                Remove
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch(
                    addToCart({ ...product, quantity: quantities[product.id] || 1 })
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center w-full"
              >
                <FaCartPlus className="mr-2" />
                Add to Cart
              </button>
            )}

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

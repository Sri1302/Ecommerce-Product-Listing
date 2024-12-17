import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeFromCart } from "../assets/redux/slices/cartSlice";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa"; // Import icons for buttons

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart) || []; // Ensure cart is always an array
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://6760fdbb6be7889dc35f683a.mockapi.io/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-lg font-bold">${product.price}</p>
          
          {/* Add to Cart / Remove from Cart Button */}
          <div className="mt-4 flex justify-between items-center">
            {isInCart(product.id) ? (
              <button
                onClick={() => dispatch(removeFromCart(product))}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors flex items-center"
              >
                <FaTrashAlt className="mr-2" />
                Remove
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition-colors flex items-center"
              >
                <FaCartPlus className="mr-2" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadCart } from "../assets/redux/slices/cartSlice"; // Import loadCart action
import { useDispatch } from 'react-redux';


const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!data.email || !data.password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      // Get all users
      const response = await axios.get('https://6760fdbb6be7889dc35f683a.mockapi.io/users');

      // Check if user exists
      const user = response.data.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (user) {
        console.log('Login Successful', user);
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(loadCart()); // Load the cart for the logged-in user
        navigate('/');
      } else {
        setError('Invalid credentials');
        console.log('Invalid credentials');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

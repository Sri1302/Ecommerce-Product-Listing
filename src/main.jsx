import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from "react-redux";
import { store } from './assets/redux/store.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Checkout from './components/Checkout.jsx';
import Orders from './components/Orders.jsx';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Replace with your Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51QXdEYBD6oeIBWO839AiaJdCeqUKOz3jj4snIzDuN2bBZ8nRRRRFC182SlQ5rUTQY0ewKXRqMcBmLJKibnv1BWEf00YqPKJgAp");

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <ThemeProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />} />
          
          {/* Protect Cart and Checkout Routes */}
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          
          {/* Wrap Checkout Route with Stripe Elements */}
          <Route path='/checkout' element={
            <ProtectedRoute>
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </ProtectedRoute>
          } />
          
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  </Router>
);

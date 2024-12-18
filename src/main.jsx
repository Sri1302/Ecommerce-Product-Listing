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

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <ThemeProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        </Routes>
      </ThemeProvider>
    </Provider>
  </Router>
);

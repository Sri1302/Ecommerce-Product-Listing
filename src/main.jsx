import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  ThemeProvider } from './context/ThemeContext'
import {Provider } from "react-redux"
import { store } from './assets/redux/store.js'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Cart from './components/Cart.jsx'


createRoot(document.getElementById('root')).render(
  <Router>
  <Provider store ={store}>
    <ThemeProvider>
      <Routes>
    <Route path ='/' element= {<App/>} />
    <Route  path ='/cart' element ={<Cart/>} />
    </Routes>
    </ThemeProvider>
    </Provider>
    </Router>
)

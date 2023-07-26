import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'
import { CartProvider } from './context/cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FiltersProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </FiltersProvider>
)

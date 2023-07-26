import { useState } from 'react'
import './App.css'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { useFilters } from './Custom/useFilters';
function App() {
  const [ products ] = useState(initialProducts);
  const { filterProducts } = useFilters();
  return (
    <>
      <Header/>
      <Products products={filterProducts(products)}/>
      <Cart/>
      <Footer/>
    </>
  )
}

export default App

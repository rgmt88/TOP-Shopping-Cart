import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar"
import ProductPage from './ProductPage';

function App() {

  // State to track items in cart
  const [cartCount, setCartCount] = useState(0);
  
  const handleAddToCart = (product, quantity) => {
    // In a real app, you'd store cart items in state or context
    // and update quantity per product. For now, just updating count:
    setCartCount(prev => prev + quantity);
  };

  return (
    <Router>
      <NavBar cartCount={cartCount} />
      <Routes>
        {/* Landing page example */}
        <Route
          path="/"
          element={
            <div style={{ margin: '2rem' }}>
              <h1>Welcome to MyStore</h1>
            </div>
          }
        />

        {/* Electronics page example */}
        <Route
          path="/electronics"
          element={
            <div>
              <h2>Electronics Page</h2>
              {<ProductPage category={ "electronics" } onAddToCart={ handleAddToCart } />}
            </div>
          }
        />

        <Route
          path="/clothing"
          element={
            <div>
              <h2>Clothing Page</h2>
              {<ProductPage category={ "men's clothing" } onAddToCart={ handleAddToCart }/>}
            </div>
          }
        />

        <Route 
          path="/accessories"
          element={<ProductPage category={ "jewelery" } onAddToCart={ handleAddToCart }/>}
        />

        {/* Cart page example */}
        <Route path="/cart" element={<h2>Your Shopping Cart</h2>}/>

        {/* 404 (Not Found) Route */}
        <Route
          path="*"
          element={<h2>404 - Not Found</h2>}
        />
      </Routes>
    </Router>
  )
}

export default App

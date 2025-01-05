import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar"

function App() {

  // State to track items in cart
  const [cartCount, setCartCount] = useState(0);

  // Increment the cart count for demonstration (you'd do this when an item is added)
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
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
              <button onClick={handleAddToCart}>Add to cart</button>
            </div>
          }
        />

        {/* Electronics page example */}
        <Route
          path="/electronics"
          element={<h2>Electronics Page</h2>}
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

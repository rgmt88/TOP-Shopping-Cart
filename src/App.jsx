import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar"
import ProductPage from './ProductPage';

function App() {

  // State to track items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart
  const handleAddToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Update the quantity of the existing item
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add the new item to the cart
        const shortDesc = product.description.slice(0, 60) + '...';
        return [
          ...prevItems,
          {
            id: product.id,
            image: product.image,
            title: product.title,
            shortDesc,
            price: product.price,
            quantity,
          },
        ];
      }
    });
  };

  // Calculate total items in the cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  console.log(cartItems);
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
        <Route
         path="/cart"
         element={
          <div>
            <h2>Your Shopping Cart</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map(item => (
                  <li key={item.id}>
                    <img 
                      src={item.image}
                      alt={item.title}
                      style={{ width: '50px', heigh: '50px' }}
                    />
                    <div>
                      <strong>{item.title}</strong> - ${item.price} x{' '}
                      {item.quantity}
                    </div>
                    <p>{item.shortDesc}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
         }
        />

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

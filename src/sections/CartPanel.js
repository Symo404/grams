// src/sections/CartPanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const CartPanel = () => {
    const { isCartOpen, closeCart, cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart(); // Close the panel
    navigate('/checkout'); // Navigate to the checkout page
  };
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
    <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={closeCart} className="close-btn">&times;</button>
      </div>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                {/* --- NEW: Quantity Controls --- */}
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item.id)} 
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                </div>
              </div>
              <p className="item-price">{(parseFloat(item.price) * item.quantity).toFixed(2)} Dh</p>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} Dh</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Continue to Checkout
          </button>
        </div>
      )}
    </div>
    {isCartOpen && <div className="overlay" onClick={closeCart}></div>}
  </>
  );
};

export default CartPanel;
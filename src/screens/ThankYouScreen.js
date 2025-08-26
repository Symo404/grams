// src/screens/ThankYouScreen.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
 // We'll add styles for this

const ThankYouScreen = () => {
  const location = useLocation();
  const order = location.state?.order; // Safely access the order data

  if (!order) {
    // If someone lands here directly without an order, guide them home
    return (
      <div className="thank-you-container">
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        <Link to="/" className="home-button">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="thank-you-container">
      <h1>Thank You, {order.customerInfo.fullName.split(' ')[0]}!</h1>
      <p>Your order has been successfully placed.</p>
      <p className="order-confirmation-text">A confirmation email has been sent to you.</p>

      <div className="order-summary-box">
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> {order.id}</p>
        {order.orderItems.map(item => (
          <div key={item.id} className="summary-item-ty">
            <span>{item.name} (x{item.quantity})</span>
            <span>{(item.price * item.quantity).toFixed(2)} Dh</span>
          </div>
        ))}
        <hr/>
        <div className="summary-total-ty">
          <strong>Total: {order.totals.total} Dh</strong>
        </div>
      </div>

      <Link to="/" className="home-button">Continue Shopping</Link>
    </div>
  );
};

export default ThankYouScreen;
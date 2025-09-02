// src/screens/CheckoutScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../sections/Footer';
import emailjs from '@emailjs/browser';
import { message } from 'antd';

const CheckoutScreen = () => {
    const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    state: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // --- NEW: Generic handler for all text inputs ---
  const handleChange = (e) => {
    const { id, value } = e.target; // Use 'id' to match our state keys
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  // --- 1. VALIDATE AND PREPARE DATA ---
  // Ensure every item in the cart has a valid price before proceeding
  for (const item of cartItems) {
    if (item.price === undefined || item.price === null) {
      message.error(`Product "${item.name}" is missing a price. Cannot proceed.`);
      setIsProcessing(false);
      return;
    }
  }

  const totals = {
    subtotal: subtotal.toFixed(2),
    shipping: shippingCost.toFixed(2),
    total: total.toFixed(2),
  };
  
  const orderDetails = {
      customerInfo: formData,
      orderItems: cartItems,
      totals: {
        subtotal: subtotal.toFixed(2),  // Send as string
        shipping: shippingCost,       // Send as number
        total: total.toFixed(2)         // Send as string
      }
    };

  const productsToUpdate = cartItems.filter(item => typeof item.id === 'number');

  // --- 2. EXECUTE THE TRANSACTIONAL FLOW ---
   try {
      // Step 1: Save the order to your backend
      const orderResponse = await axios.post('/api/orders', orderDetails);
      const newOrderId = orderResponse.data.orderId;
      console.log('Order saved to DB with ID:', newOrderId);

    // STEP B: Send the confirmation email
    const orderItemsHTML = cartItems.map(item => 
        `<p style="margin: 5px 0;">${item.name} (x${item.quantity}) - <strong>${(parseFloat(item.price) * item.quantity).toFixed(2)} Dh</strong></p>`
      ).join('');
    const templateParams = {
        // --- Customer & Order Info ---
        order_id: newOrderId,
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        customer_address: formData.address,
        customer_city: formData.city,
        customer_state: formData.state,
        customer_zip: formData.zip,
        
        // --- Order Details ---
        order_items: orderItemsHTML, // The formatted HTML string of items
        shipping_method: shippingOptions[selectedShipping].label,
        
        // --- Totals ---
        subtotal: `${orderDetails.totals.subtotal} Dh`,
        shipping_cost: shippingCost === 0 ? 'Free' : `${orderDetails.totals.shipping} Dh`,
        total_price: `${orderDetails.totals.total} Dh`,
      };
     await emailjs.send('service_sb61i9y', 'template_c58qczb', templateParams, '_MAPT6u2x17ZgW8Tf');
      console.log('EMAIL SUCCESS!');

    // STEP C: Update the product stock
    const productsToUpdate = cartItems.filter(item => typeof item.id === 'number');
      if (productsToUpdate.length > 0) {
        const stockUpdatePayload = { cartItems: productsToUpdate.map(item => ({ id: item.id, quantity: item.quantity })) };
        await axios.post('/api/products/update-stock', stockUpdatePayload);
        console.log('Stock updated successfully.');
      }

    // STEP D: Finalize UI
    clearCart();
    navigate('/thank-you', { state: { order: orderDetails } });

  } catch (error) {
    console.error("Checkout process failed:", error.response?.data || error.message || error);
    message.error(error.response?.data?.message || "There was a problem processing your order.");
  } finally {
    setIsProcessing(false);
  }
};

  // Shipping options: key, label, price
  const shippingOptions = {
    standard: { label: 'Standard Processing and Shipping (5-8 Business Days)', price: 0 },
    expedited: { label: 'Premium Processing with Expedited Shipping (3-6 Business Days)', price: 40 },
  };

  const [selectedShipping, setSelectedShipping] = useState('standard'); // Default to standard

  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const shippingCost = shippingOptions[selectedShipping].price;
  const total = subtotal + shippingCost;

  

  return (
    <>
       <form className="checkout-page-container" onSubmit={handleSubmit}>
      <div className="checkout-page-container">
        {/* Left Side: Order Summary */}
        <div className="order-summary-side">
          <button onClick={() => navigate(-1)} className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          
          <div className="summary-content">
            <h1 className="summary-title">Pay Grams Coffee.</h1>
            <div className="summary-main-total">{total.toFixed(2)} Dh</div>
            
            <div className="summary-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p className="summary-item-price">{(parseFloat(item.price) * item.quantity).toFixed(2)} Dh</p>
                </div>
              ))}
            </div>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} Dh</span>
              </div>
              <div className="breakdown-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `${shippingCost.toFixed(2)} Dh`}</span>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} Dh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Shipping and Payment */}
        <div className="shipping-side">
            <div className="form-section">
              <h2 className="form-section-title">Shipping informations</h2>
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input type="tel" id="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="fullName">Shipping Address</label>
                <input type="text" id="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input type="text" id="address" placeholder="Street Address" className="mt-1" value={formData.address} onChange={handleChange} required />
                <div className="input-row mt-1">
                  <input type="text" id="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                  <input type="text" id="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required />
                </div>
                <input type="text" id="state" placeholder="State" className="mt-1" value={formData.state} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-section">
              <h2 className="form-section-title">Shipping Method</h2>
              <div className="radio-group">
                  {Object.keys(shippingOptions).map(key => (
                      <div key={key} className="radio-option">
                          <input type="radio" id={key} name="shipping" value={key} checked={selectedShipping === key} onChange={(e) => setSelectedShipping(e.target.value)} />
                          <label htmlFor={key}>
                              <span className="radio-label-text">{shippingOptions[key].label}</span>
                              <span className="radio-label-price">{shippingOptions[key].price === 0 ? 'Free' : `${shippingOptions[key].price.toFixed(2)} DH`}</span>
                          </label>
                      </div>
                  ))}
              </div>
          </div>
            <div className="form-section">
              <h2 className="form-section-title">Payment Method</h2>
              <div className="radio-group">
                <div className="radio-option">
                   <input type="radio" id="cash" name="payment" value="cash" defaultChecked/>
                   <label htmlFor="cash">Pay in Cash</label>
                </div>
              </div>
            </div>

            <button type="submit" className="pay-btn" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay'}
            </button>
            <p className="terms-text">
              By confirming your payment, you allow Grams Coffee. LLC to charge you for this payment and future payments in accordance with their terms. By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
    
        </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default CheckoutScreen;
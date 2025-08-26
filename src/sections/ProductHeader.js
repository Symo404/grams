import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT
import { useCart } from '../context/CartContext'; // <-- IMPORT

const ProductHeader = ({ product }) => {
  // --- ALL HOOKS MUST BE DECLARED AT THE TOP ---
  const [mainImage, setMainImage] = useState('');
  const [activeColor, setActiveColor] = useState(null);
  const { addToCart, openCart } = useCart();
  const navigate = useNavigate();

  // --- USEEFFECT FOR SIDE EFFECTS ---
  // This effect safely updates state when the `product` prop arrives from the API call.
  useEffect(() => {
    if (product) {
      // --- FIX: Use snake_case keys from the API ---
      setMainImage(product.gallery_images && product.gallery_images.length > 0 ? product.gallery_images[0] : product.image || '');
      setActiveColor(product.colors && product.colors.length > 0 ? product.colors[0].name : null);
    }
  }, [product]);

  if (!product) {
    return <div className="product-header-container loading">Loading...</div>;
  }// This effect re-runs only when the product object changes

  // --- HELPER FUNCTIONS ---
  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  // --- CONDITIONAL RETURN FOR LOADING STATE ---
  // This now happens AFTER all hooks have been declared.
  if (!product) {
    return <div className="product-header-container loading">Loading product details...</div>;
  }

  return (
    <div className="product-header-container">
      {/* Left Column remains the same */}
      <div className="product-info-left">
        {/* ... (all the code for the left column) ... */}
        <h1>{product.name ? product.name.toUpperCase() : 'Loading...'}</h1>
        
        <div className="details-section">
          <h3>Product Details:</h3>
           <ul>
            {/* --- FIX: Check for product.details --- */}
            {product.details && product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="shipping-note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <p>{product.shipping_note}</p>
        </div>

        <div className="action-buttons">
          <div className="price-display">{product.price} Dh</div>
          <button className="cart-btn" aria-label="Add to cart" onClick={handleAddToCart}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            <span>Buy Now</span>
            <span className="arrow-icon">↗</span>
          </button>
        
        </div>
      </div>

      {/* Right Column: Image Gallery (Updated Structure) */}
      <div className="product-gallery-right">
        
        {/* New wrapper for Main Image + Color Swatches */}
        <div className="image-swatch-wrapper">
          <div className="main-image-container">
            <img src={mainImage} alt="Main product view" />
          </div>

          {product.colors && product.colors.length > 0 && (

    <div className="color-swatches">
        {/* 
            This is the key part. The .map() function will run
            for every item inside the specific product's "colors" array.
            - If the array has 3 items, it runs 3 times.
            - If the array has 2 items, it runs 2 times.
            - If the array is empty, it runs 0 times and nothing is rendered.
        */}
        {product.colors.map((color) => (
            <div
                key={color.name}
                className={`swatch ${activeColor === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setActiveColor(color.name)}
                title={color.name}
            ></div>
        ))}
    </div>
)}
        </div>
        
        {/* Thumbnail gallery remains below the new wrapper */}
        {product.gallery_images && product.gallery_images.length > 0 && (
          <div className="thumbnail-gallery">
            {product.gallery_images.map((image, index) => (
              <div key={index} className={`thumbnail ${mainImage === image ? 'active' : ''}`} onClick={() => setMainImage(image)}>
                <img src={`http://localhost:5000${image}`} alt={`Product thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
    
  );
};

export default ProductHeader;
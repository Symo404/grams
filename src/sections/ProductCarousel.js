import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-main-image" />
        <div className="product-price-tag">{parseFloat(product.price).toFixed(2)} Dh</div>
      </div>
      <div className="product-caption">
        <span className="product-name">{product.name}</span>
        <span className="arrow-icon">↗</span>
      </div>
    </Link>
  </div>
);

const ProductCarousel = ({ title, products }) => {
  const carouselRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- REMOVED: No more `itemsPerPage` or `totalPages` logic needed for this scroll method ---
  // We can add it back later if a "snap-to-page" feature is desired.

  const handleScroll = (direction) => {
    // --- FIX: Calculate scrollAmount INSIDE the handler ---
    if (carouselRef.current) {
      // scroll by 80% of the visible width for a nice "page" effect
      const scrollAmount = carouselRef.current.clientWidth * 0.8; 
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
      // The pagination logic below is more complex, we'll simplify the button disabling for now
    }
  };
  
  // A small effect to reset the scroll position if the product list changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [products]);


  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="product-carousel-section">
      <div className="carousel-header">
        <div className="carousel-title">
          <h2>{title}</h2>
        </div>
        
        {/* Simplified navigation for now. The buttons are always enabled. */}
        <div className="carousel-navigation">
          <div className="nav-buttons-group">
            <button
              className="nav-arrow"
              onClick={() => handleScroll(-1)}
            >
              &larr;
            </button>
            <button
              className="nav-arrow"
              onClick={() => handleScroll(1)}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
      <div className="carousel-wrapper">
        <div className="product-carousel" ref={carouselRef}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
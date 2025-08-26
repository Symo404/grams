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

  const itemsPerPage = 4;
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  const handleScroll = (direction) => {
    const newPage = currentPage + direction;
    if (newPage > 0 && newPage <= totalPages && carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * direction;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentPage(newPage);
    }
  };
  
  // A small effect to reset the scroll position if the product list changes (e.g., due to filtering)
  useEffect(() => {
      if (carouselRef.current) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentPage(1);
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
          <span className="filter-icon">&#9776;</span>
          
        </div>
        
        <div className="carousel-navigation">
          <span className="pagination-display">{currentPage}/{totalPages}</span>
          <div className="nav-buttons-group">
            <button
              className="nav-arrow"
              onClick={() => handleScroll(-1)}
              disabled={currentPage === 1}
            >
              &larr;
            </button>
            <button
              className="nav-arrow"
              onClick={() => handleScroll(1)}
              disabled={currentPage === totalPages}
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
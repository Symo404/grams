import React from 'react';
import { Link } from 'react-router-dom';
// 1. Import your product images
import potsImage from '../assets/images/pots.png';
import coffeePacksImage from '../assets/images/coffee-packs.png';
import equipmentsImage from '../assets/images/equipments.png';
import productPacksImage from '../assets/images/product-packs.png';

const StoreSection = () => {
  const storeItems = [
    {
      id: 1,
      image: potsImage,
      caption: 'GRAMS Pots',
      gridClass: 'item-tall', // For CSS Grid layout
    },
    {
      id: 2,
      image: coffeePacksImage,
      caption: 'GRAMS coffee packs',
      gridClass: 'item-normal',
    },
    {
      id: 3,
      image: equipmentsImage,
      caption: 'GRAMS coffee equipements',
      gridClass: 'item-tall',
    },
    {
      id: 4,
      image: productPacksImage,
      caption: 'GRAMS product packs',
      gridClass: 'item-normal',
    },
  ];

  return (
    <div className="store-section-container">
      <h2 className="store-title">Store Collections</h2>
      <div className="store-grid">
        {storeItems.map((item) => (
          <div key={item.id} className={`store-item ${item.gridClass}`}>
            <img src={item.image} alt={item.caption} className="store-item-image" />
             <Link to="/store" className="store-item-caption">
              <span>{item.caption}</span>
              <span className="arrow-icon">↗</span>
            </Link>
          </div>
        ))}
        {/* "Check out the store" link block */}
        <div className="store-item checkout-card">
          <div className="checkout-text">
            Check out the store
          </div>
          <Link to="/store" className="checkout-link">
          <span>From here</span>
          <span className="arrow-icon">↗</span>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
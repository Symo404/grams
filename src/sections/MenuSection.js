import React from 'react';
import { Link } from 'react-router-dom'; 
// 1. Import your menu item images
import espressoImage from '../assets/images/espresso-drinks.png';
import blackCoffeeImage from '../assets/images/black-coffee.png';
import creamCoffeeImage from '../assets/images/cream-coffee.png';
import matchaTeaImage from '../assets/images/matcha-tea.png';
import mochaImage from '../assets/images/mocha.png';

const MenuSection = () => {
  // 2. Define menu items with a specific gridClass for styling
  const menuItems = [
    {
      id: 1,
      image: espressoImage,
      caption: 'Espresso Drinks',
      gridClass: 'item-tall', // This will be the taller item
    },
    {
      id: 2,
      image: blackCoffeeImage,
      caption: 'Black Coffee',
      gridClass: 'item-normal',
    },
    {
      id: 3,
      image: matchaTeaImage,
      caption: 'Matcha & Tea',
      gridClass: 'item-normal',
    },
    {
      id: 4,
      image: creamCoffeeImage,
      caption: 'Cream Coffee',
      gridClass: 'item-tall',
    },
    {
      id: 5,
      image: mochaImage,
      caption: 'Mocha',
      gridClass: 'item-normal',
    },
  ];

  return (
    <div className="menu-section-container">
      <h2 className="menu-title">Menu Collections</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className={`menu-item ${item.gridClass}`}>
            <img src={item.image} alt={item.caption} className="menu-item-image" />
            <Link to="/menu" className="menu-item-caption">
              <span>{item.caption}</span>
              <span className="arrow-icon">↗</span>
            </Link>
          </div>
        ))}
        {/* "Check out the Menu" link block, placed last for grid auto-flow */}
        <div className="menu-item checkout-card-menu">
           <div className="checkout-text">
            Check out the Menu
          </div>
          <Link to="/menu" className="checkout-link">
            <span>From here</span>
            <span className="arrow-icon">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
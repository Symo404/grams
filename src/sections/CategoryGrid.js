import React from 'react';

// --- 1. Define the static data for the grid ---
// The `targetId` must exactly match the ID we will give to the sections in MenuScreen.js
const categories = [
  // --- MODIFIED: `className` now matches the grid-area name ---
  { id: 1, title: 'COFFEE DRINKS', image: '/images/categories/coffee-drinks.png', className: 'coffee-drinks', targetId: 'category-coffee-drinks' },
  { id: 2, title: 'COLD COFFEE DRINKS', image: '/images/categories/cold-coffee.png', className: 'cold-coffee', targetId: 'category-cold-coffee-drinks' },
  { id: 3, title: 'BALANCED POKES', image: '/images/categories/pokes.png', className: 'pokes', targetId: 'category-balanced-pokes' },
  { id: 4, title: 'FILTRED COFFEE', image: '/images/categories/filtred-coffee.png', className: 'filtred-coffee', targetId: 'category-filtred-coffee' },
  { id: 5, title: 'NO COFFEE DRINKS', image: '/images/categories/no-coffee.png', className: 'no-coffee', targetId: 'category-no-coffee-drinks' },
];


const CategoryGrid = () => {

  // --- 2. The scroll-to-section function ---
  const handleCategoryClick = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Align the top of the element to the top of the viewport
      });
    }
  };

  return (
    <div className="category-grid-container">
      {categories.map(cat => (
        <div 
          key={cat.id} 
          className={`category-item ${cat.className}`}
          onClick={() => handleCategoryClick(cat.targetId)}
        >
          <img src={cat.image} alt={cat.title} className="category-image" />
          <div className="category-overlay"></div>
          <h3 className="category-title">{cat.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
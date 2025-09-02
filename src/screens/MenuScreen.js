import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import AiSuggestModal from '../components/AiSuggestModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faFire } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

// --- COMPONENT DEFINITIONS ---
// These components don't need to change. They just receive data.

const backendUrl = 'http://localhost:5000';

const MenuGridCard = ({ product }) => (
  <div className="menu-grid-card">
    <div className="grid-card-image">
      <img src={`${backendUrl}${product.main_image}`} alt={product.name} />
    </div>
    <div className="grid-card-caption">
      <span>{product.name}</span>
      <div className="temp-icons">
        {product.tags && product.tags.includes('cold') && <FontAwesomeIcon icon={faSnowflake} title="Cold" />}
        {product.tags && product.tags.includes('hot') && <FontAwesomeIcon icon={faFire} title="Hot" />}
      </div>
    </div>
  </div>
);

const CardLinkWrapper = ({ product, children }) => (
  <Link to={`/menu/${product.id}`} className="menu-grid-card-link">
    <div className="card-hover-wrapper">
      <div className="card-hover-overlay">
        <span>View Details</span>
      </div>
      {children}
    </div>
  </Link>
);


// --- MAIN SCREEN COMPONENT ---
const MenuScreen = () => {
  // --- 1. STATE MANAGEMENT ---
  const [allMenuDrinks, setAllMenuDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDrinkId, setActiveDrinkId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('highlighted');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const carouselRef = useRef(null);
  const filterRef = useRef(null);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);
  
  // --- 2. DATA FETCHING & EFFECTS ---
useEffect(() => {
    const fetchMenuDrinks = async () => {
      setIsLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get('/api/menu-drinks');
        setAllMenuDrinks(response.data);
      } catch (error) {
        console.error("Failed to fetch menu drinks:", error);
      } finally {
        setIsLoading(false); // Set loading to false when fetching ends
      }
    };
    fetchMenuDrinks();
  }, []);

  // --- 3. MEMOIZED DATA DERIVATION ---
  const highlightedDrinks = useMemo(() => allMenuDrinks.filter(p => p.tags && p.tags.includes('highlighted')), [allMenuDrinks]);
  
  const activeDrink = useMemo(() => allMenuDrinks.find(drink => drink.id === activeDrinkId), [activeDrinkId, allMenuDrinks]);

  
  useEffect(() => {
    if (highlightedDrinks.length > 0 && !activeDrinkId) {
      setActiveDrinkId(highlightedDrinks[0].id);
    }
  }, [highlightedDrinks, activeDrinkId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) { document.addEventListener('mousedown', handleClickOutside); }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isFilterOpen]);

  const gridFilteredProducts = useMemo(() => {
    let products = [...allMenuDrinks];
    if (activeFilter !== 'all') { products = products.filter(p => p.tags && p.tags.includes(activeFilter)); }
    if (searchTerm) { products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())); }
    return products;
  }, [searchTerm, activeFilter, allMenuDrinks]);

  const { categories, productsByCategory } = useMemo(() => {
    const groupedProducts = allMenuDrinks
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((acc, product) => {
        const category = product.category;
        if (category && category !== 'Highlighted drinks') {
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
        }
        return acc;
    }, {});
    const categoryNames = Object.keys(groupedProducts).sort();
    return { categories: categoryNames, productsByCategory: groupedProducts };
  }, [allMenuDrinks, searchTerm]);
  
  // --- 4. HELPER FUNCTIONS & CONSTANTS ---
  const handleIconClick = (id) => { setActiveDrinkId(id); };
  const handleFilterSelect = (filterKey) => { setActiveFilter(filterKey); setIsFilterOpen(false); };
  const scrollCarousel = (direction) => { if (carouselRef.current) { carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' }); } };
  const filterOptions = [ /* ... */ ];
  
  // --- 5. CONDITIONAL LOADING RENDER ---
  if (isLoading) {
    return <div>Loading menu...</div>;
  }

  // --- 5. MAIN RENDER ---
  return (
    <>
      <Navbar />
      
      {/* Only render the hero section if there is an active drink to display */}
      {activeDrink && (
        <div className='menu-container-container '>
       <div className="menu-screen-container">
        {/* New wrapper for the left side */}
        <div className="menu-left-column">
          <div key={activeDrink.id} className="menu-text-content">
            <h1>{activeDrink.name}</h1>
           
            
            <h2>{activeDrink.tagline}</h2>
            <h3>{activeDrink.subheading}</h3>
           
            <p>{activeDrink.description}</p>
            
            <div className="options-container">
              <div className="options-list">
                <h4>Options:</h4>
                <ul>
                  {activeDrink.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
              <div className="options-list">
                <h4>Supplements:</h4>
                <ul>
                  {activeDrink.supplements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* New wrapper for the right side */}
        <div className="menu-right-column">
            {/* --- FIX: Use snake_case for main_image --- */}
            <img key={activeDrink.id + '-image'} src={activeDrink.main_image} alt={activeDrink.name} className="main-drink-image"/>
            <div className="menu-icon-nav">
              {highlightedDrinks.map(drink => (
                <div key={drink.id} className={`nav-icon ${drink.id === activeDrinkId ? 'active' : ''}`} onClick={() => handleIconClick(drink.id)}>
                  {/* --- FIX: Use snake_case for menu_icon --- */}
                  <img src={drink.menu_icon} alt={`${drink.name} icon`} />
                </div>
              ))}
            </div>
          </div>

      </div>
      </div>
      )}
      
      <div className="menu-listing-container">
        <header className="menu-listing-header">
          <div className="listing-header-title">
            <div className="filter-container" ref={filterRef}>
              <h2>Highlighted drinks</h2>
              <span className="filter-icon" onClick={() => setIsFilterOpen(!isFilterOpen)}>&#9776;</span>
              {isFilterOpen && (
                <ul className="filter-dropdown-list">
                  {filterOptions.map(option => (
                    <li key={option.key} className={activeFilter === option.key ? 'active' : ''} onClick={() => handleFilterSelect(option.key)}>
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="search-and-nav">
            {/* --- NEW: AI Suggestion Button --- */}
            <div>
            <Button className='ai-suggestion-button' onClick={() => setIsAiModalVisible(true)}>AI Drink Suggestion</Button>
            </div>
          <div className="search-bar-container">
            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <span className="search-icon">&#9906;</span>
          </div>
          </div>
        </header>

        <div className="carousel-wrapper">
          <button onClick={() => scrollCarousel(-1)} className="carousel-nav-arrow prev">&larr;</button>
          <div className="highlighted-carousel" ref={carouselRef}>
            {gridFilteredProducts.length > 0 ? (
                gridFilteredProducts.map(product => (
                  <CardLinkWrapper key={product.id} product={product}>
                    <MenuGridCard product={product} />
                  </CardLinkWrapper>
                ))
            ) : ( <p className="no-results-message">No drinks match your filter.</p> )}
          </div>
          <button onClick={() => scrollCarousel(1)} className="carousel-nav-arrow next">&rarr;</button>
        </div>

          {categories.map(category => (
          <section key={category} className="static-category-section">
            <div className="static-grid-header"><h2>{category}</h2></div>
            <div className="static-product-grid">
              {productsByCategory[category].map(product => (
                <CardLinkWrapper key={product.id} product={product}>
                  <MenuGridCard product={product} />
                </CardLinkWrapper>
              ))}
            </div>
          </section>
        ))}
      </div>
      <AiSuggestModal
        visible={isAiModalVisible}
        onClose={() => setIsAiModalVisible(false)}
        menuDrinks={allMenuDrinks} // Pass the full list of drinks
      />
      <Footer />
    </>
  );
};

export default MenuScreen;
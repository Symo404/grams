import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import StoreHero from '../sections/StoreHero';
import ProductCarousel from '../sections/ProductCarousel';
import CtaSection from '../sections/CtaSection';

const StoreScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setAllProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch store products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- NEW: Filter for only available products ---
  // This derived constant will only contain products where `availability` is true.
  const availableProducts = allProducts.filter(product => product.availability === true);

  const categories = ['Best Sellers', 'Grams Pots', 'Grams Tools', 'Grams Coffee'];

  if (isLoading) {
    return (
        <>
            <Navbar />
            <main className="store-page-content">
                <StoreHero />
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading products...</div>
            </main>
            <Footer />
        </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="store-page-content">
        <StoreHero />
        
        {/* Loop through categories and render a carousel for each */}
        {categories.map(category => {
          // --- MODIFIED: Use the new `availableProducts` list for filtering ---
          const categoryProducts = availableProducts.filter(p => p.category === category);
          
          return (
            <ProductCarousel 
              key={category}
              title={category}
              products={categoryProducts}
            />
          );
        })}
      </main>
      <CtaSection />
      <Footer />
    </>
  );
};

export default StoreScreen;
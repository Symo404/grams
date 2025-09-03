import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

// Import all your screens
import HomeScreen from './screens/HomeScreen';
import StoreScreen from './screens/StoreScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import { CartProvider } from './context/CartContext';
import ThankYouScreen from './screens/ThankYouScreen';
import MenuScreen from './screens/MenuScreen';
import DrinkDetailScreen from './screens/DrinkDetailScreen';
import BlogScreen from './screens/BlogScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import OurBrandScreen from './screens/OurBrandScreen'; 
import FranchiseScreen from './screens/FranchiseScreen';
import CareersScreen from './screens/CareersScreen'
import ComingSoonScreen from './screens/ComingSoonScreen';

import './App.css';

function App() {
  return (
    // Wrap the entire application in BrowserRouter
    <BrowserRouter>
      <div className="App">
        {/* The Routes component manages the routing logic */}
        <CartProvider>
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<HomeScreen />} />

          {/* Route for the Store page */}
          <Route path="/store" element={<StoreScreen />} />

          {/* Route for a single Product Detail page */}
          <Route path="/product/:productId" element={<ProductDetailScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/thank-you" element={<ThankYouScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/menu/:drinkId" element={<DrinkDetailScreen />} />
          <Route path="/blog" element={<BlogScreen />} /> {/* <-- ADD THIS */}
          <Route path="/blog/:blogId" element={<BlogDetailScreen />} /> 
          <Route path="/our-brand" element={<OurBrandScreen />} />
           <Route path="/franchise" element={<FranchiseScreen />} /> {/* <-- ADD ROUTE */}
           <Route path="/carrers" element={<CareersScreen />} /> {/* <-- ADD ROUTE */}
           <Route path="/subscription" element={<ComingSoonScreen />} />
            <Route path="/loyalty" element={<ComingSoonScreen />} />
            <Route path="/comingsoon" element={<ComingSoonScreen />} />
        </Routes>
        </CartProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
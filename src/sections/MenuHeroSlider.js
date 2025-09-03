import React, { useState, useEffect, useRef } from 'react';

// --- Static data for the slider ---
const slidesData = [
  {
    id: 1,
    title: "Coffee Drinks",
    subtitle: "Lifestyle-Oriented",
    description: "Savor every sip. Specialty drinks crafted for coffee lovers.",
    image: "/images/menu-hero/hero-1.png"
  },
  {
    id: 2,
    title: "Filter Coffee",
    subtitle: "Naturally-Sourced",
    description: "Vibrant, healthy blends made from the freshest ingredients.",
    image: "/images/menu-hero/hero-2.png"
  },
  {
    id: 3,
    title: "Hot Coffee Drinks",
    subtitle: "Calm & Comfort",
    description: "A curated selection of teas to soothe and inspire your moment.",
    image: "/images/menu-hero/hero-3.png"
  },
  {
    id: 4,
    title: "Balenced Pokes",
    subtitle: "Perfectly Paired",
    description: "Delicious pastries and sweets to complement your favorite drink.",
    image: "/images/menu-hero/hero-4.png"
  }
];

const MenuHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Automatic transition logic
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesData.length);
    }, 5000); // Change slide every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDotClick = (index) => {
    // Stop auto-play on user interaction
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentSlide(index);
  };

  return (
    <div className="menu-hero-slider-container">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          // --- FIX 1: Corrected className syntax ---
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          // --- FIX 2: Corrected backgroundImage syntax ---
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <h1 className="slide-title">{slide.title}</h1>
            <div className="slide-text">
              <h2>{slide.subtitle}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
      {/* --- FIX 3: This was outside the main map function --- */}
      <div className="slider-dots-container">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuHeroSlider;
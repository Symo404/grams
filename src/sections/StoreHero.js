import React, { useState } from 'react';

const slides = [
  {
    title: <>Refined Coffee<br/>Essentials</>, // Using a fragment to allow <br>
    subtitle: 'WITH GRAMS',
    image: '/images/hero/slide-1.png', 
  },
  {
    title: <>Discover Our<br/>New Blends</>,
    subtitle: 'Freshly Roasted',
    image: '/images/hero/slide-2.png',
  },
  {
    title: <>Perfect Your<br/>Morning Ritual</>,
    subtitle: 'With Our Equipment',
    image: '/images/hero/slide-3.png',
  },
];

const StoreHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    // This container is the positioning parent
    <div className="store-hero-container">
      
      {/* Background Image */}
      <img 
        src={slides[currentSlide].image} 
        alt={slides[currentSlide].subtitle} 
        className="hero-background-image"
      />

      {/* Optional: Adds a slight fade to make text pop */}
      <div className="hero-overlay"></div>

      {/* Text content positioned on top */}
      <div className="store-hero-text">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].subtitle}</p>
      </div>

      {/* Slider dots positioned on top */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default StoreHero;
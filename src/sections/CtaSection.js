import React from 'react';
import brandLogo from '../assets/logo/logo-white.png';
// 1. Import your background image
import cafeSpaceImage from '../assets/images/cafe-space.png';

const CtaSection = () => {
  return (
    // The main container sets the background image and positioning context
    <div 
      className="cta-container" 
      style={{ backgroundImage: `url(${cafeSpaceImage})` }}
    >
      {/* A subtle overlay to make the text more readable */}
      <div className="cta-overlay"></div>

      {/* Text content positioned on the bottom-left */}
      <div className="cta-text">
        <h2>Your Daily Escape</h2>
        <p>A cozy, modern café space designed for comfort, connection, and great coffee.</p>
      </div>

      {/* Logo positioned on the bottom-right */}
      <div className="cta-logo">
      <img src={brandLogo} alt="Grams Coffee Logo" />
      </div>
    </div>
  );
};

export default CtaSection;
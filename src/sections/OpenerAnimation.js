// src/sections/OpenerAnimation.js
import React, { useState, useEffect } from 'react';
import yourLogo from '../assets/logo/logo-white.png'; // Make sure you have a white version of your logo

const OpenerAnimation = ({ onFinished }) => {
  const [phase, setPhase] = useState('entering'); // "entering" -> "visible" -> "splitting"

  useEffect(() => {
    // Sequence of the animation
    const timer1 = setTimeout(() => setPhase('visible'), 500); // Logo becomes visible
    const timer2 = setTimeout(() => setPhase('splitting'), 2000); // Panels start splitting
    const timer3 = setTimeout(onFinished, 3000); // Animation is finished, notify parent

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinished]);

  return (
    <div className={`opener-container ${phase}`}>
      <div className="opener-logo">
        <img src={yourLogo} alt="Grams Coffee Logo" />
      </div>
      <div className="opener-panel left"></div>
      <div className="opener-panel right"></div>
    </div>
  );
};

export default OpenerAnimation;
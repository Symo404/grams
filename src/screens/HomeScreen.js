import React, { useState, useEffect } from 'react';

import { ParallaxBanner } from 'react-scroll-parallax'; // <-- Import Parallax
import Lottie from 'lottie-react';

// 1. Import all the necessary components for the page
import Navbar from '../sections/Navbar';
import ServicesSection from '../sections/ServicesSection';
import StoreSection from '../sections/StoreSection';
import Quote from '../sections/Quote';
import MenuSection from '../sections/MenuSection';
import CtaSection from '../sections/CtaSection';
import Footer from '../sections/Footer';
import OpenerAnimation from '../sections/OpenerAnimation';
import AnimatedSection from '../sections/AnimatedSection';

// Also import the hero video
import heroVideo from '../assets/video/hero-video.mp4';

const HomeScreen = () => {
  const [showOpener, setShowOpener] = useState(!sessionStorage.getItem('hasVisited'));

  useEffect(() => {
    if (showOpener) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showOpener]);


  // Data for the quote component can live here
  const exampleQuote = {
    script: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    normal: "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
    author: "The Industry"
  };


  const handleAnimationFinish = () => {
    // --- NEW: When the animation finishes, set the sessionStorage item ---
    sessionStorage.setItem('hasVisited', 'true');
    setShowOpener(false);
  };

  // If showOpener is true, we only render the animation
  if (showOpener) {
    // Pass the new handler to the component
    return <OpenerAnimation onFinished={handleAnimationFinish} />;
  }

  return (
    // 2. Use a React Fragment to wrap all page elements
    <>
      <Navbar />

      {/* This is the original hero section content from the old HomeScreen */}
      <div className="hero-container">
        <video autoPlay loop muted className="hero-video">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="hero-text">
          <h1>Brand Built On Quality</h1>
          <p>Proudly Prepared With care</p>
        </div> */}
      </div>
      
      {/* 3. Render all the other sections in order */}
      <AnimatedSection delay={0.35}>
        <ServicesSection />
      </AnimatedSection>


      <AnimatedSection>
        <StoreSection />
      </AnimatedSection>


      <AnimatedSection delay={0.35}>
        <Quote 
          scriptText={exampleQuote.script}
          normalText={exampleQuote.normal}
          author={exampleQuote.author}
        />
      </AnimatedSection>


      <AnimatedSection delay={0.35}>
        <MenuSection />
      </AnimatedSection>


      <AnimatedSection delay={0.35}>
        <Quote 
          scriptText={exampleQuote.script}
          normalText={exampleQuote.normal}
          author={exampleQuote.author}
        />
      </AnimatedSection>


       <AnimatedSection delay={0.35}>
        <CtaSection />
      </AnimatedSection>

      

      <Footer />
    </>
  );
};

export default HomeScreen;
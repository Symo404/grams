import React, { useState } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CtaSection from '../sections/CtaSection';


// Import your images - make sure to place them in your assets folder
import heroImage1 from '../assets/images/brand/brand-hero-1.png';
import heroImage2 from '../assets/images/brand/brand-hero-2.png';
import videoPlaceholder from '../assets/images/brand/brand-video.png';
import philosophyImage1 from '../assets/images/brand/philosophy-1.png';
import philosophyImage2 from '../assets/images/brand/philosophy-2.png';
import visionImage from '../assets/images/brand/vision-banner.png';



const OurBrandScreen = () => {
  const [activeTab, setActiveTab] = useState('philosophy'); // 'philosophy' is active by default

  const renderContent = () => {
    switch (activeTab) {
      case 'philosophy':
        return (
          <div className="tab-content">
            <img src={videoPlaceholder} alt="Pouring coffee" className="content-video" />
            <h2>OUR PHILOSOPHY</h2>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <img src={philosophyImage1} alt="Zeno Filtre coffee bag and cup" />
                <h3>We Believe that</h3>
                <p>We partner with independent roasters, ceramic artists, and sustainable brands to bring you products that speak to the modern coffee lover — clean lines, muted tones, and uncompromising quality. This is more than just a store.</p>
              </div>
              <div className="philosophy-item">
                <img src={philosophyImage2} alt="French press and coffee cups" />
                <h3>Why We Do It?</h3>
                <p>We partner with independent roasters, ceramic artists, and sustainable brands to bring you products that speak to the modern coffee lover — clean lines, muted tones, and uncompromising quality. This is more than just a store.</p>
              </div>
            </div>
          </div>
        );
      case 'culture':
        return (
          <div className="tab-content">
            {/* Add content for "Our Culture" tab here */}
            <h2>OUR CULTURE</h2>
            <p>Content for Our Culture will go here. It's about our community, our baristas, and the atmosphere we create together.</p>
          </div>
        );
      case 'story':
        return (
          <div className="tab-content">
            {/* Add content for "Our Story" tab here */}
            <h2>OUR STORY</h2>
            <p>Content for Our Story will go here. This section can detail the journey of how Grams Specialty Coffee was founded.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
        <Navbar />
      <div className="our-brand-page">
        {/* --- MODIFIED: The header is now the main container --- */}
        <header className="brand-hero">
          {/* Use only one hero image that will fill the container */}
          <img src={heroImage1} alt="Grams specialty coffee shop interior" className="hero-img-full" />
          
          {/* --- MOVED: Tabs are now inside the header for positioning --- */}
          <nav className="brand-tabs">
            <button
              className={`tab-button ${activeTab === 'philosophy' ? 'active' : ''}`}
              onClick={() => setActiveTab('philosophy')}
            >
              PHILOSOPHY
            </button>
            <button
              className={`tab-button2 ${activeTab === 'culture' ? 'active' : ''}`}
              onClick={() => setActiveTab('culture')}
            >
              CULTURE
            </button>
            <button
              className={`tab-button3 ${activeTab === 'story' ? 'active' : ''}`}
              onClick={() => setActiveTab('story')}
            >
              STORY
            </button>
          </nav>
        </header>

      
        <main className="brand-content-container">
          {renderContent()}
        </main>
        
        <section className="vision-banner">
            <img src={visionImage} alt="Close up of roasted coffee beans"/>
            <div className="banner-text">
                <h2>Vision & Values</h2>
                <p>We partner with independent roasters, ceramic artists, and sustainable brands to bring you products that speak to the modern coffee lover.</p>
            </div>
        </section>

        <section className="closing-text">
            <p>Coffee is more than a drink — it's an experience, a craft, and a connection. Every bean we roast has a story, from the hands of dedicated farmers to the moment it reaches your cup. Our passion lies in treating coffee with the respect it deserves — sourcing ethically, roasting with precision, and brewing with care. We believe that every sip should inspire, comfort, and connect people, one cup at a time. That's why we do it.</p>
        </section>

       

      </div>
      <CtaSection />
      <Footer />
    </>
  );
};

export default OurBrandScreen;
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

// You can create or find a simple, stylish icon/image for this page
import constructionIcon from '../assets/icons/under-construction.png'; // Example path

const ComingSoonScreen = () => {
  return (
    <>
      <Navbar />
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">
            <img src={constructionIcon} alt="Under construction icon" />
          </div>
          <h1>Coming Soon</h1>
          <p>
            We're currently brewing up something amazing for this page. Please check back later to see what we've been working on!
          </p>
          <Link to="/" className="coming-soon-button">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoonScreen;
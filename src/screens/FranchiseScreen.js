import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { message } from 'antd';

// Import your new hero image
import franchiseHeroImage from '../assets/images/franchise-hero.png'; // Make sure to add a suitable image here

const FranchiseScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_NEW_FRANCHISE_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceID, templateID, e.target, publicKey)
      .then((result) => {
          message.success('Thank you! Your request has been submitted successfully.');
          navigate('/');
      }, (error) => {
          message.error('Something went wrong. Please try again later.');
          console.error('EmailJS Error:', error.text);
      })
      .finally(() => {
          setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="franchise-page-container">
        {/* --- NEW: Hero Image Section --- */}
        <div className="franchise-hero">
          <img src={franchiseHeroImage} alt="Grams Coffee shop interior" />
        </div>
        
        {/* --- Content wrapper for padding --- */}
        <div className="franchise-content-wrapper">
          <header className="franchise-header">
            <h1>Partner with Grams</h1>
            <p>Join us in our mission to elevate the coffee experience. We are looking for passionate, dedicated partners to grow with our brand and bring specialty coffee to new communities. If you share our commitment to quality, craft, and comfort, we invite you to begin the conversation by completing the form below.</p>
          </header>

           <main className="franchise-form-container">
          <form onSubmit={handleSubmit}>
            {/* --- Personal Information --- */}
            <div className="form-group">
              <label htmlFor="applicant_name">Mr./Ms. (First and last name)<span>*</span></label>
              <input type="text" id="applicant_name" name="applicant_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Phone number<span>*</span></label>
              <input type="tel" id="phone_number" name="phone_number" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City<span>*</span></label>
              <input type="text" id="city" name="city" required />
            </div>
            <div className="form-group">
              <label htmlFor="company_name">Your company name</label>
              <input type="text" id="company_name" name="company_name" />
            </div>

            {/* --- Experience & Background --- */}
            <div className="form-group">
              <label htmlFor="investment_experience">What is your investment experience and background?<span>*</span></label>
              <input type="text" id="investment_experience" name="investment_experience" required />
            </div>
            <div className="form-group">
              <label htmlFor="coffee_experience">Do you have any experience in the coffee shop industry?<span>*</span></label>
              <input type="text" id="coffee_experience" name="coffee_experience" required />
            </div>
            <div className="form-group">
              <label htmlFor="investment_industries">What types of businesses or industries do you typically invest in?<span>*</span></label>
              <input type="text" id="investment_industries" name="investment_industries" required />
            </div>
            <div className="form-group">
              <label htmlFor="current_profession">If not, what is your current profession?<span>*</span></label>
              <input type="text" id="current_profession" name="current_profession" required />
            </div>

            {/* --- Investment Level --- */}
            <div className="form-group">
              <label>What is your approximate initial investment?<span>*</span></label>
              <div className="radio-group">
                <div className="radio-option"><input type="radio" name="initial_investment" value="500,000 - 1,000,000 Dh" required /> 500 000 Dh - 1 000 000 Dh</div>
                <div className="radio-option"><input type="radio" name="initial_investment" value="1,000,000 - 2,000,000 Dh" /> 1 000 000 Dh - 2 000 000 Dh</div>
                <div className="radio-option"><input type="radio" name="initial_investment" value="2,000,000 - 5,000,000 Dh" /> 2 000 000 Dh - 5 000 000 Dh</div>
                <div className="radio-option"><input type="radio" name="initial_investment" value="+5,000,000 Dh" /> + 5 000 000 Dh</div>
              </div>
            </div>

            {/* --- Operational Details --- */}
            <div className="form-group">
              <label htmlFor="has_team">Do you already have your team?<span>*</span></label>
              <input type="text" id="has_team" name="has_team" required />
            </div>
            <div className="form-group">
              <label htmlFor="investment_goals">What are your investment goals and expectations for this franchise?<span>*</span></label>
              <input type="text" id="investment_goals" name="investment_goals" required />
            </div>
            <div className="form-group">
              <label htmlFor="store_surface">What is the surface of your store?<span>*</span></label>
              <input type="text" id="store_surface" name="store_surface" required />
            </div>
            <div className="form-group">
              <label htmlFor="store_location">Where is it located? (Downtown, coast, a mall...)?<span>*</span></label>
              <input type="text" id="store_location" name="store_location" required />
            </div>
            <div className="form-group">
              <label htmlFor="full_time_management">Will you be the one taking charge of the management full time?<span>*</span></label>
              <input type="text" id="full_time_management" name="full_time_management" required />
            </div>
            
            <button type="submit" className="submit-request-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FranchiseScreen;
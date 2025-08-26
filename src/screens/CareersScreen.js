import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { message } from 'antd';

// Import a hero image for the careers page
import careersHeroImage from '../assets/images/careers-hero.png';

const CareersScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // IMPORTANT: Replace with your actual credentials
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_NEW_ENGLISH_CAREERS_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceID, templateID, e.target, publicKey)
      .then((result) => {
          message.success('Thank you for your application! We will review it and be in touch shortly.');
          navigate('/');
      }, (error) => {
          message.error('Submission failed. Please try again later.');
          console.error('EmailJS Error:', error.text);
      })
      .finally(() => {
          setLoading(false);
      });
  };


  return (
    <>
      <Navbar />
      <div className="careers-page-container">
        <div className="careers-hero">
          <img src={careersHeroImage} alt="Barista preparing coffee with care" />
        </div>

        <div className="careers-content-wrapper">
          <header className="careers-header">
            <h1>Join Our Team</h1>
            <p>We believe that extraordinary coffee is the result of a team that is passionate, dedicated, and meticulous. At Grams, we are always looking for talented individuals who share our commitment to craft and hospitality. If you are driven to create exceptional experiences and grow within the specialty coffee industry, we invite you to apply.</p>
          </header>

          <main className="careers-form-container">
            <form className="careers-form" onSubmit={handleSubmit}>
              
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group"><label>Full Name *</label><input type="text" name="full_name" required /></div>
                  <div className="form-group"><label>Phone Number *</label><input type="tel" name="phone_number" required /></div>
                  <div className="form-group"><label>Email Address *</label><input type="email" name="email_address" required /></div>
                  <div className="form-group"><label>Postal Address</label><input type="text" name="postal_address" /></div>
                  <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" /></div>
                  <div className="form-group"><label>Nationality</label><input type="text" name="nationality" /></div>
                  <div className="form-group full-width"><label>Gender</label><select name="gender"><option>Male</option><option>Female</option><option>Prefer not to say</option></select></div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Professional Experience</h3>
                <div className="form-grid">
                  <div className="form-group"><label>Previous Job Titles *</label><textarea name="previous_titles" rows="5" required></textarea></div>
                  <div className="form-group"><label>Brief Description of Duties & Responsibilities *</label><textarea name="task_description" rows="5" required></textarea></div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Education & Training</h3>
                <div className="form-grid">
                  <div className="form-group"><label>Diploma / Degree *</label><textarea name="diploma" rows="5" required></textarea></div>
                  <div className="form-group"><label>Courses or Certifications *</label><textarea name="certifications" rows="5" required></textarea></div>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="section-title">Languages</h3>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="languages" value="Arabic" /> Arabic</label>
                    <label><input type="checkbox" name="languages" value="French" /> French</label>
                    <label><input type="checkbox" name="languages" value="English" /> English</label>
                    <label><input type="checkbox" name="languages" value="Tamazight" /> Tamazight</label>
                </div>
                <div className="form-group" style={{marginTop: '1rem'}}><input type="text" name="other_language" placeholder="Other"/></div>
              </div>

              <div className="form-section">
                  <h3 className="section-title">Skills & Aptitudes</h3>
                  <div className="form-grid skills-grid">
                      <div className="form-group"><p>Ability to work effectively in a fast-paced environment</p><div className="radio-group-inline"><label><input type="radio" name="skill_fast_paced" value="Yes" /> Yes</label><label><input type="radio" name="skill_fast_paced" value="No" /> No</label></div></div>
                      <div className="form-group"><p>Good communication and interpersonal skills</p><div className="radio-group-inline"><label><input type="radio" name="skill_communication" value="Yes" /> Yes</label><label><input type="radio" name="skill_communication" value="No" /> No</label></div></div>
                      <div className="form-group"><p>Detail-oriented</p><div className="radio-group-inline"><label><input type="radio" name="skill_detail_oriented" value="Yes" /> Yes</label><label><input type="radio" name="skill_detail_oriented" value="No" /> No</label></div></div>
                      <div className="form-group"><p>Knowledge of coffee and tea taste profiles & characteristics</p><div className="radio-group-inline"><label><input type="radio" name="skill_coffee_knowledge" value="Yes" /> Yes</label><label><input type="radio" name="skill_coffee_knowledge" value="No" /> No</label></div></div>
                      <div className="form-group"><p>Ability to handle and use coffee preparation equipment</p><div className="radio-group-inline"><label><input type="radio" name="skill_equipment_handling" value="Yes" /> Yes</label><label><input type="radio" name="skill_equipment_handling" value="No" /> No</label></div></div>
                      <div className="form-group"><p>Ability to maintain cleanliness and hygiene standards in the work environment</p><div className="radio-group-inline"><label><input type="radio" name="skill_hygiene_standards" value="Yes" /> Yes</label><label><input type="radio" name="skill_hygiene_standards" value="No" /> No</label></div></div>
                  </div>
              </div>

              <div className="form-section">
                  <h3 className="section-title">Availability</h3>
                  <div className="checkbox-group">
                      <label><input type="checkbox" name="availability" value="Full-time" /> Full-time</label>
                      <label><input type="checkbox" name="availability" value="Part-time" /> Part-time</label>
                  </div>
                  <div className="form-group" style={{marginTop: '1.5rem'}}><label>Available start date</label><input type="date" name="start_date" /></div>
              </div>
              
              <button type="submit" className="submit-request-btn" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareersScreen;
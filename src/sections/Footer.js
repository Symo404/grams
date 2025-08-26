import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/logo/logo-white.png';
import gramsLogo from '../assets/logo/grams-signature.png';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Top Section: Main Logo and Social Icons */}
        <div className="footer-top">
          <div className="footer-logo-main">
            <img src={gramsLogo} alt="Grams Specialty Coffee" />
          </div>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="#" aria-label="TikTok"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h-2a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h2"></path><path d="M12 12v-2a4 4 0 0 1 4-4h0"></path><path d="M8 20v-8a4 4 0 0 0-4-4H4"></path></svg></a>
          </div>
        </div>

        {/* Middle Section: Four Columns of Links */}
        <div className="footer-middle">
          <div className="footer-column">
            <h4>Contact us</h4>
            <ul>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span>info@grams.ma</span></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>+212 525212003</span></li>
              <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>CF27+GCX, Agadir 80000</span></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Links</h4>
            <ul>
              <li><a href="#">Our brand</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">Loyalty program</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Learn</h4>
            <ul>
               <li><Link to="/blog">Grams blogs</Link></li>
              <li><a href="#">Baristas</a></li>
              <li><a href="#">Our guides</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>We're Hiring</h4>
            <ul>
              <li><Link to="/franchise">As a franchise</Link></li>
              <li><a href="#">As a supplier</a></li>
              <li><Link to="/carrers">As an employee</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Centered Brand Icon */}
        <div className="footer-bottom">
        <img src={brandLogo} alt="Grams Coffee Logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
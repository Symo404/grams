import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/logo/logo-white.png';
import gramsLogo from '../assets/logo/grams-signature.png';

import instagramOutline from '../assets/icons/instagram-outline.png';
import instagramSolid from '../assets/icons/instagram-solid.png';
import facebookOutline from '../assets/icons/facebook-outline.png';
import facebookSolid from '../assets/icons/facebook-solid.png';
import tiktokOutline from '../assets/icons/tiktok-outline.png';
import tiktokSolid from '../assets/icons/tiktok-solid.png';

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
            <a href="https://www.instagram.com/gramsmorocco/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <img src={instagramOutline} alt="Instagram" className="icon-outline" />
              <img src={instagramSolid} alt="Instagram" className="icon-solid" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
              <img src={facebookOutline} alt="Facebook" className="icon-outline" />
              <img src={facebookSolid} alt="Facebook" className="icon-solid" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="TikTok">
              <img src={tiktokOutline} alt="TikTok" className="icon-outline" />
              <img src={tiktokSolid} alt="TikTok" className="icon-solid" />
            </a>
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
              <li><Link to="/comingsoon">Baristas</Link></li>
              <li><Link to="/comingsoon">Our Guides</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>We're Hiring</h4>
            <ul>
              <li><Link to="/franchise">As a franchise</Link></li>
              <li><Link to="/comingsoon">As a supplier</Link></li>
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
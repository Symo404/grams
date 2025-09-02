import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import logoBlack from '../assets/logo/logo-black.png';
import logoWhite from '../assets/logo/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/our-brand", label: "Our Brand" },
    { to: "/store", label: "Store" },
    { to: "/menu", label: "Menu" },
    { to: "/subscription", label: "Subscription" },
  ];
  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  // --- Animation Variants ---
  const stickyNavVariants = {
    initial: { y: '-100%' },
    animate: { y: '0%' },
    exit: { y: '-100%' },
    transition: { duration: 0.4, ease: 'easeInOut' }
  };
  const mobileMenuVariants = {
    initial: { x: '100%' },
    animate: { x: '0%', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { x: '100%', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  };
  const mobileLinkContainerVariants = {
    animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  };
  const mobileLinkVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1] } },
  };

  const MobileNavLink = ({ to, label }) => (
    <motion.div variants={mobileLinkVariants}>
      <NavLink to={to} onClick={() => setIsMobileMenuOpen(false)}>
        {label}
      </NavLink>
    </motion.div>
  );

  return (
    <>
      {/* ======================================================
          DESKTOP NAVIGATIONS
      ======================================================= */}
      <div className="desktop-nav">
        {/* The key prop is crucial for AnimatePresence to detect changes */}
        <AnimatePresence>
          {isScrolled ? (
            <motion.nav key="stickyNav" className="navbar sticky" {...stickyNavVariants}>
              <div className="sticky-nav-links left">
                {leftLinks.map(link => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
              </div>
              <div className="sticky-nav-logo">
                <Link to="/"><img src={logoWhite} alt="Grams Coffee Logo" /></Link>
              </div>
              <div className="sticky-nav-links right">
                {rightLinks.map(link => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
                <NavLink to="/loyalty">Loyalty Program</NavLink>
              </div>
            </motion.nav>
          ) : (
            <motion.nav key="defaultNav" className="navbar default" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="navbar-logo">
                <NavLink to="/"><img src={logoBlack} alt="Grams Coffee Logo" /></NavLink>
              </div>
              <div className="navbar-right">
                <div className="navbar-links">
                  {navLinks.map(link => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
                </div>
                <Link to="/loyalty" className="loyalty-program-button">Loyalty program</Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================
          MOBILE NAVIGATION
      ======================================================= */}
      <div className="mobile-nav">
        <nav className={`navbar mobile-bar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-logo">
            <NavLink to="/"><img src={isScrolled ? logoWhite : logoBlack} alt="Grams Coffee Logo" /></NavLink>
          </div>
           <button className="hamburger-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <AnimatePresence initial={false}>
              <motion.div
                key={isMobileMenuOpen ? 'xmark' : 'bars'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
              </motion.div>
            </AnimatePresence>
          </button>
        </nav>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="mobile-menu-overlay" {...mobileMenuVariants}>
              <motion.div className="mobile-links-container" variants={mobileLinkContainerVariants} initial="initial" animate="animate">
                {navLinks.map(link => <MobileNavLink key={link.to} to={link.to} label={link.label} />)}
                <motion.div variants={mobileLinkVariants}>
                  <Link to="/loyalty" className="mobile-loyalty-button" onClick={() => setIsMobileMenuOpen(false)}>
                    Loyalty Program
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
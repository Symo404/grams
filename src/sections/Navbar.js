import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import logoBlack from '../assets/logo/logo-black.png';
import logoWhite from '../assets/logo/logo-white.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- State for mobile menu

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    // When mobile menu is open, prevent body scroll
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isMobileMenuOpen]);

  // --- MODIFIED: Split the links into two groups of 3 ---
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/our-brand", label: "Our Brand" },
    { to: "/store", label: "Store" },
    { to: "/menu", label: "Menu" }, // Menu is now on the left
    
    { to: "/subscription", label: "Subscription" },
    // Loyalty Program is handled separately as a button
  ];
  
  const leftLinks = navLinks.slice(0, 3); // Home, Our Brand, Menu
  const rightLinks = navLinks.slice(3); // Store, Subscription

const defaultNavVariants = { initial: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0.2 } } };
  const stickyNavVariants = { initial: { y: '-100%' }, animate: { y: '0%' }, exit: { y: '-100%' } };

  // --- NEW: Animation variants for the link containers ---
  const linksContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1, // Stagger the animation of children by 0.1s
      },
    },
  };

  // --- NEW: Animation variants for each individual link ---
  const linkVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants = {
    initial: { x: '100%' },
    animate: { x: '0%', transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const MobileNavLink = ({ to, label }) => (
    <NavLink to={to} onClick={() => setIsMobileMenuOpen(false)}>
      {label}
    </NavLink>
  );

  
  return (
    <>
      <AnimatePresence>
        {/* --- Default Static Navbar --- */}
        {!isScrolled && (
          <motion.nav
            className="navbar default"
            variants={defaultNavVariants}
            initial="initial"
            animate="initial"
            exit="exit"
          >
            <div className="navbar-logo">
              <NavLink to="/"><img src={logoBlack} alt="Grams Coffee Logo" /></NavLink>
            </div>
            <div className="navbar-right">
              <div className="navbar-links">
                {/* --- MODIFIED: Re-add Menu to the default nav --- */}
                <NavLink to="/">Home</NavLink>
                <NavLink to="/our-brand">Our Brand</NavLink>
                <NavLink to="/store">Store</NavLink>
                <NavLink to="/subscription">Subscription</NavLink>
                <NavLink to="/menu">Menu</NavLink>
              </div>
              <button className="loyalty-program-button">Loyalty program</button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* --- Sticky Navbar --- */}
        {isScrolled && (
          <motion.nav
            className="navbar sticky"
            variants={stickyNavVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="sticky-nav-links left">
              {leftLinks.map(link => (
                <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
              ))}
            </div>
            
            <motion.div className="sticky-nav-logo">
              <Link to="/"><img src={logoWhite} alt="Grams Coffee Logo" /></Link>
            </motion.div>

            <div className="sticky-nav-links right">
              {rightLinks.map(link => (
                <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
              ))}
              {/* --- MODIFIED: Loyalty Program button is now here --- */}
              <NavLink to="/subscription">Loyalty Program</NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
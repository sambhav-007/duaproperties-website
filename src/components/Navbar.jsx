// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Assuming you have these for mobile menu

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [scrolled, setScrolled] = useState(false); // State for scroll detection
  const location = useLocation();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) { // After scrolling 50px, make it solid
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount and clean up on unmount

  // Determine if the current page is the homepage.
  // We want the transparent effect primarily on the homepage's hero section.
  const isHomePage = location.pathname === '/';

  // Conditional styles based on scroll and if it's the homepage
  const navbarClasses = `
    fixed w-full top-0 left-0 z-40 p-4 transition-all duration-300 ease-in-out
    ${isHomePage && !scrolled ? 'bg-transparent text-white' : 'bg-dua-primary shadow-md text-white'}
  `;

  const navLinkClasses = ({ isActive }) =>
    `py-2 px-4 rounded-md transition-colors duration-200 ${
      isActive ? 'bg-dua-accent text-white' : 'hover:bg-dua-accent hover:text-white'
    }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-bold">
          Dua Properties
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLinkClasses}>
            Properties
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClasses}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dua-primary absolute top-full left-0 w-full shadow-lg">
          <NavLink
            to="/"
            className="block py-2 px-4 text-white hover:bg-dua-accent"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className="block py-2 px-4 text-white hover:bg-dua-accent"
            onClick={() => setIsOpen(false)}
          >
            Properties
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 px-4 text-white hover:bg-dua-accent"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 px-4 text-white hover:bg-dua-accent"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
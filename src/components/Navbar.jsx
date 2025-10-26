// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll for background and text color change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar style changes:
  const isHome = location.pathname === '/';
  const navbarClasses = `
    fixed w-full top-0 left-0 z-50 p-4 transition-all duration-500 ease-in-out
    ${isHome && !scrolled ? 'bg-transparent text-white' : 'bg-white/90 backdrop-blur-md text-dua-primary shadow-md'}
  `;

  // NavLink styling
  const navLinkClasses = ({ isActive }) =>
    `relative font-medium text-sm sm:text-base group py-1 px-2 transition-all duration-300 ${
      isActive
        ? 'font-bold border-b-2 border-dua-accent text-dua-accent'
        : 'hover:text-dua-accent hover:border-b-2 hover:border-dua-accent border-b-2 border-transparent'
    }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/dua-logo.jpg" alt="Dua Property Logo" className="h-10 w-auto rounded-md" />
          <span className={`text-2xl font-bold transition-colors duration-300 ${
            isHome && !scrolled ? 'text-white' : 'text-dua-primary'
          }`}>
            Dua Property
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/properties" className={navLinkClasses}>Properties</NavLink>
          <NavLink to="/about" className={navLinkClasses}>About</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-2xl transition-colors duration-300 ${
              isHome && !scrolled ? 'text-white' : 'text-dua-primary'
            }`}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${isHome && !scrolled ? 'bg-dua-primary text-white' : 'bg-white text-dua-primary'}`}
      >
        {[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
        ].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`block py-3 px-6 transition-colors duration-200 ${
              isHome && !scrolled
                ? 'hover:bg-dua-accent hover:text-white'
                : 'hover:bg-dua-primary hover:text-white'
            }`}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

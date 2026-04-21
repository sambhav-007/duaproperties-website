// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Detect scroll for background and text color change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar style changes:
  const isSolidNavbar = scrolled || !isHomePage;

  const navbarClasses = `
    fixed w-full top-0 left-0 z-50 px-3 py-3 sm:p-4 transition-all duration-500 ease-in-out
    ${isSolidNavbar ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' : 'bg-transparent'}
  `;

  // NavLink styling
  const navLinkClasses = ({ isActive }) =>
    `relative font-medium text-sm sm:text-base group py-1 px-2 transition-all duration-300 ${
      isSolidNavbar ? 'text-dua-text' : 'text-white drop-shadow-lg'
    } ${
      isActive
        ? `font-bold border-b-2 ${isSolidNavbar ? 'border-dua-primary text-dua-primary' : 'border-white text-white'}` 
        : `hover:border-b-2 border-b-2 border-transparent ${isSolidNavbar ? 'hover:text-dua-primary hover:border-dua-primary' : 'hover:text-gray-200 hover:border-white/80'}`
    }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/dua-logo.jpg" alt="Dua Property Logo" className="h-8 sm:h-10 w-auto rounded-md" />
          <span className={`text-base sm:text-2xl font-bold transition-colors duration-300 truncate max-w-[145px] sm:max-w-none ${
            isSolidNavbar ? 'text-dua-primary' : 'text-white drop-shadow-lg'
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
            className={`text-2xl transition-colors duration-300 p-2 rounded-lg ${
              isSolidNavbar ? 'text-dua-text hover:bg-gray-100' : 'text-white hover:bg-white/20 drop-shadow-lg'
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden fixed top-[64px] sm:top-[72px] left-0 w-full shadow-2xl transition-all duration-300 bg-white backdrop-blur-lg border-t border-gray-200 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
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
            className={({ isActive }) =>
              `block py-4 px-6 text-base font-medium transition-all duration-200 border-b border-gray-200 ${
                isActive
                  ? 'bg-dua-primary/10 text-dua-primary border-l-4 border-l-dua-primary'
                  : 'text-dua-text hover:bg-gray-100 hover:text-dua-primary hover:border-l-4 hover:border-l-dua-primary'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

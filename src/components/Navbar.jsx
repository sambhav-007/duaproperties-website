// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // <-- ADD STATE FOR MOBILE MENU
  const location = useLocation(); // To get current path for active links

  // Use fixed positioning and transparent background globally
  const navbarClasses = `
    fixed w-full top-0 left-0 z-40 p-4 transition-all duration-300 ease-in-out
    bg-transparent text-white
  `;

  // Define link classes using NavLink for active styling
  const navLinkClasses = ({ isActive }) =>
    `relative font-medium text-sm sm:text-base group py-1 px-2 transition-all duration-300 ${
      isActive ? 'font-bold border-b-2 border-dua-accent text-dua-accent' : 'hover:text-dua-accent hover:border-b-2 hover:border-dua-accent border-b-2 border-transparent'
    }`;
  
  // Styles for the brand text next to the logo
  const brandTextClasses = `
    text-xl font-bold transition-colors duration-300 
    ${location.pathname === '/' ? 'text-white' : 'text-dua-primary'}
  `;
  
  
 return (
  <nav className={navbarClasses}>
    <div className="container mx-auto flex justify-between items-center">

      {/* Logo and Brand Name (Left Side) */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/dua-logo.png" alt="Dua Property Logo" className="h-10 w-auto" />
        <span className="text-2xl font-bold text-white"> 
          Dua Property
        </span>
      </Link>

      {/* 1. Desktop Navigation (Always visible on medium screens and up) */}
      <div className="hidden md:flex space-x-6">
        {/* NavLink is better for navigation as it knows the 'active' link */}
        <NavLink to="/" className={navLinkClasses}>Home</NavLink>
        <NavLink to="/properties" className={navLinkClasses}>Properties</NavLink>
        <NavLink to="/about" className={navLinkClasses}>About</NavLink>
        <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
      </div>

      {/* 2. Mobile Menu Button (Only visible on small screens) */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-white">
          {isOpen ? <FaTimes /> : <FaBars />} {/* Toggle X icon or Hamburger icon */}
        </button>
      </div>
    </div>

    {/* 3. Mobile Collapsible Menu */}
    <div 
      className={`
        md:hidden absolute top-full left-0 w-full shadow-lg transition-transform duration-300 transform 
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} 
        bg-dua-primary
      `}
    >
      {/* Menu Links */}
      <NavLink
        to="/"
        className="block py-3 px-6 text-white hover:bg-dua-accent transition-colors duration-200"
        onClick={() => setIsOpen(false)} // Close menu on click
      >
        Home
      </NavLink>
      <NavLink
        to="/properties"
        className="block py-3 px-6 text-white hover:bg-dua-accent transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        Properties
      </NavLink>
      <NavLink
        to="/about"
        className="block py-3 px-6 text-white hover:bg-dua-accent transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className="block py-3 px-6 text-white hover:bg-dua-accent transition-colors duration-200"
        onClick={() => setIsOpen(false)}
      >
        Contact
      </NavLink>
    </div>
  </nav>
);
}

export default Navbar;
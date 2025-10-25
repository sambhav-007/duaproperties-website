// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
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
        
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          {/* NOTE: You MUST ensure your logo is clearly visible against light backgrounds (e.g., using a dark version) */}
          <img src="/dua-logo.jpg" alt="Dua Property Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-white"> 
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
      </div>
      
      {/* (Mobile menu code here, if applicable) */}
      
    </nav>
  );
}

export default Navbar;
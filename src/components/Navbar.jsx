// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/dua-logo.jpg';

function Navbar() {
  return (
    <nav className="bg-white p-3 shadow-md sticky top-0 z-50"> {/* Made background white, added sticky */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-2"> {/* Use flex to align logo and text */}
          <img src={logo} alt="Dua Properties Logo" className="h-10 w-auto" /> {/* Adjust height as needed */}
          <span className="text-xl font-bold text-dua-primary"> {/* Text styling */}
            Dua Property
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-1 justify-end items-center space-x-3 sm:space-x-6">
          <Link
            to="/"
            className="relative text-dua-body font-medium text-sm sm:text-base group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dua-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          <Link
            to="/properties"
            className="relative text-dua-body font-medium text-sm sm:text-base group"
          >
            Properties
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dua-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          <Link
            to="/about"
            className="relative text-dua-body font-medium text-sm sm:text-base group"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dua-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          <Link
            to="/contact"
            className="relative text-dua-body font-medium text-sm sm:text-base group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dua-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
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
        <div className="flex flex-1 justify-end items-center space-x-3 sm:space-x-6"> {/* Added flex-1, justify-end, and responsive space-x */}
          <Link to="/" className="text-dua-body hover:text-dua-accent transition-colors duration-300 font-medium text-sm sm:text-base">Home</Link> {/* Added responsive text-sm */}
          <Link to="/properties" className="text-dua-body hover:text-dua-accent transition-colors duration-300 font-medium text-sm sm:text-base">Properties</Link>
          <Link to="/about" className="text-dua-body hover:text-dua-accent transition-colors duration-300 font-medium text-sm sm:text-base">About</Link>
          <Link to="/contact" className="text-dua-body hover:text-dua-accent transition-colors duration-300 font-medium text-sm sm:text-base">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
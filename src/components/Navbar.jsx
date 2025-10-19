// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-dua-dark-green p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Dua Properties
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-dua-gold transition-colors duration-300">Home</Link>
          <Link to="/properties" className="text-white hover:text-dua-gold transition-colors duration-300">Properties</Link>
          <Link to="/about" className="text-white hover:text-dua-gold transition-colors duration-300">About</Link>
          <Link to="/contact" className="text-white hover:text-dua-gold transition-colors duration-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
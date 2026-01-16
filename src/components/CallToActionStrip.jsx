// src/components/CallToActionStrip.jsx (New File)
import React from 'react';
import { Link } from 'react-router-dom';

function CallToActionStrip() {
  return (
    <div className="bg-gradient-to-r from-dua-primary to-cyan-600 text-white py-6 px-6 text-center shadow-lg border-t border-cyan-700 border-b border-cyan-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-semibold text-lg md:text-xl text-white">
          Ready to find your <span className="text-yellow-300 font-bold">dream investment</span>? Get expert advice on Tricity & Dubai properties today.
        </p>
        <Link
          to="/contact"
          className="bg-white hover:bg-gray-100 text-dua-primary font-bold py-3 px-8 rounded-full text-md hover:scale-105 hover:shadow-2xl transition-all duration-300 whitespace-nowrap"
        >
          Get Personalized Consultation
        </Link>
      </div>
    </div>
  );
}

export default CallToActionStrip;
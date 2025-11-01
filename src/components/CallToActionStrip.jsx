// src/components/CallToActionStrip.jsx (New File)
import React from 'react';
import { Link } from 'react-router-dom';

function CallToActionStrip() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 px-6 text-center shadow-2xl border-t border-white/10 border-b border-white/10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-semibold text-lg md:text-xl text-gray-200">
          Ready to find your <span className="text-dua-accent">dream investment</span>? Get expert advice on Tricity & Dubai properties today.
        </p>
        <Link
          to="/contact"
          className="bg-dua-accent/90 backdrop-blur-sm border border-dua-accent/30 text-dua-primary font-bold py-3 px-8 rounded-full text-md hover:bg-dua-accent hover:scale-105 hover:shadow-[0_0_30px_rgba(193,154,107,0.4)] transition-all duration-300 whitespace-nowrap"
        >
          Get Personalized Consultation
        </Link>
      </div>
    </div>
  );
}

export default CallToActionStrip;
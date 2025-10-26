// src/components/CallToActionStrip.jsx (New File)
import React from 'react';
import { Link } from 'react-router-dom';

function CallToActionStrip() {
  return (
    <div className="bg-dua-primary text-white py-4 px-6 text-center shadow-2xl border-t-2 border-dua-accent">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="font-semibold text-lg mb-2 md:mb-0">
          Ready to find your investment? Get expert advice on Tricity & Dubai properties today.
        </p>
        <Link
          to="/contact"
          className="bg-dua-accent text-dua-primary font-bold py-2 px-6 rounded-full text-md hover:scale-105 transition duration-300"
        >
          Get Personalized Consultation
        </Link>
      </div>
    </div>
  );
}

export default CallToActionStrip;
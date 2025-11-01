// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa'; 

function Footer() {
  const currentYear = new Date().getFullYear();
  const facebookUrl = "https://www.facebook.com/share/19Kioy5Sco/"; 
  const instagramUrl = "https://www.instagram.com/_duaproperties?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="; 
  const youtubeUrl = "https://www.youtube.com/@DuaProperty";
  const contactNumber = "+91 99960 09729"; 
  const contactEmail = "duaproperty123@gmail.com";

  return (
    <footer className="bg-gray-900/95 backdrop-blur-lg border-t border-white/10 text-white p-6 sm:p-8 shadow-2xl mt-auto">
      <div className="container mx-auto text-center">
        {/* Contact Info */}
        <div className="mb-4 sm:mb-6">
          <p className="font-semibold text-base sm:text-lg mb-2 text-dua-accent">Contact Us:</p>
          <a href={`tel:${contactNumber.replace(/\s/g, '')}`} className="block text-sm sm:text-base hover:text-dua-accent transition-colors duration-300 mb-1">
            {contactNumber}
          </a>
          <a href={`mailto:${contactEmail}`} className="block text-sm sm:text-base hover:text-dua-accent transition-colors duration-300 break-all">
            {contactEmail}
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 sm:space-x-8 mb-4 sm:mb-6">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-xl sm:text-2xl hover:text-dua-accent transition-all duration-300 hover:scale-110 transform">
            <FaFacebookF />
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-xl sm:text-2xl hover:text-dua-accent transition-all duration-300 hover:scale-110 transform">
            <FaInstagram />
          </a>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-xl sm:text-2xl hover:text-dua-accent transition-all duration-300 hover:scale-110 transform">
            <FaYoutube />
          </a>
          <a href={`mailto:${contactEmail}`} aria-label="Email" className="text-xl sm:text-2xl hover:text-dua-accent transition-all duration-300 hover:scale-110 transform">
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-gray-300">&copy; {currentYear} Dua Property. All rights reserved.</p>
        <p className="mt-1 text-xs sm:text-sm text-dua-accent">Unlock Your Future with Us</p>
      </div>
    </footer>
  );
}

export default Footer;
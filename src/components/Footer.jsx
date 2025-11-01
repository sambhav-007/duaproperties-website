// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa'; 

function Footer() {
  const currentYear = new Date().getFullYear();
  const facebookUrl = "https://www.facebook.com/share/19Kioy5Sco/"; 
  const instagramUrl = "https://www.instagram.com/_duaproperties?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="; 
  const youtubeUrl = "https://youtube.com/your-channel"; // Replace
  const contactNumber = "+91 99960 09729"; 
  const contactEmail = "duaproperty123@gmail.com";

  return (
    <footer className="bg-dua-primary text-dua-bg-light p-8 shadow-inner mt-auto"> {/* Adjusted padding */}
      <div className="container mx-auto text-center">
        {/* Contact Info */}
        <div className="mb-4">
          <p className="font-semibold text-lg mb-1">Contact Us:</p>
          <a href={`tel:${contactNumber.replace(/\s/g, '')}`} className="block hover:text-dua-accent transition-colors duration-300"> {/* Added block for separate lines */}
            {contactNumber}
          </a>
          <a href={`mailto:${contactEmail}`} className="block hover:text-dua-accent transition-colors duration-300 mt-1"> {/* Email link */}
            {contactEmail}
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-2xl hover:text-dua-accent transition-colors duration-300">
            <FaFacebookF />
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-2xl hover:text-dua-accent transition-colors duration-300">
            <FaInstagram />
          </a>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-2xl hover:text-dua-accent transition-colors duration-300">
            <FaYoutube />
          </a>
          <a href={`mailto:${contactEmail}`} aria-label="Email" className="text-2xl hover:text-dua-accent transition-colors duration-300"> {/* Email icon */}
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm">&copy; {currentYear} Dua Property. All rights reserved.</p>
        <p className="mt-1 text-xs text-gray-300">Unlock Your Future with Us</p>
      </div>
    </footer>
  );
}

export default Footer;
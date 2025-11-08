// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-dua-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-dua-accent">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?types=Residential%20Plot" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  Residential Plots
                </Link>
              </li>
              <li>
                <Link to="/properties?types=Apartment,Independent%20Floor" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  Apartments & Floors
                </Link>
              </li>
              <li>
                <Link to="/properties?types=Commercial" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  Commercial Spaces
                </Link>
              </li>
              <li>
                <Link to="/properties?types=Villa" className="text-sm hover:text-dua-accent transition-colors duration-300 inline-block">
                  Luxury Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-dua-accent">Contact Us</h3>
            <div className="space-y-2">
              <a href={`tel:${contactNumber.replace(/\s/g, '')}`} className="block text-sm hover:text-dua-accent transition-colors duration-300">
                {contactNumber}
              </a>
              <a href={`mailto:${contactEmail}`} className="block text-sm hover:text-dua-accent transition-colors duration-300 break-all">
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Links & Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <div className="flex justify-center space-x-6 sm:space-x-8 mb-4">
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
      </div>
    </footer>
  );
}

export default Footer;
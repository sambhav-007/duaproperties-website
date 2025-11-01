// src/components/WhatsAppButton.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  const whatsappNumber = "919996009729"; 
  const message = "Hello, I'm interested in Dua Property services. Could you please provide more information?"; // Optional pre-filled message

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center animate-pulse hover:animate-none"
      aria-label="WhatsApp Us"
      style={{ width: '56px', height: '56px' }} // Slightly smaller for mobile
    >
      <FaWhatsapp className="text-2xl sm:text-3xl" />
    </a>
  );
}

export default WhatsAppButton;
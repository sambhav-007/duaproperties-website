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
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center"
      aria-label="WhatsApp Us"
      style={{ width: '60px', height: '60px' }} // Explicit size for roundness
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}

export default WhatsAppButton;
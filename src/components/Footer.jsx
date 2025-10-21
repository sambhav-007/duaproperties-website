// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dua-primary text-white p-6 text-center shadow-inner mt-auto">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Dua Properties. All rights reserved.</p>
        <p className="mt-2 text-sm">Unlock Your Future with Us</p>
      </div>
    </footer>
  );
}

export default Footer;
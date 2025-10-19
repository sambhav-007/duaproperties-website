// src/pages/ContactPage.jsx
import React from 'react';

function ContactPage() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold text-dua-dark-green mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">We'd love to hear from you. Reach out with any inquiries!</p>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <form>
          <div className="mb-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dua-dark-green" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dua-dark-green" />
          </div>
          <div className="mb-4">
            <textarea placeholder="Your Message" rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dua-dark-green"></textarea>
          </div>
          <button type="submit" className="bg-dua-dark-green text-white py-3 px-6 rounded-md hover:bg-dua-gold transition-colors duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
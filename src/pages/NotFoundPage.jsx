// src/src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-5xl font-extrabold text-dua-dark-green mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="inline-block bg-dua-dark-green text-white py-3 px-6 rounded-md hover:bg-dua-gold transition-colors duration-300 text-lg">
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
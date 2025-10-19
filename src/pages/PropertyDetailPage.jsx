// src/pages/PropertyDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

import propertiesData from '../data/properties.json';

function PropertyDetailPage() {
  const { id } = useParams();
  const property = propertiesData.find(p => p.id === id);

  if (!property) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Property Not Found</h1>
        <p className="text-gray-700 mt-4">The property you are looking for does not exist.</p>
        <Link to="/properties" className="mt-6 inline-block bg-dua-dark-green text-white py-2 px-4 rounded hover:bg-dua-gold transition-colors duration-300">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link to="/properties" className="text-dua-dark-green hover:underline mb-4 inline-block">&larr; Back to Properties</Link>
      <h1 className="text-4xl font-bold text-dua-dark-green mb-4">{property.name}</h1>
      <p className="text-2xl text-dua-gold font-semibold mb-6">{property.price}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <img src={property.image_main} alt={property.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Overview</h2>
          <p className="text-lg text-gray-700 mb-4">{property.description}</p>
          <ul className="list-disc list-inside text-gray-600">
            <li><strong>Location:</strong> {property.location}</li>
            <li><strong>Type:</strong> {property.type}</li>
            <li><strong>Status:</strong> {property.status}</li>
            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
            <li><strong>Bathrooms:</strong> {property.bathrooms}</li>
            <li><strong>Area:</strong> {property.area_sqft} Sq Ft</li>
          </ul>
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Key Features</h3>
          <ul className="list-disc list-inside text-gray-600">
            {property.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {property.images_gallery && property.images_gallery.length > 1 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.images_gallery.map((img, index) => (
              <img key={index} src={img} alt={`${property.name} gallery ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-sm" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetailPage;
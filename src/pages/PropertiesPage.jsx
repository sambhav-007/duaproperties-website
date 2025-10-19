// src/pages/PropertiesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import propertiesData from '../data/properties.json'; // Import your property data

function PropertiesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-dua-dark-green mb-6 text-center">Our Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertiesData.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={property.image_main} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
              <p className="text-dua-gold font-bold mt-1">{property.price}</p>
              <p className="text-gray-600 text-sm mt-2">{property.location}</p>
              <p className="text-gray-500 text-sm">
                {property.bedrooms} Beds | {property.bathrooms} Baths | {property.area_sqft} Sq Ft
              </p>
              <Link to={`/property/${property.id}`} className="mt-4 inline-block bg-dua-dark-green text-white py-2 px-4 rounded hover:bg-dua-gold transition-colors duration-300">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertiesPage;
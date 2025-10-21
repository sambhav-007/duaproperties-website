// src/pages/PropertiesPage.jsx
import React from 'react';
import propertiesData from '../data/properties.json'; // Import your property data
import PropertyCard from '../components/PropertyCard'; // <-- IMPORT PropertyCard

function PropertiesPage() {
  return (
    <div className="container mx-auto py-12 px-4"> {/* Added padding */}
      <h1 className="text-3xl font-bold text-dua-dark-green mb-8 text-center">
        Our Properties
      </h1>
      {propertiesData && propertiesData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
          {propertiesData.map(property => (
            <PropertyCard key={property.id} property={property} /> // <-- USE PropertyCard
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No properties listed currently.</p>
      )}
    </div>
  );
}

export default PropertiesPage;
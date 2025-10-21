// src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, BuildingOffice2Icon, BanknotesIcon } from '@heroicons/react/24/outline'; // Optional icons

function PropertyCard({ property }) {
  if (!property) return null; // Handle case where property is undefined

  // Helper function to format price (optional)
  const formatPrice = (price) => {
    // Basic formatting, you might want a more robust solution later
    return price.replace(/crore/i, 'Cr').replace(/lakh/i, 'L');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/property/${property.id}`} className="block">
        <img
          src={property.image_main}
          alt={`Image of ${property.name}`}
          className="w-full h-56 object-cover" // Increased height
          onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png" }} // Basic fallback image
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-dua-text mb-1 truncate">{property.name}</h3>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPinIcon className="h-4 w-4 mr-1 inline-block text-gray-500" /> {/* Icon */}
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm mb-3">
            <BuildingOffice2Icon className="h-4 w-4 mr-1 inline-block text-gray-500" /> {/* Icon */}
            <span>{property.type}</span>
            {property.bedrooms && <span> • {property.bedrooms} BHK</span>}
            {property.area_sqft && <span> • {property.area_sqft} Sq.Ft.</span>}
             {property.min_plot_size_sqyd && <span> • {property.min_plot_size_sqyd}-{property.max_plot_size_sqyd} Sq.Yd.</span>}
          </div>

          <div className="flex justify-between items-center mt-3">
             <p className="text-dua-accent font-bold text-lg">{formatPrice(property.price)}</p>
             <span className={`text-xs font-semibold px-2 py-1 rounded ${property.status === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
               For {property.status}
             </span>
           </div>

        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
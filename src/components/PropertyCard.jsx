// src/components/PropertyCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, BuildingOffice2Icon, HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function PropertyCard({ property }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (!property) return null;

  const formatPrice = (price) => {
    return price.replace(/crore/i, 'Cr').replace(/lakh/i, 'L').replace(/₹/g, '₹');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-dua-primary hover:-translate-y-2 h-full flex flex-col"
    >
      <Link to={`/property/${property.id}`} className="flex flex-col h-full">
        {/* Image Container with Overlay */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-300 w-full h-full"></div>
            </div>
          )}
          <img
            src={property.image_main}
            alt={`Image of ${property.name}`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = "/images/placeholder.png";
              setImageLoaded(true);
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold shadow-lg border ${
              property.status === 'Sale' 
                ? 'bg-emerald-500 text-white border-emerald-600' 
                : 'bg-blue-500 text-white border-blue-600'
            }`}>
              For {property.status}
            </span>
          </div>

          {/* RERA Badge if available */}
          {property.rera_id && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold bg-dua-accent text-white shadow-lg border border-amber-600">
                RERA Approved
              </span>
            </div>
          )}
        </div>

        {/* Content - Takes remaining space */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Property Name */}
          <h3 className="text-lg sm:text-xl font-bold text-dua-text mb-2 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] group-hover:text-dua-primary transition-colors duration-300">
            {property.name}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-2 text-dua-body text-sm mb-3">
            <MapPinIcon className="h-5 w-5 flex-shrink-0 text-dua-primary mt-0.5" />
            <span className="line-clamp-2">{property.location}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-2 text-dua-body text-sm mb-4 pb-4 border-b border-gray-200">
            <BuildingOffice2Icon className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap items-center gap-1">
              <span className="font-medium text-dua-text">{property.type}</span>
              {property.bedrooms && <span className="text-gray-400">•</span>}
              {property.bedrooms && <span>{property.bedrooms} BHK</span>}
              {property.configuration && <span className="text-gray-400">•</span>}
              {property.configuration && <span className="text-xs">{property.configuration}</span>}
            </div>
          </div>

          {/* Spacer to push price and button to bottom */}
          <div className="flex-grow"></div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Starting from</p>
              <p className="text-xl sm:text-2xl font-bold text-dua-primary">
                {formatPrice(property.price)}
              </p>
            </div>
            
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-1 text-dua-text font-semibold text-xs sm:text-sm group-hover:text-dua-primary transition-colors duration-300"
            >
              <span>Details</span>
              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
          </div>

          {/* Developer Info if available */}
          {property.developer && (
            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                By <span className="font-semibold text-dua-text">{property.developer}</span>
              </p>
            </div>
          )}

          {/* View Details Button - Always visible */}
          <div className="mt-3 sm:mt-4">
            <button className="w-full bg-dua-accent hover:bg-amber-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              <span>View Full Details</span>
              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default PropertyCard;
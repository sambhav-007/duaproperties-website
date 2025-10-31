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
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <Link to={`/property/${property.id}`} className="block">
        {/* Image Container with Overlay */}
        <div className="relative h-64 overflow-hidden bg-gray-200">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
              property.status === 'Sale' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-blue-500/90 text-white'
            }`}>
              For {property.status}
            </span>
          </div>

          {/* RERA Badge if available */}
          {property.rera_id && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-dua-primary shadow-lg backdrop-blur-sm">
                RERA Approved
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Property Name */}
          <h3 className="text-xl font-bold text-dua-text mb-2 line-clamp-2 group-hover:text-dua-accent transition-colors duration-300">
            {property.name}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-2 text-gray-600 text-sm mb-3">
            <MapPinIcon className="h-5 w-5 flex-shrink-0 text-dua-accent mt-0.5" />
            <span className="line-clamp-2">{property.location}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-2 text-gray-700 text-sm mb-4 pb-4 border-b border-gray-100">
            <BuildingOffice2Icon className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap items-center gap-1">
              <span className="font-medium">{property.type}</span>
              {property.bedrooms && <span className="text-gray-400">•</span>}
              {property.bedrooms && <span>{property.bedrooms} BHK</span>}
              {property.configuration && <span className="text-gray-400">•</span>}
              {property.configuration && <span className="text-xs">{property.configuration}</span>}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Starting from</p>
              <p className="text-2xl font-bold text-dua-accent">
                {formatPrice(property.price)}
              </p>
            </div>
            
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-1 text-dua-primary font-semibold text-sm group-hover:text-dua-accent transition-colors duration-300"
            >
              <span>Details</span>
              <ArrowRightIcon className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Developer Info if available */}
          {property.developer && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                By <span className="font-semibold text-gray-700">{property.developer}</span>
              </p>
            </div>
          )}
        </div>

        {/* Hover View Details Button */}
        <div className="px-5 pb-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="w-full bg-dua-primary text-white py-3 rounded-lg font-semibold hover:bg-dua-accent transition-colors duration-300 flex items-center justify-center gap-2">
            <span>View Full Details</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

export default PropertyCard;
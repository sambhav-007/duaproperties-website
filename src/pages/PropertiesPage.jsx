// src/pages/PropertiesPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';

const locationFilters = ['All Locations', 'Mohali', 'Chandigarh', 'Kharar', 'Dubai'];

const getPropertyRegion = (locationString) => {
  if (!locationString) return 'Other';
  const lowerLocation = locationString.toLowerCase();
  if (lowerLocation.includes('dubai') || lowerLocation.includes('uae')) return 'Dubai';
  if (lowerLocation.includes('kharar')) return 'Kharar';
  if (lowerLocation.includes('chandigarh')) return 'Chandigarh';
  if (lowerLocation.includes('mohali')) return 'Mohali';
  return 'Other';
};

function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState('All Locations');
  const [loading, setLoading] = useState(true);
  const [allProperties, setAllProperties] = useState([]);

  // Simulate loading delay for skeletons
  useEffect(() => {
    setTimeout(() => {
      setAllProperties(propertiesData);
      setLoading(false);
    }, 500); // 0.5s delay
  }, []);

  const filteredProperties = useMemo(() => {
    if (activeFilter === 'All Locations') return allProperties;
    return allProperties.filter(property => getPropertyRegion(property.location) === activeFilter);
  }, [activeFilter, allProperties]);

  return (
    <>
      <Helmet>
        <title>All Properties for Sale in Tricity & Dubai | Dua Property</title>
        <meta
          name="description"
          content="Explore all residential and commercial properties for sale by Dua Property. Find luxury apartments, independent homes, and residential plots in prime locations across Mohali, Chandigarh, Kharar (Tricity area) AND exclusive projects in Dubai, UAE."
        />
        <meta
          name="keywords"
          content="properties Mohali, real estate Chandigarh, apartments for sale Kharar, residential plots, commercial properties, luxury homes Tricity, Dubai properties, UAE real estate, Dua Property listings"
        />
      </Helmet>

      <div className="bg-dua-primary pt-12">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-white mb-2 text-center animate-fade-in">
            Our Properties: Homes & Investments for Sale in Tricity & Dubai
          </h1>
          <p className="text-lg text-white mb-10 text-center max-w-3xl mx-auto animate-fade-in">
            Browse Dua Property's full selection across Tricity and Dubai.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {locationFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200
                  ${activeFilter === filter
                    ? 'bg-dua-accent text-dua-primary shadow-md'
                    : 'bg-white text-dua-text hover:bg-gray-300'
                  } animate-fade-in
                `}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          <div className="bg-white p-6 rounded-lg shadow-xl">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <p className="text-lg text-dua-text mb-6 text-center">
                  Showing <strong>{filteredProperties.length}</strong> of {allProperties.length} listings {activeFilter === 'All Locations' ? 'globally' : `in ${activeFilter}`}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600 mt-10">
                No properties listed currently. Please check back soon for new listings from Dua Property.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease forwards;
          }
        `}
      </style>
    </>
  );
}

export default PropertiesPage;

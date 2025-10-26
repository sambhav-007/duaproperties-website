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
    const timer = setTimeout(() => {
      setAllProperties(propertiesData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = useMemo(() => {
    if (activeFilter === 'All Locations') return allProperties;
    return allProperties.filter(
      (property) => getPropertyRegion(property.location) === activeFilter
    );
  }, [activeFilter, allProperties]);

  return (
    <>
      <Helmet>
        <title>Properties for Sale | Mohali, Chandigarh, Kharar & Dubai | Dua Property</title>
        <meta
          name="description"
          content="Find luxury apartments, villas, and plots for sale across Mohali, Chandigarh, Kharar, and Dubai. Browse verified listings from Dua Property for your next investment."
        />
        <meta
          name="keywords"
          content="Dua Property listings, real estate Mohali, houses for sale Chandigarh, properties Kharar, Dubai real estate, buy apartment, commercial plots"
        />
        <meta property="og:title" content="Dua Property | Premium Listings in Tricity & Dubai" />
        <meta
          property="og:description"
          content="Discover high-value investment and residential properties in Mohali, Chandigarh, Kharar, and Dubai with Dua Property."
        />
      </Helmet>

      <div className="bg-dua-primary min-h-screen pt-32 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-3 text-center animate-fade-slide">
            Premium Properties for Sale in Tricity & Dubai
          </h1>
          <p className="text-lg text-white/90 mb-12 text-center max-w-3xl mx-auto animate-fade-slide">
            Explore handpicked listings from Dua Property — find your next dream home or investment
            opportunity in Mohali, Chandigarh, Kharar, or Dubai.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {locationFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300
                  ${
                    activeFilter === filter
                      ? 'bg-dua-accent text-dua-primary shadow-lg scale-105'
                      : 'bg-white text-dua-text hover:bg-gray-200 hover:scale-105'
                  } animate-fade-slide`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl animate-fade-in">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 rounded-xl h-96 shadow-inner"
                  ></div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <p className="text-lg text-dua-text mb-6 text-center">
                  Showing <strong>{filteredProperties.length}</strong> of{' '}
                  {allProperties.length} listings{' '}
                  {activeFilter === 'All Locations' ? 'globally' : `in ${activeFilter}`}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600 mt-10">
                No properties currently listed. Please check back soon for new projects from Dua
                Property.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fade-slide {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          .animate-fade-slide {
            animation: fade-slide 0.8s ease-out forwards;
          }
        `}
      </style>
    </>
  );
}

export default PropertiesPage;

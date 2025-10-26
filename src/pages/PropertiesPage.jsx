// src/pages/PropertiesPage.jsx
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'framer-motion';

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

  const filteredProperties = useMemo(() => {
    if (activeFilter === 'All Locations') return propertiesData;
    return propertiesData.filter(property => getPropertyRegion(property.location) === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <Helmet>
        <title>All Properties for Sale in Tricity & Dubai | Dua Property</title>
        <meta
          name="description"
          content="Explore all residential and commercial properties for sale by Dua Property. Find luxury apartments, independent homes, and residential plots in prime locations across Mohali, Chandigarh, Kharar and exclusive projects in Dubai, UAE."
        />
        <meta
          name="keywords"
          content="properties Mohali, real estate Chandigarh, apartments for sale Kharar, residential plots, commercial properties, luxury homes Tricity, Dubai properties, UAE real estate, Dua Property listings"
        />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-dua-primary/90 via-dua-primary/80 to-dua-primary/90 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-dua-accent mb-4"
          >
            Explore Our Properties
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-white max-w-3xl mx-auto"
          >
            Browse premium residential and commercial properties in Tricity & Dubai. Find your dream home or investment opportunity.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-dua-bg-light py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {locationFilters.map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300
                  ${activeFilter === filter
                    ? 'bg-dua-accent text-dua-primary shadow-lg'
                    : 'bg-white text-dua-text hover:bg-gray-200'}`
                }
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Showing Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center text-dua-text text-lg mb-6"
          >
            Showing <span className="font-bold">{filteredProperties.length}</span> of <span className="font-bold">{propertiesData.length}</span> listings {activeFilter === 'All Locations' ? 'globally' : `in ${activeFilter}`}
          </motion.p>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, idx) => (
                <motion.div
                  key={property.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10 text-lg">
              No properties found for this location. Please try a different filter.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default PropertiesPage;

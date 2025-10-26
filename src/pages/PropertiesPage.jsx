// src/pages/PropertiesPage.jsx
import React, { useState, useMemo } from 'react'; // <-- ADD useState and useMemo
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';

// Define all available categories (The filter options)
const locationFilters = ['All Locations', 'Mohali', 'Chandigarh', 'Kharar', 'Dubai'];

// Helper function to determine the region from the location string
const getPropertyRegion = (locationString) => {
  if (!locationString) return 'Other';
  const lowerLocation = locationString.toLowerCase();
  // We prioritize the most specific and then the broader region
  if (lowerLocation.includes('dubai') || lowerLocation.includes('uae')) return 'Dubai';
  if (lowerLocation.includes('kharar')) return 'Kharar';
  if (lowerLocation.includes('chandigarh')) return 'Chandigarh';
  if (lowerLocation.includes('mohali')) return 'Mohali';
  return 'Other';
};

function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState('All Locations'); // State for active filter

  // Use useMemo to filter properties only when the filter changes
  const filteredProperties = useMemo(() => {
    if (activeFilter === 'All Locations') {
      return propertiesData;
    }

    // Return properties where the region matches the active filter
    return propertiesData.filter(property => {
      const region = getPropertyRegion(property.location);
      return region === activeFilter;
    });
  }, [activeFilter]);


  return (
    <>
      <Helmet>
        <title>All Properties for Sale in Tricity & Dubai | Dua Property</title>
        <meta
          name="description"
          content="Explore all residential and commercial properties for sale by Dua Property. Find luxury apartments, independent homes, and residential plots in prime locations across Mohali, Chandigarh, Kharar (Tricity area) AND exclusive projects in Dubai, UAE."
        />
        <meta name="keywords" content="properties Mohali, real estate Chandigarh, apartments for sale Kharar, residential plots, commercial properties, luxury homes Tricity, Dubai properties, UAE real estate, Dua Property listings" />
      </Helmet>

      {/* Page Content Wrapper (Dark background for transparent navbar contrast) */}
      <div className="bg-dua-primary pt-12">
        <div className="container mx-auto py-8 px-4">
          
          {/* Main heading */}
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            Our Properties: Homes & Investments for Sale in Tricity & Dubai
          </h1>
          <p className="text-lg text-white mb-10 text-center max-w-3xl mx-auto">
            Browse Dua Property's full selection across Tricity and Dubai.
          </p>

          {/* --- Location Filter Buttons --- */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {locationFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200
                  ${activeFilter === filter
                    ? 'bg-dua-accent text-dua-primary shadow-md' // Active state: Gold button with dark text
                    : 'bg-white text-dua-text hover:bg-gray-300' // Inactive state: White button
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
          {/* --- End Filter Buttons --- */}

          {/* Properties Grid Area */}
          <div className="bg-white p-6 rounded-lg shadow-xl"> {/* White block to contain the grid */}
            
            {propertiesData && propertiesData.length > 0 ? (
              <>
                <p className="text-lg text-dua-text mb-6 text-center">
                  Showing **{filteredProperties.length}** of {propertiesData.length} listings {activeFilter === 'All Locations' ? 'globally' : `in ${activeFilter}`}.
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
    </>
  );
}

export default PropertiesPage;
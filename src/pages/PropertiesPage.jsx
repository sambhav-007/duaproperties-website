// src/pages/PropertiesPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';

function PropertiesPage() {
  return (
    <> {/* Use a React Fragment to wrap Helmet and the rest of the content */}
      <Helmet>
        <title>All Properties for Sale in Tricity & Dubai | Dua Property</title> 
        <meta
          name="description"
          content="Explore all residential and commercial properties for sale by Dua Property. Find luxury apartments, independent homes, and residential plots in prime locations across Mohali, Chandigarh, Kharar (Tricity area) AND exclusive projects in Dubai, UAE." 
        />
        <meta name="keywords" content="properties Mohali, real estate Chandigarh, apartments for sale Kharar, residential plots, commercial properties, luxury homes Tricity, Dubai properties, UAE real estate, Dua Property listings" />
      </Helmet>
      <div className="bg-dua-primary pt-12">
      <div className="container mx-auto py-12 px-4">
        {/* Main heading for the page, descriptive and keyword-rich */}
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Our Properties: Homes & Investments for Sale in Tricity & Dubai 
        </h1>
        <p className="text-lg text-white mb-10 text-center max-w-3xl mx-auto">
          Browse Dua Property's curated selection of premium residential and commercial properties. Whether you're seeking a dream home, a strategic investment, or an ideal business location, discover unparalleled opportunities across the vibrant Tricity region and the dynamic market of Dubai.
        </p>

        {propertiesData && propertiesData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertiesData.map(property => (
              // PropertyCard component should handle its own SEO (image alt, descriptive links)
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No properties listed currently. Please check back soon for new listings from Dua Property.
          </p>
        )}
      </div>
    </div>
    </>
  );
}

export default PropertiesPage;
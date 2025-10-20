// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import propertiesData from '../data/properties.json'; // Import property data
import PropertyCard from '../components/PropertyCard'; // Import the card component

// Define a background image URL (replace with a high-quality image URL or local path)
const heroImageUrl = '/images/hero-background.avif'; // Place a 'hero-background.jpg' in public/images/

function HomePage() {
  // Select properties to feature (e.g., first 3)
  const featuredProperties = propertiesData.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
            Discover premium residential and commercial properties with Dua Properties. Your future starts here.
          </p>
          <Link
            to="/properties"
            className="bg-dua-gold text-dua-dark-green font-bold py-3 px-8 rounded-md text-lg hover:bg-opacity-90 transition duration-300"
          >
            Explore Listings
          </Link>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50"> {/* Light gray background */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dua-dark-green mb-10">
            Featured Properties
          </h2>
          {featuredProperties && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured properties available at the moment.</p>
          )}
          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="inline-block bg-dua-dark-green text-white py-3 px-6 rounded-md hover:bg-dua-gold transition-colors duration-300 text-lg"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* You can add more sections here (e.g., About Us summary, Testimonials) */}

    </div>
  );
}

export default HomePage;
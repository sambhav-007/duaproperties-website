// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import BlurText from '../components/BlurText';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

const heroImageUrl = '/images/hero-background.jpg'; 

function HomePage() {
  const featuredProperties = propertiesData.slice(0, 3); // Get first 3 properties for featured section

  return (
    <> {/* Use a React Fragment to wrap Helmet and the rest of the content */}
      <Helmet>
        <title>Dua Property | Find Dream Properties in Mohali, Chandigarh, Kharar & Dubai</title>
        <meta
          name="description"
          content="Discover premium residential and commercial properties with Dua Property. Your trusted real estate partner for luxury apartments, residential plots, and investment opportunities across Mohali, Chandigarh, Kharar, and Dubai."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-dua-bg-dark text-white h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image/Video - Placeholder for now */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        </div>

        <div className="relative z-10 text-center px-4">
          {/* This is where we'll use GradientText */}
          <GradientText
            colors={["#FFD700", "#FF8C00", "#FFD700"]} // Gold/Orange Gradient for Luxury
            animationSpeed={5} // Slightly slower for elegance
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4" // Tailwind classes for sizing/weight
          >
            Discover Your Next Legacy.
          </GradientText>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Premium Real Estate in Tricity & Dubai. Elevated Living, Unmatched Investment.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/properties" className="bg-dua-accent text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300">
              Explore Properties
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-dua-primary transition-all duration-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dua-primary mb-4">
            Why Choose Dua Property for Real Estate in Tricity?
          </h2>
          <p className="text-lg text-dua-body mb-12 max-w-2xl mx-auto">
            We are committed to providing exceptional service and finding the perfect property solutions for our clients in the <strong>Mohali, Chandigarh, and Kharar (Tricity)</strong> area. Trust Dua Property for your next home or investment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="h-12 w-12 text-dua-accent mb-3" />
              <h3 className="text-xl font-semibold text-dua-text mb-2">Trusted Real Estate Expertise</h3>
              <p className="text-dua-body text-sm">Years of experience and deep <strong>Mohali property market</strong> knowledge ensure you get the best advice.</p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <MapPinIcon className="h-12 w-12 text-dua-accent mb-3" />
              <h3 className="text-xl font-semibold text-dua-text mb-2">Prime Property Locations</h3>
              <p className="text-dua-body text-sm">Access to premium properties in <strong>Mohali, Chandigarh, Kharar, Dubai</strong>, and surrounding areas.</p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <UserGroupIcon className="h-12 w-12 text-dua-accent mb-3" />
              <h3 className="text-xl font-semibold text-dua-text mb-2">Client-Centric Property Advisors</h3>
              <p className="text-dua-body text-sm">We prioritize your needs, offering personalized service from start to finish for your <strong>dream home</strong>.</p>
            </div>
            {/* Feature 4 */}
            <div className="flex flex-col items-center">
              <CurrencyRupeeIcon className="h-12 w-12 text-dua-accent mb-3" />
              <h3 className="text-xl font-semibold text-dua-text mb-2">Value & Transparent Dealings</h3>
              <p className="text-dua-body text-sm">Honest dealings and competitive pricing for maximum value on your <strong>real estate investment</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-dua-bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dua-primary mb-10">
            Explore Our Featured Properties in Mohali, Chandigarh & Dubai
          </h2>
          {featuredProperties && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured properties available at the moment. Please check back soon!</p>
          )}
          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="inline-block bg-dua-primary text-white py-3 px-6 rounded-md hover:bg-dua-accent transition-colors duration-300 text-lg"
              aria-label="View all residential and commercial properties" // Added for accessibility
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
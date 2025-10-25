// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import BlurText from '../components/BlurText';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

const heroVideoUrl = '/videos/hero-background-video.mp4';
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

    {/* Hero Section with Video Background */}
      <section
        className="relative h-[70vh] md:h-[80vh] text-white flex items-center justify-center overflow-hidden" // Adjusted height, removed bg-cover/bg-center
      >
        {/* Video Background */}
        <video
          autoPlay // Start playing automatically
          loop // Loop the video
          muted // Mute the video (often required for autoplay)
          playsInline // Important for mobile browsers (iOS especially)
          className="absolute top-0 left-0 w-full h-full object-cover z-0" // Cover the area, position behind content
          src={heroVideoUrl}
          type="video/mp4" // Specify video type
        >
          {/* Fallback for browsers that don't support the video tag */}
          Your browser does not support the video tag. Try updating it.
          {/* You could optionally add a poster attribute: poster="/images/hero-fallback-image.jpg" */}
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Content Overlay */}
        <div className="relative z-20 text-center px-4"> {/* Increased z-index */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-center">
            <BlurText
              text="Find Your Dream Property!"
              delay={230}
              animateBy="words"
              direction="top"
              className="inline-block"
            />
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
            Discover premium residential and commercial properties with Dua Property across Tricity & Dubai. Your future starts here.
          </p>
          <Link
            to="/properties"
            className="bg-dua-accent text-dua-primary font-bold py-3 px-8 rounded-md text-lg hover:bg-opacity-90 transition duration-300"
            aria-label="Explore all property listings"
          >
            Explore Listings
          </Link>
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
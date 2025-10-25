// src/pages/HomePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import BlurText from '../components/BlurText';
import Loader from '../components/Loader';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

const heroVideoUrl = '/videos/hero-background-video.mp4';
// Removed unused heroImageUrl constant

function HomePage() {
  const featuredProperties = propertiesData.slice(0, 3);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoLoad = () => {
      console.log("Video loaded!");
      setIsVideoLoading(false);
    };

    if (videoElement.readyState >= 3) {
      handleVideoLoad();
    } else {
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      videoElement.addEventListener('canplaythrough', handleVideoLoad);
    }

    return () => {
      videoElement.removeEventListener('loadeddata', handleVideoLoad);
      videoElement.removeEventListener('canplaythrough', handleVideoLoad);
    };
  }, []);

  // !!! REMOVED THE DUPLICATE return (<></>) HERE !!!

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
        className="relative h-[70vh] md:h-[80vh] text-white flex items-center justify-center overflow-hidden bg-dua-bg-dark" // Added dark background as fallback
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ease-in-out ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
          src={heroVideoUrl}
          type="video/mp4"
        >
          Your browser does not support the video tag. Try updating it.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-65 z-10"></div> {/* Adjusted opacity slightly */}

        {/* Content Overlay */}
        <div className="relative z-20 text-center px-4">
          {isVideoLoading ? (
            <Loader />
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-center">
                <BlurText
                  text="Find Your Dream Property!"
                  delay={230}
                  animateBy="words"
                  direction="top"
                  className="inline-block text-dua-accent" // Assuming you want gold text
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
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dua-primary mb-4">
            Why Choose Dua Property for Real Estate in Tricity & Dubai? {/* UPDATED HEADING */}
          </h2>
          <p className="text-lg text-dua-body mb-12 max-w-2xl mx-auto">
            We are committed to providing exceptional service and finding the perfect property solutions for our clients in the <strong>Tricity area (Mohali, Chandigarh, Kharar)</strong> and <strong>Dubai</strong>. Trust Dua Property for your next home or investment. {/* UPDATED TEXT */}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="h-12 w-12 text-dua-accent mb-3" />
              <h3 className="text-xl font-semibold text-dua-text mb-2">Trusted Real Estate Expertise</h3>
              <p className="text-dua-body text-sm">Years of experience and deep market knowledge ensure you get the best advice in both Tricity and Dubai.</p> {/* UPDATED TEXT */}
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
              <p className="text-dua-body text-sm">We prioritize your needs, offering personalized service for your <strong>dream home</strong> search.</p>
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
            Explore Our Featured Properties in Tricity & Dubai {/* UPDATED HEADING */}
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
              aria-label="View all residential and commercial properties"
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
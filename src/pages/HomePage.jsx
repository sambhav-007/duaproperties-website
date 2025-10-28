// src/pages/HomePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import HotPropertiesCarousel from '../components/HotPropertiesCarousel';
import BlurText from '../components/BlurText';
import Loader from '../components/Loader';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const heroVideoUrl = '/videos/hero-background-video.mp4';

function HomePage() {
  const hotProperties = propertiesData.slice(0, 9); // Get 9 properties for carousel
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoLoad = () => setIsVideoLoading(false);

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

  return (
    <>
      <Helmet>
        <title>Dua Property | Find Dream Properties in Mohali, Chandigarh, Kharar & Dubai</title>
        <meta
          name="description"
          content="Discover premium residential and commercial properties with Dua Property. Your trusted real estate partner for luxury apartments, residential plots, and investment opportunities across Mohali, Chandigarh, Kharar, and Dubai."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] text-white flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
          src={heroVideoUrl}
          type="video/mp4"
        />

        {/* Gradient overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4">
          {isVideoLoading ? (
            <Loader />
          ) : (
            <>
              <motion.h1
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-center"
              >
                <BlurText
                  text="Find Your Dream Property!"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  className="inline-block text-dua-accent"
                />
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
              >
                Discover premium residential and commercial properties across Tricity & Dubai. Your future starts here.
              </motion.p>

              <Link
                to="/properties"
                className="inline-block bg-dua-accent text-dua-primary font-bold py-4 px-10 rounded-md text-lg shadow-lg shadow-dua-accent/30
                           transition-transform duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Explore Listings
              </Link>

              {/* Scroll down hint */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-12 text-dua-accent text-2xl"
              >
                &#x2193;
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-bold text-dua-primary mb-6"
          >
            Why Choose Dua Property?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-dua-body mb-12 max-w-3xl mx-auto"
          >
            Exceptional service and perfect property solutions in the Tricity area (Mohali, Chandigarh, Kharar) and Dubai. Trust Dua Property for your next home or investment.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: ShieldCheckIcon, title: 'Trusted Expertise', desc: 'Years of experience and deep market knowledge.' },
              { icon: MapPinIcon, title: 'Prime Locations', desc: 'Access to premium properties in Tricity & Dubai.' },
              { icon: UserGroupIcon, title: 'Client-Centric', desc: 'Personalized service for your dream home.' },
              { icon: CurrencyRupeeIcon, title: 'Transparent Deals', desc: 'Honest pricing for maximum value.' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <feature.icon className="h-14 w-14 text-dua-accent mb-4" />
                <h3 className="text-xl font-semibold text-dua-text mb-2">{feature.title}</h3>
                <p className="text-dua-body text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Properties - Netflix Style Carousel */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-8 px-4 md:px-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🔥 Hot Properties
            </h2>
            <p className="text-gray-300 text-lg">
              Explore our most sought-after properties
            </p>
          </motion.div>

          <HotPropertiesCarousel properties={hotProperties} />

          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="inline-block bg-dua-accent text-dua-primary font-bold py-3 px-8 rounded-md hover:bg-white transition-colors duration-300 text-lg shadow-lg"
            >
              View All Properties →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

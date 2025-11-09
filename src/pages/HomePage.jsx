// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import HeroSlideshow from '../components/HeroSlideshow';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon, HomeIcon, BuildingOfficeIcon, BuildingStorefrontIcon, HomeModernIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function HomePage() {
  // Hot properties for hero slideshow (IDs: 2, 3, 5, 9, 11)
  const hotProperties = propertiesData.filter(p => ['2', '3', '5', '9', '11'].includes(p.id));
  
  // All properties for display
  const allProperties = propertiesData;

  return (
    <>
      <Helmet>
        <title>Premium Real Estate in Mohali, Chandigarh, Kharar & Dubai | Dua Property</title>
        <meta
          name="description"
          content="Find your dream property with Dua Property - trusted real estate experts offering luxury apartments, RERA-approved residential plots & commercial properties in Mohali, Chandigarh, Kharar & Dubai. Browse 500+ verified listings."
        />
        <link rel="canonical" href="https://www.duaproperty.com/" />
        
        {/* Keywords */}
        <meta name="keywords" content="Dua Property, Mohali real estate, Chandigarh properties, Kharar plots, Dubai apartments, luxury apartments Punjab, RERA approved projects, residential plots Tricity, commercial property Mohali, property investment India" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dua Property | Premium Real Estate in Tricity & Dubai" />
        <meta property="og:description" content="Discover premium residential & commercial properties in Mohali, Chandigarh, Kharar & Dubai. RERA approved projects, luxury apartments, and investment opportunities." />
        <meta property="og:url" content="https://www.duaproperty.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.duaproperty.com/default-share-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dua Property | Premium Real Estate in Tricity & Dubai" />
        <meta name="twitter:description" content="Discover premium residential & commercial properties in Mohali, Chandigarh, Kharar & Dubai." />
        <meta name="twitter:image" content="https://www.duaproperty.com/default-share-image.png" />
      </Helmet>

      {/* Hero Slideshow Section */}
      <header>
        <HeroSlideshow properties={hotProperties} />
      </header>

      {/* Main H1 Heading Section - SEO Critical */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Premium Real Estate in Mohali, Chandigarh, Kharar & Dubai
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8 px-2"
          >
            Discover RERA-approved luxury apartments, residential plots & commercial properties with India's trusted real estate partner
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
          >
            <Link
              to="/properties"
              className="w-full sm:w-auto bg-dua-accent hover:bg-dua-accent/90 text-dua-primary font-bold py-3 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Browse All Properties
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white font-bold py-3 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900/50 backdrop-blur-sm" aria-labelledby="why-choose-us">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            id="why-choose-us"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
          >
            Why Choose Dua Property?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
          >
            Exceptional service and perfect property solutions in the Tricity area (Mohali, Chandigarh, Kharar) and Dubai. Trust Dua Property for your next home or investment.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
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
                className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 p-5 sm:p-6 rounded-xl shadow-2xl hover:shadow-[0_0_30px_rgba(193,154,107,0.2)] hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 sm:h-14 sm:w-14 text-dua-accent mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Properties Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900/30 to-gray-900/60" aria-labelledby="property-categories">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 id="property-categories" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Browse by Property Type
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
              Find your perfect property from our diverse collection of residential and commercial options
            </p>
          </motion.div>

          {/* Property Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="list">
            {[
              { 
                icon: HomeIcon, 
                title: 'Residential Plots', 
                desc: 'Premium plots for your dream home',
                types: ['Residential Plot'],
                gradient: 'from-blue-500/20 to-blue-700/20',
                borderColor: 'border-blue-500/30',
                iconColor: 'text-blue-400'
              },
              { 
                icon: BuildingOfficeIcon, 
                title: 'Apartments & Floors', 
                desc: 'Luxury apartments and independent floors',
                types: ['Apartment', 'Independent Floor'],
                gradient: 'from-purple-500/20 to-purple-700/20',
                borderColor: 'border-purple-500/30',
                iconColor: 'text-purple-400'
              },
              { 
                icon: BuildingStorefrontIcon, 
                title: 'Commercial', 
                desc: 'Prime commercial spaces for business',
                types: ['Commercial'],
                gradient: 'from-green-500/20 to-green-700/20',
                borderColor: 'border-green-500/30',
                iconColor: 'text-green-400'
              },
              { 
                icon: HomeModernIcon, 
                title: 'Villas', 
                desc: 'Exclusive villas with premium lifestyle',
                types: ['Villa'],
                gradient: 'from-orange-500/20 to-orange-700/20',
                borderColor: 'border-orange-500/30',
                iconColor: 'text-orange-400'
              }
            ].map((category, idx) => {
              const categoryProperties = allProperties.filter(p => 
                category.types.some(type => p.type?.toLowerCase() === type.toLowerCase())
              );
              const propertyCount = categoryProperties.length;
              const typeParam = category.types.join(',');
              
              return (
                <motion.div
                  key={idx}
                  role="listitem"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    to={`/properties?types=${encodeURIComponent(typeParam)}`}
                    className={`block group bg-gradient-to-br ${category.gradient} backdrop-blur-lg border ${category.borderColor} p-6 sm:p-8 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(193,154,107,0.3)] transition-all duration-500 hover:-translate-y-2 h-full`}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      <div className={`${category.iconColor} mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-16 w-16 sm:h-20 sm:w-20" />
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-dua-accent transition-colors duration-300">
                        {category.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-300 mb-4 flex-grow">
                        {category.desc}
                      </p>
                      
                      <div className="mt-auto">
                        <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/20">
                          {propertyCount} {propertyCount === 1 ? 'Property' : 'Properties'}
                        </span>
                        
                        <div className="flex items-center justify-center gap-2 text-dua-accent font-semibold mt-4 group-hover:gap-4 transition-all duration-300">
                          <span>Explore</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* View All Properties Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-dua-accent/90 backdrop-blur-sm text-dua-primary font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg text-base sm:text-lg shadow-xl hover:bg-dua-accent hover:shadow-[0_0_30px_rgba(193,154,107,0.4)] transition-all duration-300 transform hover:scale-105 border border-dua-accent/30"
            >
              <span>View All Properties</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Locations Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900/70" aria-labelledby="featured-locations">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 id="featured-locations" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Explore Properties by Location
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
              Find your perfect property in prime locations across Tricity and Dubai
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Mohali Properties', link: '/properties?location=mohali' },
              { name: 'Chandigarh Real Estate', link: '/properties?location=chandigarh' },
              { name: 'Kharar Plots & Homes', link: '/properties?location=kharar' },
              { name: 'Dubai Apartments', link: '/properties?location=dubai' }
            ].map((location, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <Link
                  to={location.link}
                  className="block bg-white/10 backdrop-blur-lg border border-white/20 p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(193,154,107,0.2)] hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{location.name}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-2">Browse properties →</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 text-center px-2">
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              Looking for expert guidance? <Link to="/about" className="text-dua-accent hover:underline font-semibold">Learn more about Dua Property</Link> or <Link to="/contact" className="text-dua-accent hover:underline font-semibold">contact our team</Link> for personalized assistance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

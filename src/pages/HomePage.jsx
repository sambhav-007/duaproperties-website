// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import HeroSlideshow from '../components/HeroSlideshow';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function HomePage() {
  // Hot properties for hero slideshow (IDs: 2, 3, 9)
  const hotProperties = propertiesData.filter(p => ['2', '3', '9'].includes(p.id));
  
  // All properties for display
  const allProperties = propertiesData;

  return (
    <>
      <Helmet>
        <title>Dua Property | Find Dream Properties in Mohali, Chandigarh, Kharar & Dubai</title>
        <meta
          name="description"
          content="Discover premium residential and commercial properties with Dua Property. Your trusted real estate partner for luxury apartments, residential plots, and investment opportunities across Mohali, Chandigarh, Kharar, and Dubai."
        />
      </Helmet>

      {/* Hero Slideshow Section */}
      <HeroSlideshow properties={hotProperties} />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Why Choose Dua Property?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto"
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
                className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl hover:shadow-[0_0_30px_rgba(193,154,107,0.2)] hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="h-14 w-14 text-dua-accent mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Properties Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/30 to-gray-900/60">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore All Properties
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Browse through our complete collection of premium properties across Tricity & Dubai
            </p>
          </motion.div>

          {/* Properties Grid - 3 rows × 3 columns = 9 properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allProperties.slice(0, 9).map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-dua-accent/90 backdrop-blur-sm text-dua-primary font-bold py-4 px-10 rounded-lg text-lg shadow-xl hover:bg-dua-accent hover:shadow-[0_0_30px_rgba(193,154,107,0.4)] transition-all duration-300 transform hover:scale-105 border border-dua-accent/30"
            >
              <span>View All Properties</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

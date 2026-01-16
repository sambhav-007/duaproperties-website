// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, MapPinIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import duaLogo from '../assets/dua-logo.jpg';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Dua Property | Trusted Real Estate Advisor in Tricity & Dubai, UAE</title>
        <meta
          name="description"
          content="Dua Property is a leading real estate advisor specializing in premium residential and commercial properties across Mohali, Chandigarh, Kharar, and Dubai, UAE. Learn about our story, expertise, and commitment to client satisfaction."
        />
        <meta
          name="keywords"
          content="Dua Property, Mohali real estate, Chandigarh property advisor, Kharar residential plots, Dubai apartments, UAE real estate, Tricity property investment, luxury homes, commercial property, investment guidance"
        />
        <link rel="canonical" href="https://www.duaproperty.com/about" />
        <meta property="og:title" content="About Dua Property | Trusted Real Estate Advisor in Tricity & Dubai, UAE" />
        <meta
          property="og:description"
          content="Dua Property specializes in premium residential and commercial properties across Mohali, Chandigarh, Kharar, and Dubai. Learn about our story, expertise, and services."
        />
        <meta property="og:url" content="https://www.duaproperty.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={duaLogo} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Dua Property | Trusted Real Estate Advisor in Tricity & Dubai, UAE" />
        <meta name="twitter:description" content="Dua Property specializes in premium residential and commercial properties across Mohali, Chandigarh, Kharar, and Dubai. Learn about our story, expertise, and services." />
        <meta name="twitter:image" content={duaLogo} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Dua Property",
              "image": "${duaLogo}",
              "url": "https://duaproperty.com",
              "logo": "${duaLogo}",
              "description": "Trusted real estate advisor specializing in premium residential and commercial properties across Mohali, Chandigarh, Kharar, and Dubai, UAE.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mohali",
                "addressRegion": "Punjab",
                "addressCountry": "IN"
              },
              "areaServed": ["Mohali", "Chandigarh", "Kharar", "Dubai, UAE"]
            }
          `}
        </script>
      </Helmet>

      <main className="pt-16 bg-gradient-to-b from-blue-50 via-white to-cyan-50 min-h-screen">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-dua-primary via-cyan-600 to-dua-primary py-16 flex flex-col items-center text-center border-b border-cyan-700">
          <motion.img
            src={duaLogo}
            alt="Dua Property Logo – Trusted Real Estate in Tricity and Dubai, UAE"
            className="rounded-lg shadow-2xl max-w-xs md:max-w-md mb-6 border-2 border-white/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            About <span className="text-yellow-300">Dua Property</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Your trusted partner for premium <strong className="text-white">residential and commercial properties</strong> in{' '}
            <strong className="text-white">Mohali, Chandigarh, Kharar (Tricity)</strong> and <strong className="text-white">Dubai, UAE</strong>.
          </motion.p>
        </header>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 space-y-12">
            <motion.article
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-dua-text mb-4 text-center">Our Story</h2>
              <p className="text-dua-body leading-relaxed text-center">
                Dua Property has been serving clients in the <strong className="text-dua-text">Tricity area (Mohali, Chandigarh, Kharar)</strong> and expanding internationally in{' '}
                <strong className="text-dua-text">Dubai, UAE</strong>. We specialize in helping families and investors find the perfect{' '}
                <strong className="text-dua-text">residential plots, luxury apartments, and commercial properties</strong>. Our founder, <strong className="text-dua-primary">Vishal Dua</strong>, established the company on trust, transparency, and client satisfaction, ensuring every transaction is seamless and valuable.
              </p>
            </motion.article>

            {/* Expertise & Services */}
            <motion.section
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {[
                { icon: ShieldCheckIcon, title: 'Trusted Expertise', desc: 'Years of experience in Mohali, Chandigarh, Kharar, and Dubai real estate ensuring informed and secure decisions.' },
                { icon: MapPinIcon, title: 'Prime Locations', desc: 'Access to premium residential and commercial properties in Tricity and Dubai.' },
                { icon: UserGroupIcon, title: 'Client-Centric', desc: 'Personalized service tailored to your real estate needs.' },
                { icon: CurrencyRupeeIcon, title: 'Investment Guidance', desc: 'Expert advice to maximize returns on local and international property investments.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl hover:border-dua-primary transition-all duration-300"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <item.icon className="h-12 w-12 text-dua-primary mb-3" />
                  <h3 className="text-xl font-semibold text-dua-text mb-2">{item.title}</h3>
                  <p className="text-dua-body">{item.desc}</p>
                </motion.div>
              ))}
            </motion.section>

            {/* CTA */}
            <motion.section
              className="text-center mt-12 bg-gradient-to-r from-dua-primary to-cyan-600 p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Connect with Dua Property</h2>
              <p className="text-white/95 mb-6 max-w-2xl mx-auto">
                Explore premium properties in <strong className="text-yellow-300">Mohali</strong>, <strong className="text-yellow-300">Chandigarh</strong>, <strong className="text-yellow-300">Kharar</strong>, and <strong className="text-yellow-300">Dubai</strong> with expert guidance. Our team ensures a smooth, professional experience for all clients.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-block bg-white text-dua-primary font-bold py-3 px-8 rounded-md hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  Get In Touch
                </Link>
                <Link
                  to="/properties"
                  className="inline-block bg-dua-accent text-white font-bold py-3 px-8 rounded-md hover:bg-amber-500 hover:scale-105 transition-all duration-300"
                >
                  Browse Properties
                </Link>
              </div>
            </motion.section>

            {/* Quick Links to Property Categories */}
            <motion.section
              className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-2xl font-semibold text-dua-text mb-6 text-center">Explore Our Property Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/properties?types=Residential%20Plot"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <h4 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">Residential Plots</h4>
                  <p className="text-sm text-dua-body">Premium plots in Tricity</p>
                </Link>
                <Link
                  to="/properties?types=Apartment,Independent%20Floor"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <h4 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">Apartments & Floors</h4>
                  <p className="text-sm text-dua-body">Luxury living spaces</p>
                </Link>
                <Link
                  to="/properties?types=Commercial"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <h4 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">Commercial Spaces</h4>
                  <p className="text-sm text-dua-body">Prime business locations</p>
                </Link>
                <Link
                  to="/properties?types=Villa"
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <h4 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">Luxury Villas</h4>
                  <p className="text-sm text-dua-body">Exclusive residences</p>
                </Link>
              </div>
            </motion.section>
          </div>
        </section>
      </main>
    </>
  );
}

export default AboutPage;

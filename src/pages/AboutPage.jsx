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
        <meta name="keywords" content="Dua Property, Mohali real estate, Chandigarh property advisor, Kharar residential plots, Dubai apartments, UAE real estate, Tricity property investment, luxury homes, commercial property, investment guidance" />
        {/* Open Graph / Social SEO */}
        <meta property="og:title" content="About Dua Property | Trusted Real Estate Advisor in Tricity & Dubai, UAE" />
        <meta property="og:description" content="Dua Property specializes in premium residential and commercial properties across Mohali, Chandigarh, Kharar, and Dubai. Learn about our story, expertise, and services." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={duaLogo} />
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

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-dua-primary/90 via-dua-primary/80 to-dua-primary/90 py-16 flex flex-col items-center text-center">
          <motion.img
            src={duaLogo}
            alt="Dua Property Logo – Trusted Real Estate in Tricity and Dubai, UAE"
            className="rounded-lg shadow-xl max-w-xs md:max-w-md mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-dua-accent mb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            About Dua Property
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Your trusted partner for premium <strong>residential and commercial properties</strong> in <strong>Mohali, Chandigarh, Kharar (Tricity)</strong> and <strong>Dubai, UAE</strong>.
          </motion.p>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-dua-bg-light">
          <div className="container mx-auto px-4 space-y-12">
            <motion.article
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-dua-primary mb-4 text-center">Our Story</h2>
              <p className="text-dua-text leading-relaxed text-center">
                Dua Property has been serving clients in the <strong>Tricity area (Mohali, Chandigarh, Kharar)</strong> and expanding internationally in <strong>Dubai, UAE</strong>. We specialize in helping families and investors find the perfect <strong>residential plots, luxury apartments, and commercial properties</strong>. Our founder, <strong>Vishal Dua</strong>, established the company on trust, transparency, and client satisfaction, ensuring every transaction is seamless and valuable.
              </p>
            </motion.article>

            {/* Expertise & Services */}
            <motion.section
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <item.icon className="h-12 w-12 text-dua-accent mb-3" />
                  <h3 className="text-xl font-semibold text-dua-primary mb-2">{item.title}</h3>
                  <p className="text-dua-text">{item.desc}</p>
                </motion.div>
              ))}
            </motion.section>

            {/* CTA */}
            <motion.section
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-dua-primary mb-4">Connect with Dua Property</h2>
              <p className="text-dua-text mb-6 max-w-2xl mx-auto">
                Explore premium properties in <strong>Mohali</strong>, <strong>Chandigarh</strong>, <strong>Kharar</strong>, and <strong>Dubai</strong> with expert guidance. Our team ensures a smooth, professional experience for all clients.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-dua-accent text-dua-primary font-bold py-3 px-8 rounded-md hover:scale-105 transition-transform duration-300"
              >
                Get In Touch
              </Link>
            </motion.section>
          </div>
        </section>
      </main>
    </>
  );
}

export default AboutPage;

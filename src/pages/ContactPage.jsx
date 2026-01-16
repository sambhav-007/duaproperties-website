// src/pages/ContactPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Dua Property | Real Estate Inquiries in Tricity & Dubai, UAE</title>
        <meta
          name="description"
          content="Contact Dua Property for premium real estate services in Mohali, Chandigarh, Kharar, and Dubai. Reach out for property inquiries, sales, investments, or expert consultations." 
        />
        <meta name="keywords" content="Dua Property, Mohali real estate, Chandigarh properties, Kharar residential plots, Dubai apartments, UAE real estate, property inquiries, investment advice, real estate consultation" />
        <link rel="canonical" href="https://www.duaproperty.com/contact" />
        <meta property="og:title" content="Contact Dua Property | Real Estate Experts in Tricity & Dubai, UAE" />
        <meta property="og:description" content="Reach out to Dua Property for premium real estate services and consultations in Mohali, Chandigarh, Kharar, and Dubai, UAE." />
        <meta property="og:url" content="https://www.duaproperty.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Dua Property | Real Estate Experts in Tricity & Dubai, UAE" />
        <meta name="twitter:description" content="Reach out to Dua Property for premium real estate services and consultations in Mohali, Chandigarh, Kharar, and Dubai, UAE." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Dua Property",
              "url": "https://duaproperty.com/contact",
              "telephone": "+919996009729",
              "email": "duaproperty123@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "8VP5+Q7H, Gobind Nagar, Ambala Cantt",
                "addressLocality": "Ambala",
                "addressRegion": "Haryana",
                "postalCode": "133001",
                "addressCountry": "IN"
              },
              "areaServed": ["Mohali", "Chandigarh", "Kharar", "Dubai, UAE"]
            }
          `}
        </script>
      </Helmet>

      <main className="bg-gradient-to-b from-blue-50 via-white to-cyan-50 pt-12 min-h-screen">
        <header className="container mx-auto py-12 px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dua-text mb-6">
            Contact <span className="text-dua-primary">Dua Property</span>: Your Real Estate Experts in Tricity & Dubai
          </h1>
          <p className="text-lg md:text-xl text-dua-body mb-10 max-w-3xl mx-auto">
            Have questions about properties in <strong className="text-white">Mohali, Chandigarh, Kharar (Tricity)</strong> or <strong className="text-white">Dubai, UAE</strong>? Contact Dua Property today for expert advice, sales inquiries, or property consultations. Our team is ready to guide you through local and international real estate markets.
          </p>

          <div className="max-w-xl mx-auto bg-white border border-gray-200 p-8 rounded-lg shadow-xl space-y-6">
            <h2 className="text-2xl font-semibold text-dua-text mb-4">Reach Us Directly</h2>

            <div className="flex items-center justify-center">
              <MapPinIcon className="h-6 w-6 text-dua-primary mr-3" />
              <p className="text-dua-body">8VP5+Q7H, Gobind Nagar, Ambala Cantt, Haryana 133001</p>
            </div>

            <div className="flex items-center justify-center">
              <PhoneIcon className="h-6 w-6 text-dua-primary mr-3" />
              <a href="tel:+919996009729" className="text-dua-body hover:text-dua-primary transition-colors duration-200" aria-label="Call Dua Property at +91 99960 09729">
                +91-99960 09729
              </a>
            </div>

            <div className="flex items-center justify-center">
              <EnvelopeIcon className="h-6 w-6 text-dua-primary mr-3" />
              <a href="mailto:duaproperty123@gmail.com" className="text-dua-body hover:text-dua-primary transition-colors duration-200" aria-label="Email Dua Property at duaproperty253@gmail.com">
                duaproperty123@gmail.com
              </a>
            </div>

            <p className="text-dua-text font-semibold mt-4">Serving clients across Tricity and Dubai with trusted real estate solutions.</p>

            <nav className="mt-8" aria-label="Office location">
              <h3 className="text-xl font-semibold text-dua-text mb-4">Find Our Ambala Office</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.4930037542713!2d76.8582366!3d30.336935800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb7002df47117%3A0xe4f95e62b5dd7a4!2sDua%20property!5e0!3m2!1sen!2sin!4v1761375388867!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-xl border border-gray-200"
                title="Dua Property Office Location Map"
              ></iframe>
            </nav>
          </div>

          {/* Quick Links Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-dua-text mb-6 text-center">Explore Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/properties"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 hover:border-dua-primary transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">All Properties</h3>
                <p className="text-sm text-dua-body">Browse our complete listing</p>
              </Link>
              <Link
                to="/properties?types=Residential%20Plot"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 hover:border-dua-primary transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">Residential Plots</h3>
                <p className="text-sm text-dua-body">Find your dream plot</p>
              </Link>
              <Link
                to="/properties?types=Apartment,Independent%20Floor"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 hover:border-dua-primary transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-dua-text mb-2 group-hover:text-dua-primary transition-colors">Apartments</h3>
                <p className="text-sm text-dua-body">Luxury living spaces</p>
              </Link>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}

export default ContactPage;

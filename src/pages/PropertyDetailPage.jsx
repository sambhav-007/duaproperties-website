// src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getAllProperties, getPropertyById } from '../services/propertyApi';
import { getPropertyGallery, getPropertyId, getPropertyMainImage, getPropertyTitle } from '../utils/propertyMappers';

function PropertyDetailPage() {
  const { slug } = useParams();
  
  // Extract actual ID (it's the last part after a hyphen)
  // This handles both new SEO slugs (e.g., /property/luxury-villa-64ac88...) and old links (e.g., /property/64ac88...)
  const idParts = String(slug || '').split('-');
  const id = idParts[idParts.length - 1];

  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const properties = await getAllProperties();
        setAllProperties(properties);
        const foundProperty = await getPropertyById(id);

        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          navigate('/properties', { replace: true });
        }
      } catch (error) {
        console.error('Failed to load property details:', error);
        navigate('/properties', { replace: true });
      } finally {
        setLoading(false);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchProperty();
  }, [id, navigate]);

  // Get related properties based on type or location
  const getRelatedProperties = () => {
    if (!property) return [];
    
    // Filter properties that match type or location, but exclude current property
    const related = allProperties.filter(p => {
      if (String(getPropertyId(p)) === String(getPropertyId(property))) return false;
      
      // Check if same type or similar type
      const sameType = p.type === property.type;
      
      // Check if same location (basic string matching)
      const sameLocation = p.location && property.location && 
        (p.location.toLowerCase().includes(property.location.toLowerCase().split(',')[0].toLowerCase()) ||
         property.location.toLowerCase().includes(p.location.toLowerCase().split(',')[0].toLowerCase()));
      
      return sameType || sameLocation;
    });
    
    // Limit to 3 properties, prioritize same type first
    const sameTypeProperties = related.filter(p => p.type === property.type);
    const differentTypeProperties = related.filter(p => p.type !== property.type);
    
    return [...sameTypeProperties, ...differentTypeProperties].slice(0, 3);
  };

  const relatedProperties = property ? getRelatedProperties() : [];

  const galleryImages = getPropertyGallery(property);
  const propertyTitle = getPropertyTitle(property);
  const propertyMainImage = getPropertyMainImage(property);
  const slides = galleryImages.map(img => ({ src: img })) || [];
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Helper function to check if URL is a YouTube link
  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  // Extract YouTube video ID from URL (supports regular videos and Shorts)
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle YouTube Shorts
    if (url.includes('/shorts/')) {
      const shortsMatch = url.match(/\/shorts\/([^?&#]+)/);
      return shortsMatch ? shortsMatch[1] : null;
    }
    
    // Handle regular YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <p className="text-xl text-dua-body animate-pulse">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Helmet>
            <title>Property Not Found | Dua Property</title>
          </Helmet>
          <h1 className="text-3xl font-bold text-red-500">Property Not Found</h1>
          <p className="text-dua-body mt-4">The property you are looking for does not exist.</p>
          <Link 
            to="/properties" 
            className="mt-6 inline-block bg-dua-accent hover:bg-amber-500 text-white py-3 px-6 rounded-lg hover:shadow-2xl transition-all duration-300"
          >
            Back to All Properties
          </Link>
        </div>
      </div>
    );
  }

  const pageTitle = `${propertyTitle} | ${property.type} in ${property.location} - Dua Property`;
  const pageDescription = `Explore details for ${propertyTitle}, a ${property.configuration || property.type} located in ${property.location}. View amenities, payment plan, gallery, and contact Dua Property for inquiries about this property in the Tricity area.`;
  const canonicalUrl = `https://www.duaproperty.com/property/${getPropertyId(property)}`;

  // Structured Data for Property
  const propertyStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": propertyTitle,
    "description": property.description || pageDescription,
    "url": canonicalUrl,
    "image": propertyMainImage,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressCountry": "IN"
    }
  };

  // Breadcrumb Structured Data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.duaproperty.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": "https://www.duaproperty.com/properties"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": propertyTitle,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={propertyMainImage} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={propertyMainImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(propertyStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>

      {/* Main container with padding for navbar and background for contrast */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 px-4 pt-28 md:pt-32 pb-12 animate-fade-in">
        <div className="container mx-auto">
          {/* Back Button */}
          <Link 
            to="/properties" 
            className="text-dua-primary hover:text-dua-accent mb-6 inline-flex items-center gap-2 transition-all duration-300 group font-semibold"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            <span>Back to Properties</span>
          </Link>

          {/* Property Title & Price */}
          <h1 className="text-4xl md:text-5xl font-bold text-dua-text mb-2 animate-fade-scale">{propertyTitle}</h1>
          <p className="text-2xl text-dua-primary font-semibold mb-4 animate-fade-scale">{property.price}</p>
          {property.rera_id && <p className="text-sm text-gray-600 mb-6">{`RERA ID: ${property.rera_id}`}</p>}

          {/* Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="animate-fade-scale">
              <img
                src={propertyMainImage}
                alt={`Main view of ${propertyTitle} in ${property.location}`}
                loading="lazy"
                className="w-full h-96 object-cover rounded-lg shadow-2xl border border-gray-200 transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="animate-fade-scale bg-white border border-gray-200 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-dua-text mb-3">Overview</h2>
              <p className="text-lg text-dua-body mb-4">{property.description || 'No description available.'}</p>

            <h3 className="text-xl font-bold text-dua-text mt-6 mb-2">Property Details</h3>
            <ul className="list-disc list-inside text-dua-body space-y-1">
              {property.location && <li><strong className="text-dua-text">Location:</strong> {property.location}</li>}
              {property.type && <li><strong className="text-dua-text">Type:</strong> {property.type}</li>}
              {property.status && <li><strong className="text-dua-text">Status:</strong> {property.status}</li>}
              {property.possession && <li><strong className="text-dua-text">Possession:</strong> {property.possession}</li>}
              {property.min_plot_size_sqyd && property.max_plot_size_sqyd && (
                <li><strong className="text-dua-text">Plot Sizes:</strong> {property.min_plot_size_sqyd} - {property.max_plot_size_sqyd} Sq. Yds.</li>
              )}
              {property.configuration && <li><strong className="text-dua-text">Configuration:</strong> {property.configuration}</li>}
            </ul>
            </div>
          </div>

        {/* Highlights & Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 bg-white border border-gray-200 p-6 rounded-lg shadow-xl animate-fade-in">
          <div>
            <h3 className="text-2xl font-bold text-dua-text mb-4">Highlights</h3>
            <ul className="list-disc list-inside text-dua-body space-y-2">
              {property.highlights?.length ? property.highlights.map((item, i) => <li key={i}>{item}</li>) : <li>Details not available.</li>}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-dua-text mb-4">Amenities</h3>
            <ul className="list-disc list-inside text-dua-body space-y-2">
              {property.amenities?.length ? property.amenities.map((item, i) => <li key={i}>{item}</li>) : <li>Details not available.</li>}
            </ul>
          </div>
        </div>

        {/* Payment Plan */}
        {property.payment_plan && (
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-xl mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Payment Plan</h2>
            <p className="text-lg font-semibold mb-3 text-dua-primary">{property.payment_plan.basic_price_type || property.price}</p>
            <ul className="divide-y divide-gray-200">
              {property.payment_plan.stages?.map((stage, i) => (
                <li key={i} className="flex justify-between py-3">
                  <span className="text-dua-body">{stage.name}</span>
                  <span className="font-semibold text-dua-text">{stage.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-10 mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  loading="lazy"
                  alt={`${propertyTitle} gallery image ${i + 1} - ${property.location}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200 cursor-pointer transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Video Section */}
        {property.video_url && (
          <div className="mt-10 mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Video Tour</h2>
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-xl max-w-4xl mx-auto">
              {isYouTubeUrl(property.video_url) ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(property.video_url)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(property.video_url)}`}
                    title={`${propertyTitle} Video Tour`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full rounded-lg shadow-2xl"
                  preload="metadata"
                  style={{ maxHeight: '500px' }}
                >
                  <source src={property.video_url} type="video/mp4" />
                  <source src={property.video_url} type="video/mov" />
                  <source src={property.video_url} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        )}

        {/* Related Properties Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">You May Also Like</h2>
                <p className="text-gray-400">Explore similar properties that might interest you</p>
              </div>
              <Link 
                to="/properties" 
                className="hidden md:inline-flex items-center gap-2 text-dua-accent hover:text-white transition-colors duration-300 font-semibold group"
              >
                View All Properties
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((relatedProp, index) => (
                <motion.div
                  key={getPropertyId(relatedProp)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <PropertyCard property={relatedProp} />
                </motion.div>
              ))}
            </div>
            
            {/* Mobile View All Button */}
            <div className="mt-8 text-center md:hidden">
              <Link 
                to="/properties" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-dua-primary hover:bg-gray-50 hover:shadow-lg rounded-lg transition-all duration-300 font-semibold"
              >
                View All Properties
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-dua-primary to-cyan-600 p-8 rounded-lg shadow-xl text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-4">Interested in this property?</h2>
          <p className="text-white/90 mb-6">Contact us today for more information or to schedule a visit.</p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-dua-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
        </div>
      </main>

      {/* Lightbox Viewer */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in { animation: fade-in 0.8s ease forwards;}
          @keyframes fade-scale {
            0% { opacity: 0; transform: scale(0.95);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-fade-scale { animation: fade-scale 0.6s ease forwards;}
        `}
      </style>
    </>
  );
}

export default PropertyDetailPage;

// src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import propertiesData from '../data/properties.json';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    const foundProperty = propertiesData.find(p => String(p.id) === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/properties', { replace: true });
    }
    setLoading(false);
  }, [id, navigate]);

  const slides = property?.images_gallery?.map(img => ({ src: img })) || [];
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p className="text-xl text-dua-body animate-pulse">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto py-16 text-center">
        <Helmet>
          <title>Property Not Found | Dua Property</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-red-600">Property Not Found</h1>
        <p className="text-dua-body mt-4">The property you are looking for does not exist.</p>
        <Link 
          to="/properties" 
          className="mt-6 inline-block bg-dua-primary text-white py-2 px-4 rounded hover:bg-dua-accent transition-transform transform hover:scale-105"
        >
          Back to All Properties
        </Link>
      </div>
    );
  }

  const pageTitle = `${property.name} | ${property.type} in ${property.location} - Dua Property`;
  const pageDescription = `Explore details for ${property.name}, a ${property.configuration || property.type} located in ${property.location}. View amenities, payment plan, gallery, and contact Dua Property for inquiries about this property in the Tricity area.`;
  const canonicalUrl = `https://www.duaproperty.com/property/${property.id}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Main container with padding for navbar and background for contrast */}
      <main className="container mx-auto px-4 pt-28 md:pt-32 bg-white min-h-screen animate-fade-in">

        {/* Back Button */}
        <Link 
          to="/properties" 
          className="text-dua-primary hover:underline mb-6 inline-block transition-transform transform hover:scale-110"
        >
          &larr; Back to Properties
        </Link>

        {/* Property Title & Price */}
        <h1 className="text-4xl md:text-5xl font-bold text-dua-primary mb-2 animate-fade-scale">{property.name}</h1>
        <p className="text-2xl text-dua-accent font-semibold mb-4 animate-fade-scale">{property.price}</p>
        {property.rera_id && <p className="text-sm text-gray-500 mb-6">{`RERA ID: ${property.rera_id}`}</p>}

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="animate-fade-scale">
            <img
              src={property.image_main}
              alt={`Main view of ${property.name} in ${property.location}`}
              loading="lazy"
              className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="animate-fade-scale">
            <h2 className="text-2xl font-bold text-dua-text mb-3">Overview</h2>
            <p className="text-lg text-dua-body mb-4">{property.description || 'No description available.'}</p>

            <h3 className="text-xl font-bold text-dua-text mt-6 mb-2">Property Details</h3>
            <ul className="list-disc list-inside text-dua-body space-y-1">
              {property.location && <li><strong>Location:</strong> {property.location}</li>}
              {property.type && <li><strong>Type:</strong> {property.type}</li>}
              {property.status && <li><strong>Status:</strong> {property.status}</li>}
              {property.possession && <li><strong>Possession:</strong> {property.possession}</li>}
              {property.min_plot_size_sqyd && property.max_plot_size_sqyd && (
                <li><strong>Plot Sizes:</strong> {property.min_plot_size_sqyd} - {property.max_plot_size_sqyd} Sq. Yds.</li>
              )}
              {property.configuration && <li><strong>Configuration:</strong> {property.configuration}</li>}
            </ul>
          </div>
        </div>

        {/* Highlights & Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 bg-white p-6 rounded-lg shadow-lg animate-fade-in">
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
          <div className="bg-white p-6 rounded-lg shadow-lg mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Payment Plan</h2>
            <p className="text-lg font-semibold mb-3">{property.payment_plan.basic_price_type || property.price}</p>
            <ul className="divide-y divide-gray-200">
              {property.payment_plan.stages?.map((stage, i) => (
                <li key={i} className="flex justify-between py-3">
                  <span className="text-dua-body">{stage.name}</span>
                  <span className="font-semibold text-gray-900">{stage.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {property.images_gallery?.length > 0 && (
          <div className="mt-10 mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {property.images_gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  loading="lazy"
                  alt={`${property.name} gallery image ${i + 1} - ${property.location}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>
          </div>
        )}

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

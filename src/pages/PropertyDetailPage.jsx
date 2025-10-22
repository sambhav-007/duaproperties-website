// src/pages/PropertyDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function PropertyDetailPage() {
  const { id } = useParams();
  const property = propertiesData.find(p => p.id === id);

  // --- Add State for Lightbox ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // --- End State for Lightbox ---

  // Guard Clause: If property is not found
  if (!property) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Property Not Found</h1>
        <p className="text-dua-body mt-4">The property you are looking for does not exist.</p>
        <Link to="/properties" className="mt-6 inline-block bg-dua-dark-green text-white py-2 px-4 rounded hover:bg-dua-gold transition-colors duration-300">
          Back to Properties
        </Link>
      </div>
    );
  }

  // Prepare slides for the lightbox
  const slides = property.images_gallery
    ? property.images_gallery.map(img => ({ src: img }))
    : [];

  // --- Add Function to Open Lightbox ---
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  // --- End Function ---

  // Main Render: If property IS found
  return (
    // !!! --- START NEW PARENT DIV HERE --- !!!
    <div> {/* This new div wraps everything */}

      <div className="container mx-auto py-8 px-4">
        {/* Back Link */}
        <Link to="/properties" className="text-dua-primary hover:underline mb-4 inline-block">&larr; Back to Properties</Link>

        {/* Header */}
        <h1 className="text-4xl font-bold text-dua-primary mb-4">{property.name}</h1>
        <p className="text-2xl text-dua-accent font-semibold mb-6">{property.price}</p>
        {property.rera_id && <p className="text-sm text-gray-500 mb-6">RERA ID: {property.rera_id}</p>}

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Image */}
          <div>
            <img src={property.image_main} alt={property.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
          </div>
          {/* Right Column: Overview & Details */}
          <div>
            <h2 className="text-2xl font-bold text-dua-text mb-3">Overview</h2>
            <p className="text-lg text-dua-body mb-4">{property.description || 'No description available.'}</p>

            <h3 className="text-xl font-bold text-dua-text mt-6 mb-2">Property Details</h3>
            <ul className="list-disc list-inside text-dua-body space-y-1">
              {property.location && <li><strong>Location:</strong> {property.location}</li>}
              {property.type && <li><strong>Type:</strong> {property.type}</li>}
              {property.status && <li><strong>Status:</strong> {property.status}</li>}
              {property.possession_date && <li><strong>Possession:</strong> {property.possession_date}</li>}
              {property.min_plot_size_sqyd && <li><strong>Plot Sizes:</strong> {property.min_plot_size_sqyd} - {property.max_plot_size_sqyd} Sq. Yds.</li>}
            </ul>
          </div>
        </div>

        {/* Highlights & Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white p-6 rounded-lg shadow-sm">
          {/* Highlights Section */}
          <div>
            <h3 className="text-2xl font-bold text-dua-text mb-4">Highlights</h3>
            <ul className="list-disc list-inside text-dua-body space-y-2">
              {/* GUARD ADDED */}
              {property.highlights && property.highlights.length > 0 ? (
                property.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>Details not available.</li>
              )}
            </ul>
          </div>

          {/* Amenities Section */}
          <div>
            <h3 className="text-2xl font-bold text-dua-text mb-4">Amenities</h3>
            <ul className="list-disc list-inside text-dua-body space-y-2">
              {/* GUARD ADDED */}
              {property.amenities && property.amenities.length > 0 ? (
                property.amenities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>Details not available.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Payment Plan */}
        {property.payment_plan && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Payment Plan</h2>
            <p className="text-lg font-semibold mb-3">Basic Sale Price: {property.payment_plan.basic_price}</p>
            <ul className="divide-y divide-gray-200">
              {/* GUARD ADDED */}
              {property.payment_plan.stages && property.payment_plan.stages.map((stage, index) => (
                <li key={index} className="flex justify-between py-3">
                  <span className="text-dua-body">{stage.name}</span>
                  <span className="font-semibold text-gray-900">{stage.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Other Charges */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-dua-text mb-4">Other Charges</h3>
          <ul className="list-disc list-inside text-dua-body space-y-2">
            {property.other_charges && property.other_charges.map((charge, index) => (
              <li key={index} className="flex justify-between items-center pr-4">
                <span>{charge.name}:</span>
                <span className="font-medium text-dua-text">
                  {charge.amount || charge.details} {/* Display amount if present, else details */}
                </span>
              </li>
            ))}
          </ul>
        </div>
        

        {/* Gallery Section */}
        {property.images_gallery && property.images_gallery.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {property.images_gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${property.name} gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => openLightbox(index)} // <-- Add onClick handler
                />
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        {property.notes && property.notes.length > 0 && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-dua-text mb-4">Notes</h2>
            <ul className="list-disc list-inside text-dua-body text-sm space-y-2">
              {property.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div> {/* This closes the main container div */}

      {/* --- ADD LIGHTBOX COMPONENT AT THE END (INSIDE MAIN RETURN) --- */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      // Optional: Add plugins for Thumbnails, Zoom, etc. later if needed
      // Example: plugins={[Thumbnails, Zoom]}
      />
      {/* --- END LIGHTBOX COMPONENT --- */}

    </div>
  );
}

export default PropertyDetailPage;
// src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET
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
    // Ensure ID comparison is robust (both to string)
    const foundProperty = propertiesData.find(p => String(p.id) === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      // If property not found, redirect to properties list
      navigate('/properties', { replace: true });
    }
    setLoading(false);
  }, [id, navigate]); // Depend on id and navigate

  const slides = property?.images_gallery // Optional chaining for safety
    ? property.images_gallery.map(img => ({ src: img }))
    : [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p className="text-xl text-dua-body">Loading property details...</p>
        {/* Consider adding a spinner here */}
      </div>
    );
  }

  // This block will typically be skipped due to the navigate() call above,
  // but it's a good fallback for type safety or if redirect fails.
  if (!property) {
    return (
      <div className="container mx-auto py-16 text-center">
        <Helmet>
          <title>Property Not Found | Dua Property</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-red-600">Property Not Found</h1>
        <p className="text-dua-body mt-4">The property you are looking for does not exist or may have been removed.</p>
        <Link to="/properties" className="mt-6 inline-block bg-dua-primary text-white py-2 px-4 rounded hover:bg-dua-accent transition-colors duration-300">
          Back to All Properties
        </Link>
      </div>
    );
  }

  // --- Dynamic Meta Tags and URLs ---
  const pageTitle = `${property.name} | ${property.type} in ${property.location} - Dua Property`;
  const pageDescription = `Explore details for ${property.name}, a ${property.configuration || property.type} located in ${property.location}. View amenities, payment plan, gallery, and contact Dua Property for inquiries about this property in the Tricity area.`;
  const canonicalUrl = `https://www.duaproperty.com/property/${property.id}`;
  const mainImageUrl = property.image_main ? `https://www.duaproperty.com${property.image_main}` : 'https://www.duaproperty.com/default-share-image.png';

  // --- Start Schema.org JSON-LD Generation ---
  // Helper to clean price string for schema (remove text, currency symbols)
  const cleanPrice = (priceString) => {
    if (!priceString || typeof priceString !== 'string') return undefined;
    const numericPart = priceString.replace(/[^0-9.]/g, ''); // Keep only numbers and dots
    return parseFloat(numericPart) || undefined; // Convert to number
  };

  // Helper to extract number of bedrooms
  const getNumberOfBedrooms = (config) => {
    if (!config) return undefined;
    const match = config.match(/(\d+)\s*BHK/i);
    return match ? parseInt(match[1], 10) : undefined;
  };

  // Helper to extract floor size in sq.ft
  const getFloorSizeSqFt = (config) => {
    if (!config) return undefined;
    const match = config.match(/(\d+(\.\d+)?)\s*sq\.ft/i); // Matches 123 or 123.5 sq.ft
    return match ? parseFloat(match[1]) : undefined;
  };

  // Helper to extract plot size in sq.yd
  const getPlotSizeSqYd = (min, max) => {
    if (!min && !max) return undefined;
    const value = parseFloat(String(min || max)); // Take min if available, else max
    return value || undefined;
  };

  const schemaPrice = cleanPrice(property.price);
  const schemaBedrooms = getNumberOfBedrooms(property.configuration);
  const schemaFloorSize = getFloorSizeSqFt(property.configuration);
  const schemaPlotSize = getPlotSizeSqYd(property.min_plot_size_sqyd, property.max_plot_size_sqyd);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing", // More specific for properties
    "name": property.name,
    "description": property.description,
    "image": mainImageUrl,
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    // Only include 'offers' if a valid price can be extracted
    ...(schemaPrice !== undefined && {
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": schemaPrice,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "price": schemaPrice,
          "valueAddedTaxIncluded": false // Assuming GST is separate
        },
        "itemCondition": "https://schema.org/UsedCondition", // Or NewCondition, etc.
        "availability": property.status === "Ready to Move" ? "https://schema.org/InStock" : "https://schema.org/PreOrder", // Adjust based on property.status
        "seller": {
          "@type": "Organization",
          "name": "Dua Property",
          "url": "https://www.duaproperty.com",
          "logo": "https://www.duaproperty.com/dua-logo.jpg" // Ensure this path is correct or update/remove
        }
      }
    }),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location.split(',').pop()?.trim() || "Mohali", // Attempt to get city
      "addressRegion": "Punjab", // Assuming Punjab, update if different
      "addressCountry": "IN"
    },
    // Include bedrooms only if a valid number is found
    ...(schemaBedrooms !== undefined && { "numberOfBedrooms": schemaBedrooms }),
    // Include floorSize only if a valid number is found
    ...(schemaFloorSize !== undefined && {
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": schemaFloorSize,
        "unitCode": "SQF" // Schema code for Square Foot
      }
    }),
    // Include plotSize if relevant
    ...(schemaPlotSize !== undefined && {
      "hasMeasurement": {
        "@type": "QuantitativeValue",
        "value": schemaPlotSize,
        "unitCode": "YRD" // Schema code for Square Yard (if applicable)
      }
    }),
    "datePosted": property.date_added || new Date().toISOString().split('T')[0], // Use 'date_added' if exists, else current date
    "propertyType": property.type // Added propertyType for better classification
  };
  // --- End Schema.org JSON-LD Generation ---


  return (
    <> {/* Use Fragment to wrap Helmet and content */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={mainImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Dua Property" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={mainImageUrl} />

        {/* --- Schema.org Markup (JSON-LD) - UNCOMMENTED AND DYNAMICALLY POPULATED --- */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* --- Main Content Div --- */}
      <div> {/* This new div wraps everything */}
        <div className="container mx-auto py-8 px-4">
          <Link to="/properties" className="text-dua-primary hover:underline mb-4 inline-block">&larr; Back to Properties</Link>

          <h1 className="text-4xl font-bold text-dua-primary mb-4">{property.name}</h1>
          <p className="text-2xl text-dua-accent font-semibold mb-6">{property.price}</p>
          {property.rera_id && <p className="text-sm text-gray-500 mb-6">RERA ID: {property.rera_id}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src={property.image_main}
                alt={`Main view of ${property.name} in ${property.location}`}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dua-text mb-3">Overview</h2>
              <p className="text-lg text-dua-body mb-4">{property.description || 'No description available.'}</p>

              <h3 className="text-xl font-bold text-dua-text mt-6 mb-2">Property Details</h3>
              <ul className="list-disc list-inside text-dua-body space-y-1">
                {property.location && <li><strong>Location:</strong> {property.location}</li>}
                {property.type && <li><strong>Type:</strong> {property.type}</li>}
                {property.status && <li><strong>Status:</strong> {property.status}</li>}
                {property.possession && <li><strong>Possession:</strong> {property.possession}</li>}
                {property.min_plot_size_sqyd && property.max_plot_size_sqyd && <li><strong>Plot Sizes:</strong> {property.min_plot_size_sqyd} - {property.max_plot_size_sqyd} Sq. Yds.</li>}
                {property.configuration && <li><strong>Configuration:</strong> {property.configuration}</li>}
              </ul>
            </div>
          </div>

          {/* Highlights & Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white p-6 rounded-lg shadow-sm">
            {/* Highlights Section */}
            <div>
              <h3 className="text-2xl font-bold text-dua-text mb-4">Highlights</h3>
              <ul className="list-disc list-inside text-dua-body space-y-2">
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
              {/* Check if payment_plan.basic_price_type exists and stages are present */}
              {property.payment_plan.basic_price_type && property.payment_plan.stages && property.payment_plan.stages.length > 0 ? (
                 <p className="text-lg font-semibold mb-3">Basic Sale Price: {property.payment_plan.basic_price_type}</p>
              ) : (
                 <p className="text-lg font-semibold mb-3">Price Details: {property.price}</p> // Fallback
              )}
              <ul className="divide-y divide-gray-200">
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
                    alt={`${property.name} gallery image ${index + 1} - ${property.location}`} // More descriptive alt text
                    className="w-full h-48 object-cover rounded-lg shadow-sm cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => openLightbox(index)}
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

        {/* --- Lightbox Component --- */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
        />
        {/* --- End Lightbox Component --- */}
      </div> {/* This closes the outer wrapper div */}
    </> // Close Fragment
  );
}

export default PropertyDetailPage;
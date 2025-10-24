// src/pages/ContactPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Dua Property | Real Estate Inquiries in Mohali, Chandigarh & Kharar</title>
        <meta
          name="description"
          content="Get in touch with Dua Property for all your real estate needs in Mohali, Chandigarh, and Kharar. Contact us for property inquiries, sales, investments, or consultations. Your trusted Tricity property advisor."
        />
      </Helmet>

      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-dua-primary mb-6 text-center">
          Contact Dua Property: Your Real Estate Experts in Tricity
        </h1>
        <p className="text-lg text-dua-body mb-10 max-w-2xl mx-auto text-center">
          We'd love to hear from you. Whether you have questions about our listings in Mohali, need advice on property investments in Chandigarh, or want to discuss a new project in Kharar, reach out to **Dua Property** today.
        </p>

        {/* Contact Information and Map - now centered as it's the only main content block */}
        <div className="max-w-xl mx-auto bg-dua-bg-light p-8 rounded-lg shadow-md"> {/* Reduced max-width and centered */}
          <h2 className="text-2xl font-semibold text-dua-text mb-6 text-center">Reach Out to Us Directly</h2> {/* Centered heading */}
          <div className="space-y-6">
            <div className="flex items-center justify-center"> {/* Centered content */}
              <MapPinIcon className="h-6 w-6 text-dua-accent mr-3" />
              <p className="text-dua-body text-center">
                Dua Property, 8VP5+Q7H, Gobind Nagar, Ambala Cantt, Haryana 133001
              </p>
            </div>
            <div className="flex items-center justify-center"> {/* Centered content */}
              <PhoneIcon className="h-6 w-6 text-dua-accent mr-3" />
              <a href="tel:+919996009729" className="text-dua-body hover:text-dua-primary transition-colors duration-200"
                 aria-label="Call Dua Property at +91 99960 09729">
                +91-99960 09729
              </a>
            </div>
            <div className="flex items-center justify-center"> {/* Centered content */}
              <EnvelopeIcon className="h-6 w-6 text-dua-accent mr-3" />
              <a href="mailto:duaproperty253@gmail.com" className="text-dua-body hover:text-dua-primary transition-colors duration-200"
                 aria-label="Email Dua Property at duaproperty253@gmail.com">
                duaproperty253@gmail.com
              </a>
            </div>
          </div>
          {/* Google Map embed */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-dua-text mb-4 text-center">Find Us on Map</h3> {/* Centered heading */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.4930037542713!2d76.8582366!3d30.336935800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb7002df47117%3A0xe4f95e62b5dd7a4!2sDua%20property!5e0!3m2!1sen!2sin!4v1761287991834!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-sm"
              title="Location of Dua Property on Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
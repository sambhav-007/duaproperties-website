// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET
import duaLogo from '../assets/dua-logo.jpg'; // Ensure this path and filename are correct

function AboutPage() {
  return (
    <> {/* Use a React Fragment to wrap Helmet and the rest of the content */}
      <Helmet>
        <title>About Dua Property | Your Trusted Real Estate Advisor in Tricity & Dubai</title> 
        <meta
          name="description"
          content="Learn about Dua Property, a leading real estate advisor specializing in premium residential and commercial properties across the Tricity area (Mohali, Chandigarh, Kharar) AND Dubai, UAE. Discover our story, expertise, and commitment to client satisfaction in both dynamic markets." // UPDATED DESCRIPTION
        />
        {/* Optional: Add keywords meta tag, though less impactful now */}
        {/* <meta name="keywords" content="Dua Property, real estate Mohali, property advisor Chandigarh, Tricity real estate, luxury apartments Kharar, residential plots Mohali, commercial property, investment advice, Dubai real estate, Dubai apartments, UAE properties" /> */}
      </Helmet>
      <div className="bg-dua-primary pt-20">
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">

          {/* Corrected H1 heading, incorporating "Property" consistently */}
          <h1 className="text-3xl md:text-4xl font-bold text-dua-primary text-center mb-8">
            About Dua Property: Your Trusted Partner in Tricity & Dubai Real Estate 
          </h1>

          <p className="text-lg text-dua-body mb-8 md:mb-12 text-center max-w-3xl mx-auto">
            Welcome to <strong>Dua Property</strong>, your dedicated <strong>real estate partner</strong> specializing in premium <strong>residential and commercial properties</strong> across the vibrant <strong>Tricity area – Mohali, Chandigarh, and Kharar</strong>, and the dynamic, luxurious market of <strong>Dubai, UAE</strong>. Founded on the principles of trust, transparency, and client satisfaction, we are committed to helping you navigate both these diverse <strong>property markets</strong> and find the perfect space to call home or the ideal investment opportunity. {/* UPDATED TEXT */}
          </p>

          {/* Logo Image Section - ensure alt text is descriptive */}
          <div className="mb-12 text-center">
            <img
              src={duaLogo}
              alt="Dua Property Company Logo and Team Members"
              className="inline-block rounded-lg shadow-md max-w-full h-auto md:max-w-xl"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dua-text mb-3">
                Our Story: Building Dreams in Tricity & Beyond, Including Dubai 
              </h2>
              <p className="text-dua-body leading-relaxed">
                For over years, <strong>Dua Property</strong> has been deeply involved in the growth and development of the <strong>Mohali real estate landscape</strong> and has now expanded its expertise to the international market of <strong>Dubai</strong>. Our founder, <strong>Vishal Dua</strong>, saw a need for a reliable and knowledgeable <strong>property advisor</strong> who truly understands both local <strong>Tricity market dynamics</strong> and the global appeal of <strong>Dubai real estate</strong>. Since then, we've helped countless families find their <strong>dream homes</strong> and investors secure valuable <strong>real estate assets</strong>, building a reputation for integrity and results in Mohali, Chandigarh, Kharar, and Dubai. {/* UPDATED TEXT */}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dua-text mb-3">
                  What We Do: Expertise in Tricity & Dubai Properties 
                </h2>
              <p className="text-dua-body leading-relaxed mb-4">
                At <strong>Dua Property</strong>, we offer a comprehensive range of <strong>real estate services</strong> focused on the most sought-after locations in <strong>Mohali, Chandigarh, Kharar, and Dubai</strong>. Our expertise includes: 
              </p>
              <ul className="list-disc list-inside text-dua-body space-y-2 pl-4">
                <li><strong>Residential Plots:</strong> Guiding you to find the perfect <strong>residential plot</strong> in well-planned communities like Amayra Vista, ideal for building your <strong>dream home in Mohali</strong>.</li>
                <li><strong>Luxury Apartments:</strong> Showcasing premium residences in developments such as Amayra Sky City and Homeland Regalia in Tricity, and exclusive projects like Chapter 1 by Newbury in <strong>Dubai</strong>, offering <strong>luxury apartments in both regions</strong>.</li>
                <li><strong>Commercial Properties:</strong> Assisting businesses in finding strategic <strong>commercial property</strong> locations for growth and investment across Tricity and in key areas of <strong>Dubai</strong>.</li>
                <li><strong>Investment Advisory:</strong> Providing data-driven insights for maximizing your <strong>real estate investments</strong> in the competitive <strong>Tricity market</strong> and the high-yield opportunities of <strong>Dubai</strong>.</li>
                <li><strong>End-to-End Support:</strong> Assisting you through every step, from <strong>property selection</strong> and site visits to documentation and final handover, ensuring a seamless experience with <strong>Dua Property</strong> in both local and international markets.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dua-text mb-3">
                Why Choose Dua Property as Your Real Estate Partner?
              </h2>
              <p className="text-dua-body leading-relaxed mb-4">
                Choosing the right <strong>property advisor</strong> is crucial. Here’s why clients trust <strong>Dua Property</strong> for their <strong>real estate needs in Tricity and Dubai</strong>:
              </p>
              <ul className="list-disc list-inside text-dua-body space-y-2 pl-4">
                <li><strong>Local & International Market Mastery:</strong> We possess in-depth knowledge of <strong>Mohali's Sector 77, Sector 127, Kurali Bypass, Airport Road</strong>, and other key <strong>Tricity locales</strong>, alongside a strong understanding of the diverse real estate opportunities in <strong>Dubai</strong>, ensuring informed decisions.</li>
                <li><strong>Transparency First:</strong> We believe in honest communication and clear processes, ensuring you are informed at every stage of your <strong>property purchase</strong>, whether local or international.</li>
                <li><strong>Client-Centric Approach:</strong> Your goals are our priority. We listen, understand, and tailor our services to meet your specific needs for <strong>property in Tricity or Dubai</strong>.</li>
                <li><strong>Curated Listings:</strong> We focus on quality projects from reputable developers in both regions, ensuring value and reliability in every <strong>Dua Property listing</strong>.</li>
              </ul>
            </section>

            <section className="text-center mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-dua-text mb-4">
                Connect with Dua Property for Your Next Investment
              </h2>
              <p className="text-lg text-dua-body mb-6 max-w-2xl mx-auto">
                Whether you're looking for a <strong>luxury apartment in Mohali</strong>, a <strong>residential plot near the GMADA Expressway</strong>, expert advice on <strong>real estate investment in Chandigarh</strong>, or exploring premium opportunities in <strong>Dubai</strong>, <strong>Dua Property</strong> is here to help. Explore our current listings or contact us today for a personalized consultation. Let us help you unlock your future in the global real estate market.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-dua-primary text-white py-3 px-8 rounded-md hover:bg-dua-accent transition-colors duration-300 text-lg font-medium"
                aria-label="Contact Dua Property for real estate inquiries"
              >
                Get In Touch
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AboutPage;
// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORT HELMET
import duaLogo from '../assets/dua-logo.jpg'; // Ensure this path and filename are correct

function AboutPage() {
  return (
    <> {/* Use a React Fragment to wrap Helmet and the rest of the content */}
      <Helmet>
        <title>About Dua Property | Your Trusted Real Estate Advisor in Mohali, Chandigarh & Kharar</title>
        <meta
          name="description"
          content="Learn about Dua Property, a leading real estate advisor specializing in premium residential and commercial properties across the Tricity area (Mohali, Chandigarh, Kharar). Discover our story, expertise, and commitment to client satisfaction."
        />
        {/* Optional: Add keywords meta tag, though less impactful now */}
        {/* <meta name="keywords" content="Dua Property, real estate Mohali, property advisor Chandigarh, Tricity real estate, luxury apartments Kharar, residential plots Mohali, commercial property, investment advice" /> */}
      </Helmet>

      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">

          {/* Corrected H1 heading, incorporating "Property" consistently */}
          <h1 className="text-3xl md:text-4xl font-bold text-dua-primary text-center mb-8">
            About Dua Property: Your Trusted Partner in Tricity Real Estate
          </h1>

          <p className="text-lg text-dua-body mb-8 md:mb-12 text-center max-w-3xl mx-auto">
            Welcome to **Dua Property**, your dedicated **real estate partner** specializing in premium **residential and commercial properties** across the vibrant **Tricity area – Mohali, Chandigarh, and Kharar**. Founded on the principles of trust, transparency, and client satisfaction, we are committed to helping you navigate the **property market** and find the perfect space to call home or the ideal investment opportunity.
          </p>

          {/* Logo Image Section - ensure alt text is descriptive */}
          <div className="mb-12 text-center">
            <img
              src={duaLogo}
              alt="Dua Property Company Logo and Team Members" // Corrected alt text
              className="inline-block rounded-lg shadow-md max-w-full h-auto md:max-w-xl"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-dua-text mb-3">
                Our Story: Building Dreams in Mohali & Beyond
              </h2>
              <p className="text-dua-body leading-relaxed">
                For over years, **Dua Property** has been deeply involved in the growth and development of the **Mohali real estate landscape**. Our founder, **Vishal Dua**, saw a need for a reliable and knowledgeable **property advisor** who truly understands the local **Tricity market dynamics**. Since then, we've helped countless families find their **dream homes** and investors secure valuable **real estate assets**, building a reputation for integrity and results in Mohali, Chandigarh, and Kharar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dua-text mb-3">
                What We Do: Expertise in Tricity Properties
              </h2>
              <p className="text-dua-body leading-relaxed mb-4">
                At **Dua Property**, we offer a comprehensive range of **real estate services** focused on the most sought-after locations in **Mohali, Chandigarh, and Kharar**. Our expertise includes:
              </p>
              <ul className="list-disc list-inside text-dua-body space-y-2 pl-4">
                <li>**Residential Plots:** Guiding you to find the perfect **residential plot** in well-planned communities like Amayra Vista, ideal for building your **dream home in Mohali**.</li>
                <li>**Luxury Apartments:** Showcasing premium residences in developments such as Amayra Sky City and Homeland Regalia, offering **luxury apartments in Mohali and Chandigarh**.</li>
                <li>**Commercial Properties:** Assisting businesses in finding strategic **commercial property** locations for growth and investment across the Tricity.</li>
                <li>**Investment Advisory:** Providing data-driven insights for maximizing your **real estate investments** in the competitive **Tricity market**.</li>
                <li>**End-to-End Support:** Assisting you through every step, from **property selection** and site visits to documentation and final handover, ensuring a seamless experience with **Dua Property**.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-dua-text mb-3">
                Why Choose Dua Property as Your Real Estate Partner?
              </h2>
              <p className="text-dua-body leading-relaxed mb-4">
                Choosing the right **property advisor** is crucial. Here’s why clients trust **Dua Property** for their **real estate needs in Mohali, Chandigarh, and Kharar**:
              </p>
              <ul className="list-disc list-inside text-dua-body space-y-2 pl-4">
                <li>**Local Market Mastery:** We possess in-depth knowledge of **Mohali's Sector 77, Sector 127, Kurali Bypass, Airport Road**, and other key **Mohali & Kharar locales**, ensuring informed decisions.</li>
                <li>**Transparency First:** We believe in honest communication and clear processes, ensuring you are informed at every stage of your **property purchase**.</li>
                <li>**Client-Centric Approach:** Your goals are our priority. We listen, understand, and tailor our services to meet your specific needs for **property in Tricity**.</li>
                <li>**Curated Listings:** We focus on quality projects from reputable developers, ensuring value and reliability in every **Dua Property listing**.</li>
              </ul>
            </section>

            <section className="text-center mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-dua-text mb-4">
                Connect with Dua Property for Your Next Investment
              </h2>
              <p className="text-lg text-dua-body mb-6 max-w-2xl mx-auto">
                Whether you're looking for a **luxury apartment in Mohali**, a **residential plot near the GMADA Expressway**, or expert advice on **real estate investment in Chandigarh**, **Dua Property** is here to help. Explore our current listings or contact us today for a personalized consultation. Let us help you unlock your future in the **Tricity real estate market**.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-dua-primary text-white py-3 px-8 rounded-md hover:bg-dua-accent transition-colors duration-300 text-lg font-medium"
                aria-label="Contact Dua Property for real estate inquiries" // Corrected for consistency
              >
                Get In Touch
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
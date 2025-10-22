// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import duaLogo from '../assets/dua-logo.jpg';

function AboutPage() {
  return (
    <div className="bg-white py-12 md:py-16"> {/* White background for this page */}
      <div className="container mx-auto px-4">

        <h1 className="text-3xl md:text-4xl font-bold text-dua-primary text-center mb-8">
          About Dua Property: Your Trusted Partner in Tricity Real Estate
        </h1>
    
        <p className="text-lg text-dua-body mb-8 md:mb-12 text-center max-w-3xl mx-auto">
          Welcome to Dua Property, your dedicated real estate partner specializing in premium residential and commercial properties across the vibrant Tricity area – Mohali, Chandigarh, and Kharar. Founded on the principles of trust, transparency, and client satisfaction, we are committed to helping you navigate the property market and find the perfect space to call home or the ideal investment opportunity.
        </p>

        {/* Optional Image Section */}
        { <div className="mb-12 text-center">
          <img
            src={duaLogo}
            alt="Dua Properties Team or Office"
            className="inline-block rounded-lg shadow-md max-w-full h-auto md:max-w-xl"
          />
        </div> }

        <div className="max-w-3xl mx-auto space-y-8"> {/* Constrain width for readability */}
          <section>
            <h2 className="text-2xl font-semibold text-dua-text mb-3">
              Our Story: Building Dreams in Mohali & Beyond
            </h2>
            <p className="text-dua-body leading-relaxed">
              For over years, Dua Property has been deeply involved in the growth and development of the Mohali real estate landscape. Our founder, Vishal Dua, saw a need for a reliable and knowledgeable property advisor who truly understands the local market dynamics. Since then, we've helped countless families find their dream homes and investors secure valuable assets, building a reputation for integrity and results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dua-text mb-3">
              What We Do: Expertise in Tricity Properties
            </h2>
            <p className="text-dua-body leading-relaxed mb-4">
              At Dua Property, we offer a comprehensive range of real estate services focused on the most sought-after locations in Mohali, Chandigarh, and Kharar. Our expertise includes:
            </p>
            <ul className="list-disc list-inside text-dua-body space-y-2 pl-4">
              <li>**Residential Plots:** Guiding you to find the perfect plot in well-planned communities like Amayra Vista.</li>
              <li>**Luxury Apartments:** Showcasing premium residences in developments such as Amayra Sky City and Homeland Regalia.</li>
              <li>**Commercial Properties:** Assisting businesses in finding strategic locations for growth.</li>
              <li>**Investment Advisory:** Providing data-driven insights for maximizing your real estate investments in the Tricity market.</li>
              <li>**End-to-End Support:** Assisting you through every step, from property selection and site visits to documentation and final handover.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dua-text mb-3">
              Why Choose Dua Property?
            </h2>
            <p className="text-dua-body leading-relaxed mb-4">
              Choosing the right property advisor is crucial. Here’s why clients trust Dua Property:
            </p>
            <ul className="list-disc list-inside text-dua-body space-y-2 pl-4">
              <li>**Local Market Mastery:** We possess in-depth knowledge of Sector 77, Sector 127, Kurali Bypass, Airport Road, and other key Mohali & Kharar locales.</li>
              <li>**Transparency First:** We believe in honest communication and clear processes, ensuring you are informed at every stage.</li>
              <li>**Client-Centric Approach:** Your goals are our priority. We listen, understand, and tailor our services to meet your specific needs.</li>
              <li>**Curated Listings:** We focus on quality projects from reputable developers, ensuring value and reliability.</li>
            </ul>
          </section>

          <section className="text-center mt-12 pt-8 border-t border-gray-200"> {/* Added top border */}
            <h2 className="text-2xl font-semibold text-dua-text mb-4">
              Let's Find Your Future Property
            </h2>
            <p className="text-lg text-dua-body mb-6 max-w-2xl mx-auto">
              Whether you're looking for a luxury apartment in Mohali, a residential plot near the GMADA Expressway, or expert advice on real estate investment in Chandigarh, Dua Property is here to help. Explore our current listings or contact us today for a personalized consultation. Let us help you unlock your future in the Tricity.
            </p>
            <Link
              to="/contact" // Link to the contact page
              className="inline-block bg-dua-primary text-white py-3 px-8 rounded-md hover:bg-dua-accent transition-colors duration-300 text-lg font-medium"
            >
              Get In Touch
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
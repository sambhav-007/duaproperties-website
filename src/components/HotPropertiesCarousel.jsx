// src/components/HotPropertiesCarousel.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { getPropertyId, getPropertyMainImage, getPropertyTitle } from '../utils/propertyMappers';

function HotPropertiesCarousel({ properties }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);

  // Duplicate properties for infinite loop
  const duplicatedProperties = [...properties, ...properties, ...properties];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsPaused(true); // Pause auto-scroll when user manually scrolls
    
    const scrollAmount = container.offsetWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Resume auto-scroll after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const autoScroll = () => {
      if (isPaused || hoveredId) return;

      const scrollSpeed = 0.5; // Pixels per frame (slow speed)
      const currentScroll = container.scrollLeft;
      const oneThirdScroll = container.scrollWidth / 3;

      // Reset to beginning when we've scrolled through one set
      if (currentScroll >= oneThirdScroll * 2) {
        container.scrollLeft = oneThirdScroll;
      } else {
        container.scrollLeft = currentScroll + scrollSpeed;
      }
    };

    animationRef.current = setInterval(autoScroll, 16); // ~60fps

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPaused, hoveredId]);

  // Pause on hover
  const handleMouseEnter = (id) => {
    setHoveredId(id);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setIsPaused(false);
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-r-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right Arrow */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-l-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-8 py-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {duplicatedProperties.map((property, index) => (
          
          <motion.div
            key={`${getPropertyId(property)}-${index}`}
            className="flex-shrink-0 w-[280px] md:w-[350px]"
            onMouseEnter={() => handleMouseEnter(getPropertyId(property))}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/property/${getPropertyId(property)}`}>
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Property Image */}
                <div className="relative h-[400px] md:h-[450px] overflow-hidden">
                  <img
                    src={getPropertyMainImage(property)}
                    alt={getPropertyTitle(property)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      property.status === 'Sale' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      For {property.status}
                    </span>
                  </div>

                  {/* Property Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-bold mb-1 line-clamp-2">
                      {getPropertyTitle(property)}
                    </h3>
                    <p className="text-sm text-gray-200 mb-2 line-clamp-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-dua-accent">
                        {property.price}
                      </p>
                      <p className="text-sm bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                        {property.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Details (Netflix-style expansion) */}
                <AnimatePresence>
                  {hoveredId === getPropertyId(property) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white p-4 border-t-2 border-dua-accent"
                    >
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {property.description || 'Explore this amazing property...'}
                      </p>
                      <button className="w-full bg-dua-primary text-white py-2 rounded-lg hover:bg-dua-accent transition-colors duration-300 font-semibold">
                        View Details →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default HotPropertiesCarousel;

// src/components/HeroSlideshow.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';

function HeroSlideshow({ properties }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [properties.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % properties.length;
      }
      return prevIndex === 0 ? properties.length - 1 : prevIndex - 1;
    });
  };

  const currentProperty = properties[currentIndex];

  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={currentProperty.image_main}
            alt={currentProperty.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <div className="max-w-2xl text-white">
                {/* Hot Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-4 font-bold text-sm"
                >
                  🔥 HOT PROPERTY
                </motion.div>

                {/* Property Name */}
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                >
                  {currentProperty.name}
                </motion.h1>

                {/* Location */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-2 mb-4"
                >
                  <MapPinIcon className="w-6 h-6 text-dua-accent flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-gray-200">
                    {currentProperty.location}
                  </p>
                </motion.div>

                {/* Property Type & Price */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-4 mb-6"
                >
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <HomeIcon className="w-5 h-5" />
                    <span className="font-semibold">{currentProperty.type}</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-dua-accent">
                    {currentProperty.price}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-base md:text-lg text-gray-300 mb-8 line-clamp-3"
                >
                  {currentProperty.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to={`/property/${currentProperty.id}`}
                    className="bg-dua-accent text-dua-primary font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/properties"
                    className="bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    Browse All
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-dua-accent w-12 h-3'
                : 'bg-white/50 w-3 h-3 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-white text-3xl"
      >
        ↓
      </motion.div>
    </section>
  );
}

export default HeroSlideshow;

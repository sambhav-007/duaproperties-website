// src/pages/PropertiesPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PropertyCard from '../components/PropertyCard';
import { getAllProperties } from '../services/propertyApi';
import { getPropertyId, getPropertyTitle } from '../utils/propertyMappers';

const locationFilters = ['All Locations', 'Mohali', 'Chandigarh', 'Kharar', 'Dubai'];
const typeFilters = ['All Types', 'Residential', 'Commercial', 'Apartment', 'Independent Floor', 'Residential Plot', 'Villa'];
const statusFilters = ['All Status', 'Sale', 'Rent'];

const getPropertyRegion = (locationString) => {
  if (!locationString) return 'Other';
  const lowerLocation = locationString.toLowerCase();
  if (lowerLocation.includes('dubai') || lowerLocation.includes('uae')) return 'Dubai';
  if (lowerLocation.includes('kharar')) return 'Kharar';
  if (lowerLocation.includes('chandigarh')) return 'Chandigarh';
  if (lowerLocation.includes('mohali')) return 'Mohali';
  return 'Other';
};

function PropertiesPage() {
  const [searchParams] = useSearchParams();
  
  const [activeLocationFilter, setActiveLocationFilter] = useState('All Locations');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All Types');
  const [activeStatusFilter, setActiveStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allProperties, setAllProperties] = useState([]);

  // Handle URL parameters on mount
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const typesParam = searchParams.get('types'); // Multiple types separated by comma
    const locationParam = searchParams.get('location');
    const searchParam = searchParams.get('search');
    
    if (typeParam) {
      setActiveTypeFilter(typeParam);
    } else if (typesParam) {
      // Store multiple types for filtering
      setActiveTypeFilter(typesParam);
    }
    if (locationParam) {
      // Capitalize first letter for filter match
      const formattedLocation = locationParam.charAt(0).toUpperCase() + locationParam.slice(1).toLowerCase();
      setActiveLocationFilter(formattedLocation);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Fetch properties from the serverless API.
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setAllProperties(data);
      } catch (error) {
        console.error('Failed to load properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    let filtered = allProperties;

    // Location filter
    if (activeLocationFilter !== 'All Locations') {
      filtered = filtered.filter(
        (property) => getPropertyRegion(property.location) === activeLocationFilter
      );
    }

    // Type filter
    if (activeTypeFilter !== 'All Types') {
      filtered = filtered.filter((property) => {
        // Handle multiple types (comma-separated)
        if (activeTypeFilter.includes(',')) {
          const types = activeTypeFilter.split(',').map(t => t.trim().toLowerCase());
          return types.some(type => property.type?.toLowerCase() === type);
        }
        
        if (activeTypeFilter === 'Residential') {
          return property.type?.toLowerCase().includes('residential') || 
                 property.type?.toLowerCase().includes('apartment') ||
                 property.type?.toLowerCase().includes('independent floor') ||
                 property.configuration?.toLowerCase().includes('bhk');
        }
        return property.type?.toLowerCase().includes(activeTypeFilter.toLowerCase());
      });
    }

    // Status filter
    if (activeStatusFilter !== 'All Status') {
      filtered = filtered.filter(
        (property) => property.status?.toLowerCase() === activeStatusFilter.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          getPropertyTitle(property)?.toLowerCase().includes(query) ||
          property.location?.toLowerCase().includes(query) ||
          property.type?.toLowerCase().includes(query) ||
          property.developer?.toLowerCase().includes(query) ||
          property.description?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'name-asc') {
      filtered = [...filtered].sort((a, b) => getPropertyTitle(a).localeCompare(getPropertyTitle(b)));
    } else if (sortBy === 'name-desc') {
      filtered = [...filtered].sort((a, b) => getPropertyTitle(b).localeCompare(getPropertyTitle(a)));
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return filtered;
  }, [activeLocationFilter, activeTypeFilter, activeStatusFilter, searchQuery, sortBy, allProperties]);

  const clearAllFilters = () => {
    setActiveLocationFilter('All Locations');
    setActiveTypeFilter('All Types');
    setActiveStatusFilter('All Status');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <>
      <Helmet>
        <title>Properties for Sale | Mohali, Chandigarh, Kharar & Dubai | Dua Property</title>
        <meta
          name="description"
          content="Find luxury apartments, villas, and plots for sale across Mohali, Chandigarh, Kharar, and Dubai. Browse verified listings from Dua Property for your next investment."
        />
        <meta
          name="keywords"
          content="Dua Property listings, real estate Mohali, houses for sale Chandigarh, properties Kharar, Dubai real estate, buy apartment, commercial plots"
        />
        <link rel="canonical" href="https://www.duaproperty.com/properties" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dua Property | Premium Listings in Tricity & Dubai" />
        <meta
          property="og:description"
          content="Discover high-value investment and residential properties in Mohali, Chandigarh, Kharar, and Dubai with Dua Property."
        />
        <meta property="og:url" content="https://www.duaproperty.com/properties" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.duaproperty.com/default-share-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Properties for Sale | Dua Property" />
        <meta name="twitter:description" content="Browse verified property listings in Mohali, Chandigarh, Kharar & Dubai." />
        <meta name="twitter:image" content="https://www.duaproperty.com/default-share-image.png" />
      </Helmet>

      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dua-text mb-4">
              Discover Premium Properties
            </h1>
            <p className="text-lg md:text-xl text-dua-body max-w-3xl mx-auto">
              Explore handpicked luxury apartments, plots, and commercial spaces in Tricity & Dubai
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, location, type, or developer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 text-lg bg-white border-2 border-gray-300 text-dua-text placeholder-gray-500 rounded-2xl focus:border-dua-primary focus:outline-none focus:ring-2 focus:ring-dua-primary/20 transition-all duration-300 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dua-text transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Toggle & Sort */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-dua-accent hover:bg-amber-500 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              <FunnelIcon className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="flex items-center gap-4">
              <label className="text-dua-text font-semibold">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-gray-300 text-dua-text rounded-lg focus:border-dua-primary focus:outline-none focus:ring-2 focus:ring-dua-primary/20 transition-all duration-300"
              >
                <option value="default" className="bg-white">Default</option>
                <option value="name-asc" className="bg-white">Name (A-Z)</option>
                <option value="name-desc" className="bg-white">Name (Z-A)</option>
                <option value="newest" className="bg-white">Newest First</option>
              </select>
            </div>
          </motion.div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xl">
                  {/* Location Filter */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-dua-text mb-3">Location</h3>
                    <div className="flex flex-wrap gap-2">
                      {locationFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveLocationFilter(filter)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                            activeLocationFilter === filter
                              ? 'bg-dua-primary text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-dua-text hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-dua-text mb-3">Property Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {typeFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveTypeFilter(filter)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                            activeTypeFilter === filter
                              ? 'bg-dua-accent text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-dua-text hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-dua-text mb-3">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {statusFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveStatusFilter(filter)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                            activeStatusFilter === filter
                              ? 'bg-dua-primary text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-dua-text hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors duration-300 border border-red-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <p className="text-lg text-dua-body text-center">
              Showing <strong className="text-dua-primary text-xl">{filteredProperties.length}</strong> of{' '}
              <strong>{allProperties.length}</strong> properties
            </p>
          </motion.div>
          {/* Properties Grid */}
          <div className="mb-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 rounded-2xl h-[500px] shadow-lg border border-gray-300"
                  ></div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={getPropertyId(property)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-dua-text mb-2">No Properties Found</h3>
                <p className="text-dua-body mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-dua-accent hover:bg-amber-500 text-white font-semibold rounded-lg hover:shadow-2xl transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertiesPage;

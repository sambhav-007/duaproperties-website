/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- BRIGHT & ATTRACTIVE COLORS ---
        'dua-primary': '#0EA5E9',      // Bright sky blue
        'dua-secondary': '#10B981',    // Vibrant emerald green
        'dua-accent': '#F59E0B',       // Warm amber/orange
        'dua-text': '#1F2937',         // Dark gray for text
        'dua-body': '#4B5563',         // Medium gray for body
        'dua-bg-light': '#F0F9FF',     // Very light blue background
        'dua-bg-white': '#FFFFFF',     // Pure white
        'dua-highlight': '#EC4899',    // Pink for special highlights
        
        // --- LEGACY COLORS (Compatibility) ---
        'dua-gold': '#F59E0B',      
        'dua-dark-green': '#10B981',
      },

      fontFamily: {
        serif: ['Playfair Display', 'serif'], // For headings
        sans: ['Lato', 'sans-serif'],         // For body text
      },
  plugins: [],
    },
  },
}
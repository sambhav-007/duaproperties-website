/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- NEW COLORS ---
        'dua-primary': '#0F4C5C',   // Deep teal-green
        'dua-accent': '#D4AF37',    // Elegant gold
        'dua-text': '#333333',      // Dark text for headings
        'dua-body': '#555555',      // Lighter text for paragraphs
        'dua-bg-light': '#F9F9F9',  // Light background

        // --- OLD COLORS (Keep for now) ---
        'dua-gold': '#D4AF37',      
        'dua-dark-green': '#004d40',
      },

      fontFamily: {
        serif: ['Playfair Display', 'serif'], // For headings
        sans: ['Lato', 'sans-serif'],         // For body text
      },
  plugins: [],
    },
  },
}
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
        'dua-primary': '#0F4C5C',   // Your new deep teal-green
        'dua-accent': '#D4AF37',    // Your new elegant gold
        'dua-text': '#333333',      // Dark text for headings
        'dua-body': '#555555',      // Lighter text for paragraphs
        'dua-bg-light': '#F9F9F9',  // Light background

        // --- OLD COLORS (Keep for now) ---
        'dua-gold': '#D4AF37',       // Keeping old gold name (same value as new accent for now)
        'dua-dark-green': '#004d40', // Keeping old dark green name
      },
      fontFamily: {
        // Leave this empty for now, we'll do fonts later
      }
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite'
      },
    },
  },
  plugins: [],
}
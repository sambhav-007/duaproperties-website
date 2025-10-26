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
      keyframes: {
        
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
      animation: {
        breathe: 'breathe 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        },
        fontFamily: {
          serif: ['Playfair Display', 'serif'], // Custom utility class for headings
          sans: ['Lato', 'sans-serif'],        // Overrides default sans-serif for all body text
        }
      },
    },
    plugins: [],
  }
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        'dua-primary': '#0F4C5C', // Your new deep teal-green
        'dua-accent': '#D4AF37',  // Your new elegant gold
        'dua-text': '#333333',    // Dark text for headings
        'dua-body': '#555555',    // Lighter text for paragraphs
        'dua-bg-light': '#F9F9F9',// Light background
        // Keep old ones for reference or if still used elsewhere
        'dua-dark-green': '#10403B',
        'dua-gold': '#E5A132',
      },
      fontFamily: {
        // Add your new fonts here after importing them in index.css
        // sans: ['YourHeadingFont', 'sans-serif'],
        // body: ['YourBodyFont', 'sans-serif'],
      }
    },
  },
  // ...
};
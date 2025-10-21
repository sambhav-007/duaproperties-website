/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dua-gold': '#D4AF37', // Or your client's exact gold
        'dua-dark-green': '#004d40', // Or your client's exact green
      }
    },
  },
  plugins: [],
}
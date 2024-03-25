/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dm_sans: ['DM Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        open_sans: ['Open Sans', 'sans serif']
      },
      borderRadius: {
        customBlRadius: '0 0 20% 0',
      },

      colors: {
        'violettitle': '#2B3674',
        'violetdesc': "#A3AED0",
        'violetpur': "#4318FF"
      },
      fontWeight: {
        regular: '400',
        medium: '480'
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}

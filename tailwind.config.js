/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./@/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm_sans: ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        open_sans: ["Open Sans", "sans serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        customBlRadius: "0 0 20% 0",
      },
      backdropBlur: {
        custom: "5px",
      },
      colors: {
        violettitle: "#1B2559",
        violetdesc: "#302CA4",
        violetpur: "#4318FF",
        background: "#F9FAFA",
        textPrimary: "#1C1D22",
        textSecondary: "#3C3F4A",
        buttonBlue: "#607AFB",
        activecolor: "#EEEFF2",
      },
      fontWeight: {
        regular: "400",
        medium: "480",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

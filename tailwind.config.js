/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw",
  content: [
    "tailwind.config.js",
    "./tailwind/**/*.{js,ts,jsx,tsx,css}",
    "./docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  safelist: [],
  plugins: [],
};

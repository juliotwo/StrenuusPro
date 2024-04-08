/** @type {import('tailwindcss').Config} */
const primary = "#252525"; // Green
// const primary = '#ff7c9d'; // Pink

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        hero: "calc(100vh - 70px)",
      },
      colors: {
        primary,
      },
      backgroundImage: {
        hero: 'url("/images/hero.jpg")',
        "hero-about": 'url("/images/hero-about.jpg")',
        "hero-services": 'url("/images/hero-services.jpg")',
        "hero-missions": 'url("/images/hero-missions.jpg")',
        "hero-reviews": 'url("/images/hero-reviews.jpg")',
        "hero-contact": 'url("/images/hero-contact.jpg")',
        contact: 'url("/images/hero-contact.jpg")',
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
};

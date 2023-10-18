/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f24190",

        secondary: "#ea2ada",

        accent: "#3521ba",

        neutral: "#23242f",

        "base-100": "#402447",

        info: "#2e74e5",

        success: "#47e6a9",

        warning: "#99540b",

        error: "#ec8579",


      },
    },
  },
  plugins: [],
};

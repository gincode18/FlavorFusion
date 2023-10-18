/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"  ],
  theme: {
    extend: {
      colors: {
        "primary": "#661AE6",
        "primary-content": "#ffffff",
        "secondary": "#D926AA",
        "secondary-content": "#ffffff",
        "accent": "#1FB2A5",
        "accent-content": "#ffffff",
        "neutral": "#2a323c",
        "neutral-focus": "#242b33",
        "neutral-content": "#A6ADBB",
        "base-100": "#1d232a",
        "base-200": "#191e24",
        "base-300": "#15191e",
        "base-content": "#A6ADBB",
      },
    },
  },
  plugins: [],
};

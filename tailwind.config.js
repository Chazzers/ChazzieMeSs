/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: { sans: ["Inter", "sans-serif"] },
    extend: {
      colors: {
        hibiscus: {
          50: "#fcf3f8",
          100: "#fbe8f4",
          200: "#f9d1e9",
          300: "#f5acd7",
          400: "#ee78ba",
          500: "#e4509f",
          600: "#d2307e",
          700: "#c1226a",
          800: "#961e52",
          900: "#7e1d48",
          950: "#4c0b27",
        },
      },
    },
  },
  plugins: [],
};

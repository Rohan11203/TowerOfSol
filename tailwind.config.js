/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          300: "#00E701",
          400: "#00C701",
          500: "#00A701",
        },
      },
    },
  },
  plugins: [],
};

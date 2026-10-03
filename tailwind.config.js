/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#090A0F',
        surface: '#12151E',
        surfaceElevated: '#1A1E2E',
        primary: '#6366F1',
        secondary: '#EC4899',
        border: '#1E293B',
      },
    },
  },
  plugins: [],
};

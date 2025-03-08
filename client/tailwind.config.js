/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        lexiBlue: {
          100: '#f3f8ff',
          500: '#1967D2',
          600: '#293460',
          800: '#384371',
        }
      }
    },
  },
  plugins: [],
}


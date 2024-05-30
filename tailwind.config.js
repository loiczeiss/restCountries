/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkBlue': 'hsl(209, 23%, 22%)',
        'veryDarkBlue': 'hsl(207, 26%, 17%)',
        'veryDarkBlueLM': 'hsl(200, 15%, 8%)',
        'darkGray': 'hsl(0, 0%, 52%)',
        'veryLightGray': 'hsl(0, 0%, 98%)',
        'whiteL&D': 'hsl(0,0%,100%)'
      },
      fontFamily:{
        nunito : ['"Nunito Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
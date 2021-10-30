module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx,scss}', './components/**/*.{js,ts,jsx,tsx,scss}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        default: ['Nunito', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

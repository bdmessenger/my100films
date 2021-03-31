module.exports = {
  purge: [
    './src/index.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.45)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

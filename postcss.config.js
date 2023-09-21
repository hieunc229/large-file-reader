const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'tailwindcss/nesting': {},
    'postcss-preset-env': {},
    tailwindcss,
    autoprefixer
  },
};
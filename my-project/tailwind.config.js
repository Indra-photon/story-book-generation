// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF0FB',
          100: '#FFE1F7',
          200: '#FFC3EF',
          300: '#FFA6E7',
          400: '#FF88DF',
          500: '#FF47DA', // Main primary color
          600: '#FF29D1',
          700: '#F700C0',
          800: '#C90099',
          900: '#97007A',
        },
        secondary: {
          50: '#EFEDFF',
          100: '#DEDCFF',
          200: '#BDB9FF',
          300: '#9C96FF',
          400: '#7B73FF',
          500: '#5D4DFF', // Main secondary color
          600: '#3F2AFF',
          700: '#2307FF',
          800: '#1900D6',
          900: '#1300A3',
        },
        accent: '#FFCB2B', // Yellow accent
        accent2: '#27EEC8', // Teal accent
        dark: '#3D1D8C', // Dark purple for text and contrast
        light: '#F7F3FF', // Light background color
      },
      fontFamily: {
        sans: ['Fredoka', ...fontFamily.sans],
        chewy: ['Chewy', 'cursive'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF47DA 0%, #5D4DFF 100%)',
      },
      boxShadow: {
        'button': '0 4px 0 #3D1D8C',
      },
      animation: {
        float: 'float 12s infinite ease-in-out',
        bounce: 'bounce 4s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
}
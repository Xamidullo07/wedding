/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        garamond: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fbf7ef',
          100: '#f5ecd9',
          200: '#ead4a8',
          300: '#dcb873',
          400: '#cc9e4c',
          500: '#b8843a',
          600: '#9a6a30',
          700: '#7c5328',
          800: '#634425',
          900: '#523922',
        },
        sage: {
          50: '#f4f6f1',
          100: '#e6ebe0',
          200: '#ced8c2',
          300: '#aab39a',
          400: '#85906f',
          500: '#677254',
          600: '#525b43',
          700: '#424937',
          800: '#383e30',
          900: '#313529',
        },
        cream: {
          50: '#fdfcf8',
          100: '#faf6ec',
          200: '#f4ecd6',
          300: '#ecdab8',
        },
      },
      animation: {
        'fade-up': 'fadeUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-in-delayed': 'fadeIn 1.2s ease-out 0.3s forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'petal-fall': 'petalFall 12s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(110vh) translateX(50px) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

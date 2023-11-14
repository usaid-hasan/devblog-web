/* eslint-disable quote-props */
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Overpass', ...defaultTheme.fontFamily.sans],
        'mono': ['Overpass Mono', ...defaultTheme.fontFamily.mono],
      },
      backdropBlur: {
        'xs': '1px',
      },
      keyframes: {
        slidein: {
          'from': { opacity: 0, transform: 'translateY(-2rem)' },
          'to': { opacity: 1, transform: 'translateY(0%)' },
        },
        slideout: {
          'from': { opacity: 1, transform: 'translateY(0)' },
          'to': { opacity: 0, transform: 'translateY(2rem)' },
        },
        rotate: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        inflate: {
          '0%, 50%': { animationTimingFunction: 'cubic-bezier(.27, .42, .37, .99)', r: '1px' },
          '25%': { animationTimingFunction: 'cubic-bezier(.53, 0, .61, .73)', r: '2px' },
        },
      },
      animation: {
        'slidein': 'slidein 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slideout': 'slideout 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;',
        'spinback': 'rotate 6s linear infinite',
        'inflate': 'inflate 1.2s infinite',
      },
    },
  },
  plugins: [
    plugin(({ addVariant, matchUtilities }) => {
      addVariant('mouse', '@media (hover: hover)');
      matchUtilities({
        'animation-delay': (value) => ({ 'animation-delay': value }),
      });
    }),
  ],
};

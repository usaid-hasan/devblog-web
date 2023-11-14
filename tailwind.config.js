/* eslint-disable quote-props */
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

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
      typography: (theme) => ({
        'zinc': {
          css: {
            '--tw-prose-body': theme('colors.zinc.700'),
            '--tw-prose-headings': theme('colors.zinc.700'),
            '--tw-prose-bold': theme('colors.zinc.700'),
            '--tw-prose-pre-code': theme('colors.zinc.700'),
            '--tw-prose-pre-bg': theme('colors.zinc.200'),
            '--tw-prose-invert-body': theme('colors.zinc.200'),
            '--tw-prose-invert-headings': theme('colors.zinc.200'),
            '--tw-prose-invert-bold': theme('colors.zinc.200'),
            '--tw-prose-invert-hr': theme('colors.zinc.600'),
            '--tw-prose-invert-quote-borders': theme('colors.zinc.600'),
          },
        },
      }),
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant, matchUtilities }) => {
      addVariant('mouse', '@media (hover: hover)');
      matchUtilities({
        'animation-delay': (value) => ({ 'animation-delay': value }),
      });
    }),
  ],
};

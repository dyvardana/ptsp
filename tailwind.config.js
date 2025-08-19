import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
                colors: {
        gold: {
          100: '#f7e1a3',
          200: '#f2d06f',
          300: '#e0b34d',
          400: '#d19429',
          500: '#bf7a00', // Bisa dijadikan gold utama
          600: '#9f6700',
          700: '#7f5400', // Warna gold lebih gelap
          800: '#5f4100',
          900: '#3f2e00',
        },
      },
        },
    },

     plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['autumn'], // Hanya pakai tema pastel
  },
};

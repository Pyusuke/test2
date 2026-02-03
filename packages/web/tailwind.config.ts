import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd7',
          200: '#f9d7ae',
          300: '#f5ba7a',
          400: '#f09444',
          500: '#ec7620',
          600: '#dd5c16',
          700: '#b74514',
          800: '#923818',
          900: '#763016',
          950: '#401609',
        },
      },
    },
  },
  plugins: [],
};
export default config;

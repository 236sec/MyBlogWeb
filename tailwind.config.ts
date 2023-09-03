import type { Config } from 'tailwindcss'


const config : Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary_light': '#3FA037',
      'secondary_light': '#FEFEFE',
      'primary_variants_light': '#4DB33D',
      'light': '#f1f5f9',
      'black': '#121212',
      'white': '#FFFFFF',
      "red": '#B34045',
      "sky":"#38bdf8",
      'primary_dark': '#0ea5e9',
      'secondary_dark': '#03DAC6',
      'primary_variants_dark': '#f1f5f9',
    },
    extend: {
      colors:{},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    darkMode: 'class',
    colors: {
      'primary_light': '#3FA037',
      'secondary_light': '#FEFEFE',
      'primary_variants_light': '#4DB33D',
      'light':"#FFFFFF",
      'black':"#121212",
      'white':"#FFFFFF",
      "red":"#B34045",
      'primary_dark': '#f1f5f9',
      'secondary_dark': '#03DAC6',
      'primary_variants_dark': '#0ea5e9',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

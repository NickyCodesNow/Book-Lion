/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4A90E2',
        'warm-orange': '#FF6B35',
        'sunshine-yellow': '#FFD23F',
        'soft-pink': '#FFB3BA',
        'mint-green': '#A8E6CF',
        'lavender': '#C7CEEA',
        'warm-gray': '#F5F5F5',
        'text-dark': '#2C3E50',
        'text-medium': '#5D6D7E',
        'text-light': '#85929E',
        'black': '#1A1A1A',
      },
      fontFamily: {
        'playful': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'organic': '2rem',
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}


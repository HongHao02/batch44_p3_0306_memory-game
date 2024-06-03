/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use the 'class' strategy for toggling dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      backgroundClip: {
        'text': 'text',
      },
      textFillColor: {
        'transparent': 'transparent',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-clip-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
        },
        '.text-fill-transparent': {
          'color': 'transparent',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    }
  ],
}


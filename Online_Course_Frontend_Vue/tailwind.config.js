/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo 500
          light: '#818cf8',
          dark: '#4f46e5',
        },
        accent: {
          DEFAULT: '#8b5cf6', // Violet 500
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        dark: {
          DEFAULT: '#0f172a', // Slate 900
          light: '#334155',
          lighter: '#64748b',
        },
        light: {
          DEFAULT: '#f8fafc',
          dark: '#f1f5f9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#F8F7F2',
        'charcoal': '#20211F',
        'panda-green': '#A7C957',
        'panda-dark': '#2D5A27',
        'soft-sage': '#E6EBD9',
        'warm-cream': '#F1EFE8',
        'terracotta': '#C8553D',
        'forest': '#386641',
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Plus Jakarta Sans',
          'Outfit',
          'Inter',
          'sans-serif',
        ],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(32, 33, 31, 0.04)',
        'card': '0 8px 30px rgba(32, 33, 31, 0.06)',
        'elevated': '0 16px 40px rgba(32, 33, 31, 0.08)',
        'floating': '0 20px 50px rgba(32, 33, 31, 0.12)',
      },
    },
  },
  plugins: [],
}

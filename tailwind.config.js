/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        paper: 'var(--paper-bg)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        accent: 'var(--accent)',
        main: 'var(--text-main)',
        muted: 'var(--text-muted)',
        bordercolor: 'var(--border)',
      },
      boxShadow: {
        'neoskeuo': 'var(--shadow)',
        'neoskeuo-pressed': 'var(--btn-shadow-active)',
        'btn': 'var(--btn-shadow)',
        'upload': 'var(--upload-shadow)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'texture': 'var(--texture)',
      }
    },
  },
  plugins: [],
}

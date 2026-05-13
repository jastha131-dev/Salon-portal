import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rose-primary': '#C9687A',
        'rose-light': '#F2A7B8',
        'rose-dark': '#8B3A4A',
        'gold-accent': '#C9A84C',
        'gold-light': '#E8D5A0',
        'cream-bg': '#FAF7F4',
        'warm-white': '#FFFCF9',
        'charcoal': '#1C1C2E',
        'muted': '#6B6B7B',
        'muted-light': '#A8A8B3',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #C9687A 0%, #F2A7B8 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8D5A0 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(28,28,46,0.3) 0%, rgba(28,28,46,0.7) 100%)',
        'cream-gradient': 'linear-gradient(135deg, #FAF7F4 0%, #FFFCF9 50%, #F5EDE8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(201, 104, 122, 0.15)',
        'gold': '0 4px 24px rgba(201, 168, 76, 0.2)',
        'card': '0 2px 16px rgba(28, 28, 46, 0.08)',
        'card-hover': '0 8px 32px rgba(28, 28, 46, 0.16)',
      },
    },
  },
  plugins: [],
}

export default config

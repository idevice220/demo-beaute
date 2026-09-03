import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBF8F3',
        sand: { DEFAULT: '#F3ECE2', 2: '#EAE0D3' },
        nude: '#E6D3C5',
        terra: { DEFAULT: '#C4715A', deep: '#A65A46', tint: '#F6E3DB' },
        forest: { DEFAULT: '#2E3F36', deep: '#1F2B25' },
        sage: '#9AA88F',
        ink: '#2B2522',
        muted: '#7A6E68',
        gold: '#C9A961',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { arch: '999px 999px 24px 24px' },
      boxShadow: {
        soft: '0 1px 2px rgba(43,37,34,0.05), 0 16px 40px -20px rgba(43,37,34,0.25)',
        lift: '0 30px 60px -25px rgba(43,37,34,0.4)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'none' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp .8s cubic-bezier(.22,1,.36,1) both',
        'spin-slow': 'spin 24s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config

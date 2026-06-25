/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand palette — the mist → forest → stone → marble journey
        paper: '#F6F3EE',
        mist: '#E9E6E1',
        stone: '#D9D5CE',
        forest: '#243126',
        graphite: '#171717',
        sage: '#70826B',
        gold: '#C9A961',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      fontSize: {
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.28em' }],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
}

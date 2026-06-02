/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        nt: {
          bg:      '#0D1117',
          card:    '#161B22',
          sidebar: '#1E2A3A',
          blue:    '#2196F3',
          teal:    '#00D4AA',
          orange:  '#F4A261',
          red:     '#E53935',
          yellow:  '#FFC107',
          green:   '#43A047',
          purple:  '#7B2FBE',
          txt:     '#FFFFFF',
          txt2:    '#8B9DC3',
          border:  '#30363D',
        },
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit':       'orbit 20s linear infinite',
        'orbit-rev':   'orbit 30s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Exact Moovit Color Palette
        'moovit-orange': '#FF6600',
        'moovit-blue': '#1A73E8',
        'moovit-bg': '#FAFAFA',
        'moovit-card': '#FFFFFF',
        'moovit-input': '#F5F5F5',
        'moovit-hover': '#F0F0F0',
        'moovit-text': '#202124',
        'moovit-secondary': '#5F6368',
        'moovit-tertiary': '#80868B',
        'moovit-border': '#DADCE0',
        'moovit-light': '#E8EAED',

        // Tailwind UI colors (updated to match Moovit)
        border: '#DADCE0',
        input: '#F5F5F5',
        ring: '#FF6600',
        background: '#FAFAFA',
        foreground: '#202124',
        primary: {
          DEFAULT: '#FF6600',
          foreground: '#FFFFFF',
          dark: '#E65C00',
        },
        secondary: {
          DEFAULT: '#1A73E8',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#D93025',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#5F6368',
        },
        accent: {
          DEFAULT: '#FF6600',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#202124',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#202124',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        'pill': '9999px',
      },
      boxShadow: {
        'moovit-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'moovit-md': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'moovit-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'header': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'soft': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'medium': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'strong': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

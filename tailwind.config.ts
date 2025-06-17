
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.75rem',
      screens: {
        '2xl': '1420px'
      }
    },
    extend: {
      fontFamily: {
        heading: [
          '"Playfair Display"',
          'serif',
        ],
        fb: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      },
      borderRadius: {
        'lg': '1.25rem',
        'xl': '1.75rem',
        '2xl': '2.5rem'
      },
      colors: {
        // ESPN-inspired palette
        primary: { DEFAULT: "#CC0000", foreground: "#fff" }, // ESPN Red
        secondary: { DEFAULT: "#1a1a1a", foreground: "#fff" }, // Near-black
        accent: { DEFAULT: "#fff", foreground: "#CC0000" }, // All accents are white, with red text where applicable
        red: "#CC0000",
        black: "#101820",
        white: "#fff",
        // Backgrounds and text
        background: "#fff",
        surface: "#fff",
        card: "#f5f5f5",
        border: "#e2e5e8",
        muted: "#f4f4f4",
        text: "#101820",
        "text-muted": "#6c727a",
        shadow: "#18191b26",
        gray: {
          50: "#fafafd",
          100: "#f5f5f5",
          200: "#f0f0f0",
          300: "#e2e5e8",
          400: "#b7b8b9",
          500: "#8d9195",
          600: "#4b5157",
          700: "#2a2d32",
          800: "#1a1a1a",
          900: "#101820",
        },
        // Feedback colors (success/warning/error)
        success: { DEFAULT: "#1db954", foreground: "#fff" },
        warning: { DEFAULT: "#fff8e1", foreground: "#a87806" },
        error: { DEFAULT: "#D72638", foreground: "#fff" },
      },
      boxShadow: {
        'card': '0 2px 20px 0 rgba(30, 41, 59, 0.07)',
        'nav': '0 2px 16px 0 rgba(24, 70, 163, 0.06)',
        'outline': '0 0 0 2px #cc000033',
      },
      backgroundImage: {
        'card-glass':
          'none', // no gradients!
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in',
        'card-pop': 'scale-in 0.25s cubic-bezier(0.4,0,0.6,1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;


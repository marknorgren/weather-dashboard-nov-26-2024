import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: {
          light: '#81e6d9',  // Light teal
          DEFAULT: '#38b2ac', // Teal
          dark: '#2c7a7b',   // Dark teal
        },
        secondary: {
          light: '#fbb6ce',
          DEFAULT: '#f687b3',
          dark: '#e53e3e',
        },
        neutral: {
          light: '#edf2f7',
          DEFAULT: '#e2e8f0',
          dark: '#cbd5e0',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

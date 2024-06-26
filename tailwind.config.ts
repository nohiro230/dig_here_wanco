import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        default: {
          DEFAULT: '#555555',
        },
        base: {
          100: "#ffffff",
          200: "#eeeeee",
          300: "#e5e6e6",
          400: "#999999",
          content: "#1f2937",
        },
        primary: {
          DEFAULT: '#6B493B',
        },
        secondary: {
          DEFAULT: '#ffe8cf',
          light: '#fff4e7',
        },
        pink: {
          DEFAULT: '#EAAA9F',
        },
        blue: {
          DEFAULT: '#8eaac7',
        },
        orange: {
          DEFAULT: '#f1ae66',
        },
      },
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;

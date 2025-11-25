import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9333ea",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#e2e8f0",
          foreground: "#1e293b",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b",
        },
        background: "#ffffff",
        foreground: "#1e293b",
        input: "#e2e8f0",
        ring: "#9333ea",
      },
    },
  },
  plugins: [],
};

export default config;

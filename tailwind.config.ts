import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-green": "#535E1C",
        "light-green": "#BBC191",
        "dark-brown": "#543A27",
        "light-brown": "#8A5D3D",
        "cream": "#F1ECE2",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Cormorant", "serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;

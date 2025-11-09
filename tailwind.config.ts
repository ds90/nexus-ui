import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",

        // Semantic colors (CSS variables - definite in globals.css)
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        border: "var(--border)",
        input: "var(--input)",

        ring: {
          DEFAULT: "var(--ring)",
          secondary: "var(--ring-secondary)",
        },

        fixed:{
          DEFAULT: "var(--fixed-primary)",
          secondary: "var(--fixed-secondary)"
        } 
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

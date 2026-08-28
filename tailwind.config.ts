import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0e1320",
        surface: "#0e1320",
        "surface-dim": "#0e1320",
        "surface-bright": "#343948",
        "surface-variant": "#303443",
        "surface-container-lowest": "#090e1b",
        "surface-container-low": "#161b29",
        "surface-container": "#1a1f2d",
        "surface-container-high": "#252a38",
        "surface-container-highest": "#303443",
        "on-surface": "#dee2f5",
        "on-surface-variant": "#c2c6d6",
        "inverse-surface": "#dee2f5",
        "inverse-on-surface": "#2b303e",
        outline: "#8c909f",
        "outline-variant": "#424753",
        "surface-tint": "#afc6ff",
        primary: {
          DEFAULT: "#afc6ff",
          container: "#528dff",
          fixed: "#d9e2ff",
          "fixed-dim": "#afc6ff",
          inverse: "#0059c6",
          dark: "#002d6c",
        },
        secondary: {
          DEFAULT: "#d0bcff",
          container: "#571bc1",
          fixed: "#e9ddff",
          "fixed-dim": "#d0bcff",
          dark: "#3c0091",
        },
        tertiary: {
          DEFAULT: "#44d6fe",
          container: "#009ebf",
          fixed: "#b4ebff",
          "fixed-dim": "#44d6fe",
          dark: "#003542",
        },
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
          dark: "#690005",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "Sora", "sans-serif"],
        body: ["var(--font-hanken)", "Hanken Grotesk", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        glass: "20px",
        xl2: "24px",
        xl3: "32px",
        xl4: "40px",
      },
      boxShadow: {
        glowPrimary: "0 0 25px rgba(175, 198, 255, 0.4)",
        glowSecondary: "0 0 35px rgba(208, 188, 255, 0.3)",
        glowTertiary: "0 0 25px rgba(68, 214, 254, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;

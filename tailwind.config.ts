import type { Config } from "tailwindcss";

/*
 * Şimşek Grup brand palette (Kurumsal Kimlik Kılavuzu):
 *  - "Süreklilik Mavisi"  #202c5a  → graphite scale
 *  - "Üretim Sarısı"      #f6bc32  → volt scale
 *  - Light neutral surfaces        → mist scale
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        graphite: {
          950: "#0d1329",
          900: "#141d3d",
          800: "#1a244c",
          700: "#202c5a",
          600: "#2a3a76",
          500: "#3a4d97",
          400: "#6a7ab5",
          300: "#9aa6d0",
          200: "#c6cde7",
          100: "#e7eaf5",
        },
        volt: {
          900: "#6d4b08",
          800: "#93670c",
          700: "#bd8812",
          600: "#dfa51f",
          500: "#f6bc32",
          400: "#f8ca5c",
          300: "#fbda8c",
          200: "#fdeabd",
          100: "#fef7e3",
        },
        mist: {
          950: "#0f1322",
          900: "#1a2033",
          800: "#272f45",
          700: "#3b4560",
          600: "#515c7c",
          500: "#6f7a99",
          400: "#9aa4c0",
          300: "#c3cbdf",
          200: "#dde2ee",
          100: "#ebeef6",
          50: "#f5f7fb",
        },
        spark: {
          500: "#2da8ff",
          600: "#1c8ee0",
        },
        aqua: {
          500: "#02b7d4",
          600: "#007a8f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      backgroundImage: {
        "solar-gradient": "linear-gradient(135deg, #f8ca5c 0%, #f6bc32 55%, #dfa51f 100%)",
        "graphite-gradient": "linear-gradient(135deg, #202c5a 0%, #1a244c 60%, #0d1329 100%)",
        "sunrise-gradient": "radial-gradient(120% 120% at 20% 10%, #f8ca5c 0%, #202c5a 45%, #0d1329 100%)",
        "silver-gradient": "linear-gradient(165deg, #ffffff 0%, #f5f7fb 45%, #e7eaf5 100%)",
        "blueprint-grid":
          "linear-gradient(rgba(32,44,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(32,44,90,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(246, 188, 50, 0.55)",
        card: "0 1px 2px rgba(13,19,41,0.05), 0 12px 32px -12px rgba(13,19,41,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

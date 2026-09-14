import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: "#F2F1ED",
          surface: "#FAF9F6",
          card: "#FFFFFF",
          elevated: "#FFFFFF",
          muted: "#EAE7E1",
          stone: "#E2DED7",
        },
        brand: {
          charcoal: {
            DEFAULT: "#181716",
            hover: "#2C2B28",
            light: "#3A3834",
          },
          peach: {
            DEFAULT: "#E58B7B",
            light: "#F5D4CD",
            subtle: "rgba(229, 139, 123, 0.15)",
          },
          sand: {
            DEFAULT: "#CBB394",
            light: "#F0E7DB",
          },
          purple: {
            DEFAULT: "#181716",
            light: "#2C2B28",
            accent: "#4F46E5",
          },
          yellow: {
            DEFAULT: "#181716",
            hover: "#2C2B28",
          },
        },
        text: {
          primary: "#181716",
          secondary: "#686661",
          muted: "#9E9C95",
        },
        border: {
          subtle: "rgba(0, 0, 0, 0.07)",
          glass: "rgba(255, 255, 255, 0.85)",
          glow: "rgba(0, 0, 0, 0.12)",
          neon: "rgba(229, 139, 123, 0.35)",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-prompt)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-serif)", "var(--font-jakarta)", "sans-serif"],
        thai: ["var(--font-prompt)", "sans-serif"],
        english: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        "card": "0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)",
        "glass": "0 20px 40px -15px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.9) inset",
        "pill": "0 4px 14px 0 rgba(0, 0, 0, 0.12)",
        "glow-purple": "0 8px 20px -4px rgba(0, 0, 0, 0.12)",
        "glow-yellow": "0 8px 20px -4px rgba(0, 0, 0, 0.14)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "pulse-subtle": "pulseSubtle 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

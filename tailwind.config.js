/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      display: [
        "group-hover",
        "group-focus",
        "table-header-group",
        "table-row-group",
      ],
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        popIn: {
          "0%": { scale: "0%" },
          "50%": { scale: "110%" },
          "100%": { scale: "100%" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        move: {
          to: {
            strokeDashoffset: "1000",
          },
        },
      },
      animation: {
        popIn: "popIn 0.4s linear ",
        wiggle: "wiggle 1s ease-in-out infinite",
        rotate: "rotate 1s ease-in-out forwards",
      },
      fontFamily: {
        sans: ["NotoSansArabic", "sans-serif"],
      },
      colors: {
        primary: "#1f1f1f",
        light_primary: "#383838",
        dark_primary: "#181818",
        secondary: "#025CA2",
        light_secondary: "#0078D4",
        input_background: "#1C1C1C",
        warning: "#8C8303",
        danger: "#B10402",
        text: "#CCCCCC",
        light_text: "#ffffff",
        dark_text: "#B2B2B2",
      },
    },
    variants: {
      extend: {
        display: ["print"],
        position: ["print"],
        top: ["print"],
        width: ["print"],
        backgroundColor: ["print"],
        zIndex: ["print"],
      },
    },
  },
  plugins: [],
};

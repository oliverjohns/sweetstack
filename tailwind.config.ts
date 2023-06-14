import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-inter), sans-serif"],
    },
    extend: {
      boxShadow: {
        custom: "0px 0px 0px 1px rgb(200, 202, 205)",
        hover: "0px 0px 0px 1px rgb(223, 225, 228)",
      },
      colors: {
        primary: "#33AA33",
        "dark-text": "#282A30",
        "bg-light": "#F5F6F8",
      },
    },
  },
  plugins: [],
} satisfies Config;

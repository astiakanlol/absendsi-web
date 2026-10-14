import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kai: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd8ff",
          300: "#8ec0ff",
          400: "#589dff",
          500: "#3278ff",
          600: "#1a58f5",
          700: "#1444e1",
          800: "#1738b6",
          900: "#19348f",
          950: "#142157",
        },
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.06)",
        card: "0 4px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;

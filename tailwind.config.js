/** @type {import('tailwindcss').Config} */
import scrollHide from "tailwind-scrollbar-hide";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#983cd1",
        secondary: "#fff",
        third: "#04152d",
        "black-light": "#020c1b",

        "primary-light": "#df61ff",
        "secondary-light": "#fff",
        "third-light": "#1c4b91",

        "input-primary": "#ddd",
        "input-secondary": "#fff",
      },
    },
  },
  plugins: [scrollHide],
};

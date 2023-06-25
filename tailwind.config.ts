import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["night"]
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'),],
} satisfies Config;

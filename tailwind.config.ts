import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        night: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
        ...require("daisyui/src/theming/themes")["[data-theme=night]"],
        ".my-green": {
          "color": "#33CC66",
        }
      }  as React.CSSProperties}, "acid"]
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'), require("daisyui/src/theming/themes")],
} satisfies Config;

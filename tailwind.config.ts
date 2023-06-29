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
        ".icon-color-plus-minus": {
          "color": "#33CC66",
        }, 
        ".icon-color-delete": {
          "color": "#f472b6",
        }, 
        ".icon-color-edit": {
          "color": "#33CC66",
        }, 
        ".menu-background": {
          "background-color": "#1f2937"
        }
      }  as React.CSSProperties}, 
      {
        acid: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
        ...require("daisyui/src/theming/themes")["[data-theme=acid]"],
        ".icon-color-plus-minus": {
          "color": "#37cdbe",
        }, 
        ".icon-color-delete": {
          "color": "#d97706",
        }, 
        ".icon-color-edit": {
          "color": "#37cdbe",
        }, 
        ".menu-background": {
          "background-color": "#dddddd"
        }, 
        "accent": "#37cdbe",
      }  as React.CSSProperties}, 
      ]
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
} satisfies Config;

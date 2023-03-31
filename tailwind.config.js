/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  darkMode: "class",

  theme: {
    extend: {
      backgroundColor: {
        header_bg: "#F3F3F3",
        header_dark_bg: "#2b3041",
        main_dark_bg: "#262b3c",
        cell_default_bg: "#daddde",
        cell_dark_bg: "#3c4150",
        cell_false_bg: "#939B9F",
        cell_true_bg: "#66A060",
        cell_false_position: "#CEB02C",
        cell_dark_false_position: "#CEB02C",
        cell_dark_true_bg: "#6AAA64",
        cell_dark_false_bg: "#939B9F",
        key_light_bg: "#D3D6DA",
        key_dark_bg: "#565F7E",
        key_dark_false: "#4C5255",
        message_bg: "#787c7e",
      },
      textColor: {
        key_light: "#56575E",
      },
    },
  },
  variants: {
    extends: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};

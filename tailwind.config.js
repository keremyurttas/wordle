/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        header_bg: "#F3F3F3",
        cell_default_bg: "#daddde",
        cell_false_bg: "#939B9F",
        cell_true_bg: "#66A060",
        cell_false_position: "#CEB02C",
        key_light_bg: "#D3D6DA",
      },
      textColor: {
        key_light: "#56575E",
      },
    },
  },
  plugins: [],
};

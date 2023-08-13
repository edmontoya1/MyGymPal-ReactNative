/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "#212121",
      primaryWhite: "#D9D9D9",
      secondaryGray: "#E0E0E0",
      white: "#FFFFFF",
      black: "#000000",
    },
    letterSpacing: {
      widest: ".5rem",
    },
  },
  "tailwindCSS.classAttributes": [
    // ...
    "style",
  ],
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)",
    ["tw.style\\(([^)]*)\\)", "'([^']*)'"],
  ],
};

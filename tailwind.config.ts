import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        chakra: ['"Chakra Petch"'],
        titan: ["Titan One", "cursive"],
      },
    },
    //   white: "var(--color-white)",
    // },

    textColor: {
      primary: "#0970D7",
      light: " #50A3F7",
      middark: "#101011",
      dark: "#111111",
      deep: "#000000",
      ordinary: "#40C1AD",
      header: "#07529D",
      secondary: "#f3a712",
      error: "#FF3333",
      white: "#fff",
    },
    backgroundColor: {
      primary: "#0970D7",
      light: " #50A3F7",
      middark: "#101011",
      dark: "#111111",
      deep: "#000000",
      ordinary: "#40C1AD",
      header: "#07529D",
      secondary: "#f3a712",
      error: "#FF3333",
      white: "#fff",
    },
    borderColor: {
      primary: "#0970D7",
      light: " #50A3F7",
      middark: "#101011",
      dark: "#111111",
      deep: "#000000",
      ordinary: "#40C1AD",
      header: "#07529D",
      secondary: "#f3a712",
      error: "#FF3333",
      white: "#fff",
    },
    outlineColor: {
      primary: "#0970D7",
      light: " #50A3F7",
      middark: "#101011",
      dark: "#111111",
      deep: "#000000",
      ordinary: "#40C1AD",
      header: "#07529D",
      secondary: "#f3a712",
      error: "#FF3333",
      white: "#fff",
    },
    colors: {
      primary: "#0970D7",
      light: " #50A3F7",
      middark: "#101011",
      dark: "#111111",
      deep: "#000000",
      ordinary: "#40C1AD",
      header: "#07529D",
      secondary: "#f3a712",
      error: "#FF3333",
      white: "#fff",
    },
  },
  plugins: [],
};
export default config;

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [],
  theme: {
    screens: {
      "sm": {"max": "767px"},
      "md": {"min": "768px", "max": "1023px"},
      "lg": {"min": "1024px", "max": "1279px"},
      "xl": {"min": "1280px", "max": "1535px"},
      "2xl": {"min": "1536px"}
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      dark: "#212121",
      darkSecondary: "#2D2D2D",
      darkGrey: "#343434",
      grey: "#6E6E6E",
      lightGrey: "#aaaaaa",
      blue: "#0296CE",
      green: "#60BC4D",
      yellow: "#E2C14B",
      red: "#D75040"
    },
    safelist: [
      "bg-white", "bg-black", "bg-dark", "bg-darkSecondary", "bg-darkGrey", "bg-red"
    ],
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Prata", "sans"]
    },
    extend: {
      minWidth: {
        "screen-1/5": "20vw"
      },
      height: {
        "screenExHeader": `calc(100vh - ${defaultTheme.spacing["20"]})`,
        "76": "19rem"
      },
      minHeight: {
        "desktopMinHeight": "580px",
        "desktopMinHeightExHeader": `calc(580px - ${defaultTheme.spacing["20"]})`
      },
      scale: {
        "99": "0.99"
      },
      transitionDuration: {
        "DEFAULT": "200ms"
      },
      transitionProperty: {
        "width": "width",
        "translateWithWidth": "width translate"
      },
      animation: {
        "spin": "spin 1s linear infinite"
      }
    }
  }
}

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "schabo-c": ["Schabo Condensed", "sans-serif"],
        "montserrat-b": ["Montserrat Bold", "sans-serif"],
        "montserrat-md": ["Montserrat Medium", "sans-serif"],
        "montserrat-sb": ["Montserrat SemiBold", "sans-serif"],
        "montserrat-r": ["Montserrat Regular", "sans-serif"],
        "inter-b": ["Inter Bold", "sans-serif"],
        "inter-r": ["Inter Regular", "sans-serif"],
        "inter-sb": ["Inter SemiBold", "sans-serif"],
        "inter-md": ["Inter Medium", "sans-serif"],
      },
      colors: {
        primary: "#14b8a6",
        secondary: "#191B30",
        back: "#2C304D"
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
    },
  },
  plugins: [],
} satisfies Config;

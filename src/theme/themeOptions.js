import { components } from "./components";
import { primary, themeColors } from "./themeColors";
import { typography } from "./typography";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
};

const themesOptions = {
  DEFAULT: {
    typography,
    breakpoints,
    shape: {
      borderRadius: 12
    },
    components: {
      ...components
    },
    palette: {
      mode: "dark",
      primary: {
        ...primary,
        light: primary[100]
      },
      background: {
        default: "#0B0B0F",
        paper: "#0F1B2B"
      },
      ...themeColors
    }
  }
};

const themeOptions = () => themesOptions.DEFAULT;

export default themeOptions;

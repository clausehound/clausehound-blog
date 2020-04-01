import { FC, createElement as h } from "react";
import { Link } from "gatsby";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { amber, lightBlue, grey } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { rhythm, scale } from "../utils/typography";

import Header from "./header";

declare var __PATH_PREFIX__: string;

const paletteLight = {
  primary: {
    light: amber[500],
    main: amber[700],
    dark: amber[900],
    contrastText: "#ffffff",
  },
  secondary: {
    light: lightBlue[500],
    main: lightBlue[700],
    dark: lightBlue[900],
    contrastText: "#ffffff",
  },
} as const;

const paletteDark = {
  type: "dark",
  background: {
    default: grey[900],
    paper: grey[700],
  },
  text: {
    primary: grey[100],
  },
  primary: {
    light: amber[500],
    main: amber[700],
    dark: amber[900],
    contrastText: "#dddddd",
  },
  secondary: {
    light: lightBlue[100],
    main: lightBlue[300],
    dark: lightBlue[500],
    contrastText: "#dddddd",
  },
} as const;

const typography = {
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  h1: {
    fontSize: "2.2rem",
    fontWeight: 700,
  },
  h5: {
    fontWeight: 700,
  },
} as const;

const themeLight = createMuiTheme({
  palette: paletteLight,
  typography,
});

const themeDark = createMuiTheme({
  palette: paletteDark,
  typography,
});

const colorVarsLight = {
  "--primary": paletteLight.primary.main,
  "--primary-light": paletteLight.primary.light,
  "--primary-dark": paletteLight.primary.dark,
  "--secondary": paletteLight.secondary.main,
  "--secondary-light": paletteLight.secondary.light,
  "--secondary-dark": paletteLight.secondary.dark,
} as const;

const colorVarsDark = {
  "--primary": paletteDark.primary.main,
  "--primary-light": paletteDark.primary.light,
  "--primary-dark": paletteDark.primary.dark,
  "--secondary": paletteDark.secondary.main,
  "--secondary-light": paletteDark.secondary.light,
  "--secondary-dark": paletteDark.secondary.dark,
  "--text": paletteDark.text.primary,
} as const;

// All the keys for these, so we can make sure we use the right vars
export type ColorVars = keyof typeof colorVarsLight;
const linkStyle = {
  "& a": {
    color: "var(--secondary)",
    "&:visited": {
      color: "var(--secondary-light)",
    },
    "&:hover": {
      color: "var(--secondary-dark)",
    },
  },
} as const;

// Set this same theme as style vars
const useStylesLight = makeStyles(theme => ({
  root: {
    ...colorVarsLight,
    ...linkStyle,
  },
  main: {
    margin: "0 auto",
    padding: "1rem 1rem",
  },
}));

const useStylesDark = makeStyles(theme => ({
  root: {
    ...colorVarsDark,
    ...linkStyle,
    // TODO: find why this isn't being set in the theme
    background: grey[900],
    minHeight: "100vh",
  },
  main: {
    margin: "0 auto",
    padding: "1rem 1rem",
    color: "var(--text)",
  },
}));

interface Props {
  location: Location;
  title: string;
}

const Layout: FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const classes = darkMode ? useStylesDark() : useStylesLight();

  return h(
    "div",
    { className: classes.root },
    h(
      MuiThemeProvider,
      {
        theme: darkMode ? themeDark : themeLight,
      },
      h(Header),
      h(
        "main",
        {
          className: classes.main,
          style: {
            maxWidth: "40rem",
          },
        },
        children,
      ),
      h(
        "footer",
        {
          style: {
            color: "var(--text)",
            textAlign: "right",
            marginRight: "1rem",
          },
        },
        "\xA9 ",
        new Date().getFullYear(),
        ", Built with",
        ` `,
        h(
          "a",
          {
            href: "https://www.gatsbyjs.org",
          },
          "Gatsby",
        ),
      ),
    ),
  );
};

export default Layout;

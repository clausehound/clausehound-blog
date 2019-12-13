import { FC, createElement as h } from "react";
import { Link } from "gatsby";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { amber, lightBlue, grey } from "@material-ui/core/colors";

import { rhythm, scale } from "../utils/typography";

import Header from "./header";

declare var __PATH_PREFIX__: string;

const palette = {
  primary: {
    light: "gold",
    main: "orange",
    dark: "darkorange",
    contrastText: "white",
  },
  secondary: {
    light: "powderblue",
    main: "deepskyblue",
    dark: "dodgerblue",
    contrastText: "white",
  },
} as const;

const theme = createMuiTheme({
  palette,
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
});

const colorVars = {
  "--primary": palette.primary.main,
  "--primary-light": palette.primary.light,
  "--primary-dark": palette.primary.dark,
  "--secondary": palette.secondary.main,
  "--secondary-light": palette.secondary.light,
  "--secondary-dark": palette.secondary.dark,
} as const;

// All the keys for these, so we can make sure we use the right vars
export type ColorVars = keyof typeof colorVars;

// Set this same theme as style vars
const useStyles = makeStyles({
  root: {
    ...colorVars,
    "& a": {
      color: "var(--secondary-dark)",
      "&:visited": {
        color: "var(--secondary-dark)",
      },
      "&:hover": {
        color: "var(--secondary)",
      },
    },
  },
  main: {
    margin: "0 auto",
    padding: "1rem 1rem",
  },
});

interface Props {
  location: Location;
  title: string;
}

const Layout: FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const classes = useStyles();

  return h(
    "div",
    { className: classes.root },
    h(
      MuiThemeProvider,
      {
        theme,
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
        { style: { textAlign: "right", marginRight: "1rem" } },
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

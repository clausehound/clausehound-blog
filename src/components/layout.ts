import { FC, createElement as h } from "react"
import { Link } from "gatsby"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { amber, lightBlue, grey } from "@material-ui/core/colors"

import { rhythm, scale } from "../utils/typography"

declare var __PATH_PREFIX__: string

const theme = createMuiTheme({
  palette: {
    primary: {
      light: amber[500],
      main: amber[700],
      dark: amber[900],
      contrastText: "#ffffff",
    },
    secondary: {
      light: lightBlue[100],
      main: lightBlue[300],
      dark: lightBlue[500],
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    h1: {
      fontSize: '2.2rem',
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    }
  },
})

interface Props {
  location: Location
  title: string
}

const Layout: FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = h(
      "h1",
      {
        style: { ...scale(1.5), marginBottom: rhythm(1.5), marginTop: 0 },
      },
      h(
        Link,
        {
          style: {
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          },
          to: `/`,
        },
        title
      )
    )
  } else {
    header = h(
      "h3",
      {
        style: {
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        },
      },
      h(
        Link,
        {
          style: {
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          },
          to: `/`,
        },
        title
      )
    )
  }

  return h(
    MuiThemeProvider,
    {
      theme,
    },
    h("header", null, header),
    h(
      "main",
      {
        style: {
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        },
      },
      children
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
        "Gatsby"
      )
    )
  )
}

export default Layout

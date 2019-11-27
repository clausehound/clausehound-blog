import PropTypes from "prop-types"
import { createElement as h, useRef, FC, RefObject, useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { orange } from "@material-ui/core/colors"
// @ts-ignore
import OrangeLogo from "../../content/assets/paw-orange.svg"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: "all 0.2s ease-in-out",
    padding: theme.spacing(1),
    flexGrow: 1,
    background: "#ffffff",
  },
  faded: {
    background: "transparent",
    boxShadow: "none",
    padding: theme.spacing(5),
  },
  logo: {
    color: "orange[400]",
    textDecoration: "none",
    flexGrow: 1,
  },
  title: {
    flexGrow: 2,
    display: "flex",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    fontStyle: "normal",
    alignSelf: "center",
    fontSize: "2rem",
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginBottom: -6,
  },
  img: {
    marginBottom: 0,
    height: "1.3rem",
    alignSelf: "center",
  },
  darkTitle: {
    color: "#000",
  },
  orangeTitle: {
    color: orange[400],
  },
}))

const bottomAt = (ref: RefObject<HTMLElement>): number => {
  if (ref.current == null) return 0
  return ref.current.offsetTop + ref.current.offsetHeight
}

interface Props {
  title?: string
}

const Header: FC<Props> = ({ title = "" }) => {
  const classes = useStyles()
  const head = useRef<HTMLElement>()

  return h(
    AppBar,
    {
      color: "primary",
      className: classes.root,
      ref: head,
    },
    h(
      Toolbar,
      null,
      h(
        "a",
        {
          href: "https://www.clausehound.com/documents",
          className: classes.logo,
        },
        h(
          Typography,
          { variant: "h6", className: classes.title },
          h(
            "span",
            {
              className: classes.darkTitle,
            },
            "Clause"
          ),
          h("span", { className: classes.orangeTitle }, "h"),
          h("img", {
            src: OrangeLogo,
            className: classes.img,
          }),
          h("span", { className: classes.orangeTitle }, "und")
        )
      )
    )
  )
}

export default Header

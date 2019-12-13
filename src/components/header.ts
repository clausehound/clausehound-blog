import { Link } from "gatsby";
import PropTypes from "prop-types";
import { createElement as h, useRef, FC, RefObject, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Slide,
  Theme,
  Toolbar,
  makeStyles,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";

import Logo from "./logo";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: "all 0.2s ease-in-out",
    padding: "0 0.5rem",
    flexGrow: 1,
    boxShadow: "none",
    borderBottom: "4px solid black",
    backgroundColor: "var(--primary)",
    minHeight: "6rem",
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: "#ffffff",
    textDecoration: "none",
    flexGrow: 1,
  },
  title: {
    fontWeight: 100,
    flexGrow: 1,
  },
}));

interface Props {}

const Header: FC<Props> = () => {
  const classes = useStyles();
  const head = useRef<HTMLElement>();
  const trigger = useScrollTrigger();

  return h(
    Slide,
    { appear: false, direction: "down", in: !trigger },
    h(
      "header",
      {
        className: classes.root,
        ref: head,
        style: { position: "sticky" },
      },
        h(
          Link,
          {
            to: "/",
            className: classes.logo,
            style: { boxShadow: "none", alignSelf: "flex-end" },
          },
          h(Logo, { style: { height: "1.2rem", width: "auto" } }),
        ),
    ),
  );
};

export default Header;

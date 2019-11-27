import { Link } from "gatsby";
import PropTypes from "prop-types";
import { createElement as h, useRef, FC, RefObject, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  makeStyles,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";

import Logo from "./logo";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: "all 0.2s ease-in-out",
    padding: `0 ${theme.spacing(2)}px`,
    flexGrow: 1,
    boxShadow: "none",
    borderBottom: "4px solid black",
  },
  toolBar: {
    padding: 0,
    minHeight: "5rem",
  },
  logo: {
    color: "#ffffff",
    textDecoration: "none",
    flexGrow: 1,
  },
  faded: {
    background: "transparent",
    boxShadow: "none",
    padding: theme.spacing(5),
  },
  title: {
    fontWeight: 100,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginBottom: -6,
  },
}));

const bottomAt = (ref: RefObject<HTMLElement>): number => {
  if (ref.current == null) return 0;
  return ref.current.offsetTop + ref.current.offsetHeight;
};

interface Props {}

const Header: FC<Props> = () => {
  const classes = useStyles();
  const head = useRef<HTMLElement>();

  return h(
    AppBar,
    {
      color: "primary",
      className: classes.root,
      ref: head,
      position: "sticky",
    },
    h(
      Toolbar,
      { className: classes.toolBar },
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

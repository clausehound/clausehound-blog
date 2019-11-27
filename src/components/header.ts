import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { createElement as h, useRef, FC, RefObject, useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  useScrollTrigger,
  Theme,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';

import Logo from './logo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transition: 'all 0.2s ease-in-out',
    padding: theme.spacing(1),
    flexGrow: 1,
  },
  faded: {
    background: 'transparent',
    boxShadow: 'none',
    padding: theme.spacing(5),
  },
  logo: {
    color: '#ffffff',
    textDecoration: 'none',
    flexGrow: 1,
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

interface Props {
  title?: string;
}

const Header: FC<Props> = ({ title = '' }) => {
  const classes = useStyles();
  const head = useRef<HTMLElement>();

  return h(
    AppBar,
    {
      color: 'primary',
      className: classes.root,
      ref: head,
    },
    h(
      Toolbar,
      null,
      h(
        Link,
        { to: '/', className: classes.logo },
        h(Logo),
      ),
      h(Button, { color: 'inherit' }, 'हिंदी'),
      h(Button, { color: 'inherit' }, 'বাঙালি'),
      h(Button, { color: 'inherit' }, '800.555.1234'),
    ),
  );
};

export default Header;

import { FC, createElement as h } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import Image from "gatsby-image";

interface Props {
  id: string;
  first?: string;
  last?: string;
  image: any;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    boxShadow: "none",
    color: "inherit",
  },
  avatar: {
    marginRight: "0.5rem",
    minWidth: 50,
    borderRadius: "100%",
  },
  firstName: {
    alignSelf: "flex-start",
    textTransform: "uppercase",
  },
  lastName: {
    display: "block",
    lineHeight: 0.7,
    color: theme.palette.primary.main,
  },
}));

// TODO: Use a proper image type
const Author: FC<Props> = ({ first, id, image, last }) => {
  const classes = useStyles();

  if (first == null) {
    return h("div", null, `by ${id}`);
  }

  return h(
    Link,
    {
      className: classes.root,
      to: id,
    },
    image &&
      h(Image, {
        fluid: image.childImageSharp.fluid,
        alt: `picture of ${first}`,
        className: classes.avatar,
        imgStyle: {
          borderRadius: "50%",
        },
      }),

    h(
      Typography,
      {
        variant: "h5",
        className: classes.firstName,
      },
      h("span", null, `${first} `),
      h(
        "span",
        {
          className: classes.lastName,
        },
        last,
      ),
    ),
  );
};

export default Author;

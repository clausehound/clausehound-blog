import { FC, createElement as h } from "react";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "gatsby";
import Image from "gatsby-image";

interface Props {
  id: string;
  first?: string;
  last?: string;
  image: any;
}

// TODO: Use a proper image type
const Author: FC<Props> = ({ first, id, image, last }) => {
  const theme = useTheme();

  if (first == null) {
    return h("div", null, `by ${id}`);
  }

  return h(
    Link,
    {
      style: {
        display: "flex",
        boxShadow: "none",
        color: "inherit",
      },
      to: id,
    },
    image &&
      h(Image, {
        fluid: image.childImageSharp.fluid,
        alt: `picture of ${first}`,
        style: {
          marginRight: "0.5rem",
          minWidth: 50,
          borderRadius: "100%",
        },
        imgStyle: {
          borderRadius: "50%",
        },
      }),

    h(
      Typography,
      {
        variant: "h5",
        style: {
          alignSelf: "flex-start",
        },
      },
      h("span", null, `${first.toUpperCase()} `),
      h(
        "span",
        {
          style: {
            display: "block",
            lineHeight: 0.7,
            color: theme.palette.primary.main,
          },
        },
        last && last.toUpperCase(),
      ),
    ),
  );
};

export default Author;

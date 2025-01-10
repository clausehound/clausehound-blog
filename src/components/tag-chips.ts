import { FC, createElement as h } from "react";
import { Chip, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, navigate } from "gatsby";
import Image, { GatsbyImageProps } from "gatsby-image";

interface Props {
  tags: ReadonlyArray<string>;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

// TODO: this should be built in somewhere
const formatTagLink = (tag: string): string =>
  tag.replace(/ /g, "-").replace(/#/g, "");

const TagChips: FC<Props> = ({ tags }) => {
  const classes = useStyles();

  if (!tags) return null;
  return h(
    "div",
    {
      className: `${classes.root} post-tags`,
    },
    tags.map(tag =>
      h(Chip, {
        onClick: () => navigate(`/tags/${formatTagLink(tag)}`),
        label: tag,
        variant: "outlined",
        clickable: true,
        color: "secondary",
      }),
    ),
  );
};

export default TagChips;

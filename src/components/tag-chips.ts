import { FC, createElement as h } from "react";
import { Chip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import Image, { GatsbyImageProps } from "gatsby-image";

interface Props {
  tags: Reaodnly<string>;
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
const formatTagLink = tag => tag.replace(/ /g, "-").replace(/#/g, "");

const TagChips: FC<Props> = ({ tags }) => {
  const classes = useStyles();

  if (!tags) return null;
  return h(
    "div",
    {
      className: classes.root,
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

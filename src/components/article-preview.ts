import { FC, createElement as h } from "react";
import { Link } from "gatsby";
import { Typography } from "@material-ui/core";
import { rhythm } from "../utils/typography";

interface Props {
  date?: string;
  description?: string;
  slug: string;
  title: string;
}

const ArticlePreview: FC<Props> = ({ date, description, slug, title }) =>
  h(
    "article",
    {
      style: {
        marginBottom: rhythm(1),
      },
    },
    h(
      "header",
      null,
      h(
        Typography,
        {
          variant: "h5",
        },
        h(
          Link,
          {
            style: {
              boxShadow: `none`,
              textDecoration: "none",
            },
            to: slug,
          },
          title,
        ),
      ),
      date && h(
        "small",
        {
          style: {
            marginBottom: rhythm(1 / 4),
          },
        },
        date,
      ),
    ),
    description && h(
      "section",
      null,
      h(Typography, {
        dangerouslySetInnerHTML: {
          __html: description,
        },
      }),
    ),
  );

export default ArticlePreview;

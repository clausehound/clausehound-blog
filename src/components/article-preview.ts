import { FC, createElement as h, Fragment } from "react";
import { Chip } from "@material-ui/core";
import { Link, navigate } from "gatsby";
import { rhythm } from "../utils/typography";
import { authors } from "../utils/filters";

interface Props {
  date?: string;
  description?: string;
  slug: string;
  tags?: ReadonlyArray<string>;
  title: string;
  children?: never;
}

const notAuthor = (tag: string): boolean => !authors.has(tag);

const ArticlePreview: FC<Props> = ({ date, description, slug, tags, title }) =>
  h(
    "article",
    {
      style: {
        marginBottom: "2.5rem",
      },
    },
    h(
      "header",
      { style: { marginBottom: "0.25rem" } },
      h(
        "h2",
        { style: { marginBottom: 0 } },
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
      date &&
        h(
          "small",
          {
            style: {
              marginBottom: "0.5rem",
            },
          },
          date,
        ),
    ),
    description &&
      h(
        "section",
        null,
        h("main", {
          dangerouslySetInnerHTML: {
            __html: description,
          },
        }),
      ),
    tags &&
      tags.filter(notAuthor).map(tag =>
        h(Chip, {
          clickable: true,
          color: "secondary",
          key: tag,
          label: tag,
          onClick: () => navigate(`/tags/${tag.replace(/ /g, "-")}`),
          size: "small",
          style: { marginRight: "0.5rem" },
          variant: "outlined",
        }),
      ),
  );

export default ArticlePreview;

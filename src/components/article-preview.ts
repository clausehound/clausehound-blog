import { FC, createElement as h } from "react";
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";

interface Props {
  date?: string;
  description?: string;
  slug: string;
  title: string;
  children?: never;
}

const ArticlePreview: FC<Props> = ({ date, description, slug, title }) =>
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
      date && h(
        "small",
        {
          style: {
            marginBottom: "0.5rem",
          },
        },
        date,
      ),
    ),
    description && h(
      "section",
      null,
      h("main", {
        dangerouslySetInnerHTML: {
          __html: description,
        },
      }),
    ),
  );

export default ArticlePreview;

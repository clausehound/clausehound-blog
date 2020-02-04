import { FC, Fragment, createElement as h, useState } from "react";
import { graphql } from "gatsby";
import { useTheme } from "@material-ui/core";
import slugify from "slugify";
import Layout from "../components/layout";
import SEO from "../components/seo";

interface Props {
  data: any;
  location: Location;
}

const BlogTemplatePage: FC<Props> = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const [articleTitle, setArticleTitle] = useState<string>("Article Title");

  const onChange = ({ target: { value } }) => setArticleTitle(value);

  return h(
    Layout,
    { location, title },
    h(SEO, { title: "BlogTemplate Page" }),
    h(
      "label",
      null,
      "Article Title: ",
      h("input", { type: "text", value: articleTitle, onChange }),
    ),
    h("p", null, `${slugify(articleTitle, { lower: true })}/index.md`),
    h("textarea", {
      style: { width: "100%", minHeight: "40rem" },
      readOnly: true,
      value: `---
title: "${articleTitle}"
author: @clausehound.com
tags: []
date: ${new Date().toString()}
description: "Summary describing article"
---

# Header

## Subheader

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

* Duis aute irure dolor in reprehenderit in voluptate
* velit esse cillum dolore eu fugiat nulla pariatur.
* Excepteur sint occaecat cupidatat non proident
* sunt in culpa qui officia deserunt mollit anim id est laborum.
        `,
    }),
  );
};

export default BlogTemplatePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

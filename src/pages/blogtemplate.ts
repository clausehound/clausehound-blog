import {
  FC,
  Fragment,
  createElement as h,
  useMemo,
  useState,
  ChangeEvent,
} from "react";
import { graphql } from "gatsby";
import {
  makeStyles,
} from "@material-ui/core/styles";
import slugify from "slugify";
import Layout from "../components/layout";
import SEO from "../components/seo";

const useStyles = makeStyles({
  root: {
    "& label": { paddingTop: "0.2rem" },
  }
});

interface Data {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    tags: ReadonlyArray<{
      tag: string;
      totalCount: number;
    }>;
  };
}

interface Props {
  data: Data;
  location: Location;
}

const BlogTemplatePage: FC<Props> = ({ data, location }) => {
  const classes = useStyles();
  const { title } = data.site.siteMetadata;
  const { tags } = data.allMarkdownRemark;
  const [articleTitle, setArticleTitle] = useState<string>("Article Title");
  const [author, setAuthor] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>([]);

  const onChangeTitle = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setArticleTitle(value);

  const onChangeAuthor = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setAuthor(value);

  const onChangeTags = ({
    target: { options },
    target,
  }: ChangeEvent<HTMLSelectElement>) =>
    setSelectedTags(
      Array.from(options)
        .filter(({ selected }) => selected)
        .map(({ value }) => value),
    );

  return h(
    Layout,
    { location, title },
    h(SEO, { title: "BlogTemplate Page" }),
    h(
      "label",
      null,
      "Article Title: ",
      h("input", {
        type: "text",
        value: articleTitle,
        onChange: onChangeTitle,
      }),
    ),
    h("br"),
    h(
      "label",
      null,
      "Author: ",
      h("input", {
        type: "email",
        value: author,
        onChange: onChangeAuthor,
        placeholder: "example@clausehound.com",
      }),
    ),
    h("br"),
    h(
      "label",
      null,
      "Tags: ",
      h(
        "select",
        {
          value: selectedTags,
          multiple: true,
          onChange: onChangeTags,
          size: 10,
        },
        tags.map(({ tag, totalCount }) =>
          h("option", { key: tag, value: tag }, `${tag} (${totalCount})`),
        ),
      ),
    ),
    h("hr"),
    h(
      "section",
      null,
      h("h2", null, "Content"),
      h(
        "p",
        null,
        `${slugify(articleTitle, {
          lower: true,
        })}/index.md`,
      ),
      h("textarea", {
        style: { width: "100%", minHeight: "40rem" },
        readOnly: true,
        value: `---
title: "${articleTitle}"
author: ${author}
tags: ${JSON.stringify(selectedTags)}
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
    ),
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
    allMarkdownRemark(limit: 2000) {
      tags: group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;

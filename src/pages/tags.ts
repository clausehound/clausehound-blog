import { FC, createElement as h, useMemo, useState } from "react";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";
import { rhythm, scale } from "../utils/typography";
import { authors } from "../utils/filters";

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

interface Tag {
  totalCount: number;
  tag: string;
}

const byTotalCount = (rev?: boolean) => (a: Tag, b: Tag) =>
  (rev ? -1 : 1) * (a.totalCount - b.totalCount) || byTag(rev)(a, b);

const byTag = (rev?: boolean) => (a: Tag, b: Tag) =>
  (rev ? -1 : 1) * a.tag.localeCompare(b.tag);

// TODO: this should be built in somewhere
const formatTagLink = (tag: string): string => tag.replace(/ /g, "-").replace(/#/g, "");

const notAuthor = ({ tag }: Tag): boolean => !authors.has(tag);

const TagsTemplate: FC<Props> = ({
  data: {
    site: {
      siteMetadata: { title },
    },
    allMarkdownRemark: { tags },
  },
  location,
}) => {
  const [rev, setRev] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"total" | "tag">("tag");
  const sortedTags = useMemo(() => {
    switch (sortBy) {
      case "total":
        return tags
          .filter(notAuthor)
          .sort(byTotalCount(rev));
      case "tag":
      default: {
        return tags.filter(notAuthor).sort(byTag(rev));
      }
    }
  }, [tags, rev, sortBy]);

  const directionIcon = useMemo(() => {
    if ((rev && sortBy == "tag") || (!rev && sortBy == "total"))
      return h(ArrowDropUp);
    return h(ArrowDropDown);
  }, [rev, sortBy]);

  return h(
    Layout,
    {
      location,
      title,
    },
    h(SEO, {
      title: `Clausehound - all tags`,
    }),
    h(
      ButtonGroup,
      {
        variant: "outlined",
      },
      h(
        Button,
        {
          color: "secondary",
          onClick: () => {
            setRev(sortBy != "tag" ? false : !rev), setSortBy("tag");
          },
        },
        "tag",
        sortBy == "tag" && directionIcon,
      ),
      h(
        Button,
        {
          color: "secondary",
          onClick: () => {
            setRev(sortBy != "total" ? false : !rev), setSortBy("total");
          },
        },
        "total",
        sortBy == "total" && directionIcon,
      ),
    ),
    h(
      "ul",
      null,
      sortedTags.map(({ tag, totalCount }: Tag) =>
        h(
          "li",
          { key: tag },
          h(
            Link,
            { to: `/tags/${formatTagLink(tag)}` },
            `${tag} (${totalCount})`,
          ),
        ),
      ),
    ),
  );
};

export default TagsTemplate;

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

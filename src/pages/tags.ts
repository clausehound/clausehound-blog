import { FC, createElement as h, useMemo, useState } from "react";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";
import { rhythm, scale } from "../utils/typography";

interface Data {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    tags: {
      tag: string;
      totalCount: number;
    };
  };
}

interface Props {
  data: Data;
  location: Location;
}

const byTotalCount = (rev: boolean) => (
  { totalCount: a, tag: aTag },
  { totalCount: b, tag: bTag },
) => {
  let res = 0;
  if (a < b) {
    res = 1;
  } else if (a > b) {
    res = -1;
  } else {
    res = byTag(aTag, bTag);
  }

  return (rev ? -1 : 1) * res;
};

const byTag = (rev: boolean) => ({ tag: a }, { tag: b }) => {
  return (rev ? -1 : 1) * a.localeCompare(b);
};

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
        return tags.sort(byTotalCount(rev));
      case "tag":
      default: {
        return tags.sort(byTag(rev));
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
      title: `Clausehound articles by tag`,
    }),
    h(
      ButtonGroup,
      {
        variant: 'outlined',
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
      sortedTags.map(
        ({ tag, totalCount }: { tag: string; totalCount: number }) =>
          h(
            "li",
            { key: tag },
            h(Link, { to: `/tags/${tag}` }, `${tag} (${totalCount})`),
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

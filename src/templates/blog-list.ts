import { FC, createElement as h } from "react";
import { Typography } from "@material-ui/core";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";

interface Props {
  location: Location;
  data: any;
  pageContext: any;
}

const BlogList: FC<Props> = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const { previousPath, nextPath } = pageContext;

  return h(
    Layout,
    {
      location,
      title: siteTitle,
    },
    h(SEO, {
      title: "All posts",
    }),
    posts.map(({ node }: { node: any }) => {
      const {
        fields: { slug },
        frontmatter: { date, description, title },
      } = node;
      return h(ArticlePreview, {
        key: slug,
        slug,
        title: title || slug,
        date,
        description,
      });
    }),
    h(
      "nav",
      null,
      h(
        "ul",
        {
          style: {
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          },
        },
        h(
          "li",
          null,
          previousPath &&
            h(
              Link,
              {
                to: previousPath,
                rel: "prev",
              },
              "⇦ newer",
            ),
        ),
        h(
          "li",
          null,
          nextPath &&
            h(
              Link,
              {
                to: nextPath,
                rel: "next",
              },
              "older ⇨",
            ),
        ),
      ),
    ),
  );
};

export default BlogList;

export const pageQuery = graphql`
  query($skip: Int, $limit: Int, $subdir: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { subdir: { eq: $subdir } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            author {
              id
              first
              last
            }
            tags
          }
        }
      }
    }
  }
`;

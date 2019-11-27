import { FC, createElement as h } from "react";
import { Typography } from "@material-ui/core";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

interface Props {
  location: Location;
  data: any;
}

const BlogIndex: FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
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
      const title = node.frontmatter.title || node.fields.slug;
      return h(
        "article",
        {
          key: node.fields.slug,
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
                to: node.fields.slug,
              },
              title,
            ),
          ),
          h(
            "small",
            {
              style: {
                marginBottom: rhythm(1 / 4),
              },
            },
            node.frontmatter.date,
          ),
        ),
        h(
          "section",
          null,
          h(Typography, {
            dangerouslySetInnerHTML: {
              __html: node.frontmatter.description || node.excerpt,
            },
          }),
        ),
      );
    }),
  );
};

export default BlogIndex;
export const pageQuery = graphql`
  query($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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

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

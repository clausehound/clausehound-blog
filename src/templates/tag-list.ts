import { FC, createElement as h } from "react";
import { Typography } from "@material-ui/core";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";
import { rhythm, scale } from "../utils/typography";

interface Props {
  data: any;
  location: Location;
  pageContext: any;
}

const TagListTemplate: FC<Props> = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const author = data.authorJson;
  const posts = data.allMarkdownRemark.edges;

  return h(
    Layout,
    {
      location,
      title: siteTitle,
    },
    h(SEO, {
      title: `Clausehound articles about ${pageContext.tag}`,
    }),
    posts.map(
      ({
        node,
      }: {
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
            date: string;
            description: string;
          };
        };
      }) => {
        const {
          fields: { slug },
          frontmatter: { date, description, title },
        } = node;
        return h(ArticlePreview, { key: slug, slug, title, description, date });
      },
    ),
  );
};

export default TagListTemplate;

export const pageQuery = graphql`
  query TagListBySlug($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`;

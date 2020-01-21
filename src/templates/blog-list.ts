import { FC, createElement as h } from "react";
import { makeStyles } from "@material-ui/core";
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

const useStyles = makeStyles(theme => ({
  prevNext: {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    listStyle: `none`,
    padding: 0,
  },
}));

const BlogList: FC<Props> = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const { previousPath, nextPath } = pageContext;
  const classes = useStyles();

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
        frontmatter: { date, description, tags, title },
      } = node;
      return h(ArticlePreview, {
        key: slug,
        slug,
        tags,
        title: title || slug,
        date,
        description,
      }, 'hi');
    }),
    h(
      "nav",
      null,
      h(
        "ul",
        { className: classes.prevNext },
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

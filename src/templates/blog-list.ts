import { FC, createElement as h } from "react";
import { makeStyles } from "@material-ui/core";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";
import { Helmet } from "react-helmet";

interface Props {
  location: Location;
  data: any;
  pageContext: any;
}

const useStyles = makeStyles({
  prevNext: {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    listStyle: `none`,
    padding: 0,
  },
  intro: {
    marginBottom: "3rem",
    paddingLeft: "1.5rem",
    borderLeft: "4px solid var(--primary)",
    "& p": {
      marginBottom: "0.2rem",
    },
  },
});

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
    h(
      Helmet,
      null,
      h("script", {
        id: "hs-script-loader",
        src: `//js.hs-scripts.com/${process.env.HUBSPOT_ACCOUNT_NUMBER}.js`,
      }),
    ),
    h(
      "section",
      { className: classes.intro },
      h("p", null, "Our blog explores ideas around the law and technology."),
      h(
        "p",
        null,
        h("a", { target: "_blank", href: "//clausehound.com" }, "Clausehound"),
        "'s a legal tech company, helping companies and firms automate their agreement negotiations.",
      ),
    ),
    posts.map(({ node }: { node: any }) => {
      const {
        fields: { slug },
        frontmatter: { date, description, tags, title },
      } = node;
      return h(
        ArticlePreview,
        {
          key: slug,
          slug,
          tags,
          title: title || slug,
          date,
          description,
        },
        "hi",
      );
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

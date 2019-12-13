import { FC, createElement as h } from "react";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Author from "../components/author";
import ArticlePreview from "../components/article-preview";
import { rhythm, scale } from "../utils/typography";

interface Props {
  data: any;
  location: Location;
}

const AuthorBioTemplate: FC<Props> = ({ data, location }) => {
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
      title: `${author.first} ${author.last} Bio, Clausehound`,
      description: author.bio,
    }),
    h(Author, author),
    h("p", null, author.bio),
    posts.length === 0
      ? null
      : h("p", null, `${author.first} has authored ${posts.length} articles.`),
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

export default AuthorBioTemplate;

// TODO: See if we can load the highlight colour from the material theme
export const pageQuery = graphql`
  query AuthorBioBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    authorJson(id: { eq: $slug }) {
      id
      first
      last
      bio
      image {
        childImageSharp {
          fluid(maxWidth: 640, maxHeight: 640) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { id: { eq: $slug } } } }
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

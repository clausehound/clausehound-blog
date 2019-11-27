import { FC, createElement as h } from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
// TODO: Load these from the theme, not directly
import Image from "gatsby-image"

interface Props {
  data: any
  location: Location
  pageContext: any
}

// TODO: Use a proper image type
const Author: FC<{ id: string; first?: string; last?: string; image: any }> = ({
  first,
  id,
  image,
  last,
}) => {
  const theme = useTheme()

  if (first == null) {
    return h("div", null, `by ${id}`)
  }

  return h(
    "div",
    {
      style: {
        display: "flex",
      },
    },
    image &&
      h(Image, {
        fluid: image.childImageSharp.fluid,
        alt: `picture of ${first}`,
        style: {
          marginRight: "0.5rem",
          minWidth: 50,
          borderRadius: "100%",
        },
        imgStyle: {
          borderRadius: "50%",
        },
      }),

    h(
      Typography,
      {
        variant: "h5",
        style: {
          alignSelf: "flex-start",
        },
      },
      h("span", null, first.toUpperCase()),
      h(
        "span",
        {
          style: {
            display: "block",
            lineHeight: 0.7,
            color: theme.palette.primary.main,
          },
        },
        last && last.toUpperCase(),
      )
    )
  )
}

const BlogPostTemplate: FC<Props> = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const { author } = post.frontmatter

  return h(
    Layout,
    {
      location,
      title: siteTitle,
    },
    h(SEO, {
      title: post.frontmatter.title,
      description: post.frontmatter.description || post.excerpt,
    }),
    h(
      "article",
      null,
      h(
        "header",
        null,
        h(Author, author),
        h(
          Typography,
          {
            style: { marginTop: "1rem" },
            variant: "h1",
          },
          post.frontmatter.title
        ),
        h(
          "p",
          {
            style: {
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            },
          },
          post.frontmatter.date
        )
      ),
      h(Typography, {
        variant: "body1",
        dangerouslySetInnerHTML: {
          __html: post.html,
        },
      }),
      h("hr", {
        style: {
          marginBottom: rhythm(1),
        },
      }),
      h(
        "footer",
        null,
        h(Bio, {
          name: author.first,
          email: author.id,
          bio: author.bio,
        })
      )
    ),
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
          previous &&
            h(
              Link,
              {
                to: previous.fields.slug,
                rel: "prev",
              },
              "\u2190 ",
              previous.frontmatter.title
            )
        ),
        h(
          "li",
          null,
          next &&
            h(
              Link,
              {
                to: next.fields.slug,
                rel: "next",
              },
              next.frontmatter.title,
              " \u2192"
            )
        )
      )
    ),
    h(
      "footer",
      null,
      h(
        Typography,
        { variant: "body2" },
        "This article is provided for informational purposes only and does not create a lawyer-client relationship with the reader. It is not legal advice and should not be regarded as such. Any reliance on the information is solely at the reader’s own risk. ",
        h(
          "a",
          { href: "https://clausehound.com/documents" },
          "Clausehound.com"
        ),
        " is a legal tool geared towards entrepreneurs, early-stage businesses and small businesses alike to help draft legal documents to make businesses more productive."
      )
    )
  )
}

export default BlogPostTemplate
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author {
          id
          first
          last
          bio
          image {
            childImageSharp {
              fluid(maxWidth: 320, maxHeight: 320) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        tags
      }
    }
  }
`

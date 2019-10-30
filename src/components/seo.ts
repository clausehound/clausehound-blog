/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { FC, createElement as h } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface MetaDescription {
  content: string
  name?: string
  property?: string
}

interface Props {
  description?: string
  lang?: string
  meta?: ReadonlyArray<MetaDescription>
  title: string
}

const SEO: FC<Props> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const defaultMeta: ReadonlyArray<MetaDescription> = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]
  return h(Helmet, {
    htmlAttributes: {
      lang,
    },
    title,
    titleTemplate: `%s | ${site.siteMetadata.title}`,
    meta: defaultMeta.concat(meta),
  })
}

export default SEO

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { FC, createElement as h } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useTheme } from "@material-ui/core/styles";

interface MetaDescription {
  content: string;
  name?: string;
  property?: string;
}

interface Props {
  author?: string;
  description?: string;
  lang?: string;
  meta?: ReadonlyArray<MetaDescription>;
  title: string;
}

const SEO: FC<Props> = ({
  author,
  description = "",
  lang = "en",
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
    `,
  );
  const theme = useTheme();

  const metaDescription = description || site.siteMetadata.description;

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
    // TODO: Images from the articles themselves
    {
      name: `og:image`,
      content: `/icons/icon-144x144.png`,
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
      content: author || site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `theme-color`,
      content: theme.palette.primary.main,
    },
  ];
  return h(
    Helmet,
    {
      htmlAttributes: {
        lang,
      },
      title,
      titleTemplate: `%s | ${site.siteMetadata.title}`,
    },
    defaultMeta.concat(meta).map((tag, i) => h("meta", { key: i, ...tag })),
  );
};

export default SEO;

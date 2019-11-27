import { FC, createElement as h } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

interface Props {
  data: any;
  location: Location;
}

const NotFoundPage: FC<Props> = ({ data, location }) => {
  const { title } = data.site.siteMetadata;

  return h(
    Layout,
    { location, title },
    h(
      SEO,
      { title: "404: Not Found" },
      h("h1", null, "Not Found"),
      h("p", null, "You just hit a route that doesn't exist... the sadness."),
    ),
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { FC, createElement as h } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { rhythm } from "../utils/typography";

interface Props {
  name: string;
  email: string;
  bio?: string;
}

const Bio: FC<Props> = ({ name, email, bio }) =>
  h(
    "p",
    {
      style: {
        marginBottom: rhythm(2.5),
      },
    },
    "Written by ",
    h("strong", null, name),
    ".",
    bio && ` ${bio}`,
  );

export default Bio;

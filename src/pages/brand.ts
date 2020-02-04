import { FC, Fragment, createElement as h, useState } from "react";
import { graphql } from "gatsby";
import { useTheme } from "@material-ui/core";
import Layout from "../components/layout";
import SEO from "../components/seo";

interface Props {
  data: any;
  location: Location;
}

const ColorCircle: FC<{ color: string }> = ({ color }) =>
  h("div", {
    style: {
      display: "inline-block",
      width: 50,
      height: 50,
      marginLeft: "1rem",
      borderRadius: "400%",
      backgroundColor: color,
    },
  });

const PalettePreview: FC<{ name?: string; type?: "primary" | "secondary" }> = ({
  name,
  type = "primary",
}) =>
  h(
    "div",
    null,
    name && h("h2", null, name),
    h(ColorCircle, { color: `var(--${type}-dark)` }),
    h(ColorCircle, { color: `var(--${type})` }),
    h(ColorCircle, { color: `var(--${type}-light)` }),
  );

const Content = () => {
  const theme = useTheme();
  const [para, setPara] = useState<HTMLElement | null>(null);
  const [head, setHead] = useState<HTMLElement | null>(null);

  return h(
    Fragment,
    null,
    h("h1", null, "Brand Package"),
    h("h1", null, "Heading 1"),
    h("h2", null, "Heading 2"),
    h("h3", null, "Heading 3"),
    h("h4", null, "Heading 4"),
    h("h5", null, "Heading 5"),
    h(
      "h4",
      { ref: setHead },
      "Header fonts: ",
      head && getComputedStyle(head).getPropertyValue("font-family"),
    ),

    h(
      "p",
      { ref: setPara },
      "Body fonts: ",
      para && getComputedStyle(para).getPropertyValue("font-family"),
    ),
    h(
      "p",
      null,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ),
    h(
      "p",
      null,
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ),
    h(PalettePreview, { name: "Smooth Amber" }),
    h(PalettePreview, { name: "Neela Blue", type: "secondary" }),
  );
};

const BrandPage: FC<Props> = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  return h(
    Layout,
    { location, title },
    h(SEO, { title: "Brand Package" }),
    h(Content),
  );
};

export default BrandPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

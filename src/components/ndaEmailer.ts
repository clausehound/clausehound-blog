import { createElement as h, useRef, FC, RefObject, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  TextField,
  makeStyles,
  Theme,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import Image from "gatsby-image";

const useStyles = makeStyles((theme: Theme) => ({
  lawyerImage: {
    width: 151,
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  email: {
    width: "100%",
  },
}));

interface Props {}

const NdaEmailer: FC<Props> = ({}) => {
  //   const data = useStaticQuery(
  //     graphql`
  //       query {
  //         site {
  //           siteMetadata {
  //             title
  //           }
  //         }
  //         authorJson(id: { eq:  }) {
  //           id
  //           first
  //           last
  //           bio
  //           image {
  //             childImageSharp {
  //               fluid(maxWidth: 640, maxHeight: 640) {
  //                 ...GatsbyImageSharpFluid
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //   );
  //   console.log("data", data);

  const classes = useStyles();
  const head = useRef<HTMLElement>();
  const trigger = useScrollTrigger();

  const [value, setValue] = useState("Learn");

  const onChange = e => {
    setValue(e.target.value);
  };

  //   const avatar = h(Image, {
  //     fluid: fluid,
  //     alt: `picture of the lawyer`,
  //   });

  return h(
    "Card",
    null,
    h(
      CardContent,
      null,
      h(
        Typography,
        null,
        "Hi I am ..... I am a Lawyer at Clausehound. If you are looking for some help about NDA's please choose one of the options, and send an email. ",
      ),
    ),
    // h(CardMedia, {
    //   className: classes.lawyerImage,
    //   image: avatar,
    //   title: "Lawyer's image",
    // }),
    h(
      "div",
      { className: classes.content },
      h(
        RadioGroup,
        {
          value: value,
          name: "radioGroup",
          onChange,
        },
        h(FormControlLabel, {
          value: "Draft NDA",
          control: h(Radio, { color: "primary" }),
          label: "Draft NDA",
        }),
        h(FormControlLabel, {
          value: "Review NDA",
          control: h(Radio, { color: "primary" }),
          label: "Review NDA",
        }),
        h(FormControlLabel, {
          value: "Learn",
          control: h(Radio, { color: "primary" }),
          label: "Learn",
        }),
      ),
      h(TextField, {
        className: classes.email,
        label: "Please enter your email",
      }),
      h(Button, {}, "Send"),
    ),
  );
};

export default NdaEmailer;

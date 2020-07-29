import { FC, createElement as h, useState, MouseEvent } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: 0,
  },
  textField: {
    marginRight: theme.spacing(1),
  },
  flexGrow: {
    flexGrow: 2,
  },
  submitButton: {
    marginTop: theme.spacing(1.5),
  },
  flex: {
    display: "flex",
  },
  signedUp: {
    color: theme.palette.secondary.main,
  },
}));

interface Props {
  location: Location;
}

const HubspotForm: FC<Props> = ({ location }) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_ACCOUNT_NUMBER}/${process.env.HUBSPOT_API_KEY}`;
    const data = {
      fields: [
        {
          name: "email",
          value: email,
        },
        {
          name: "firstname",
          value: name,
        },
      ],
      context: {
        pageUri: location.href,
        pageName: "Clausehound Blog",
      },
    };

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setSubmitted("Signed up successfuly!");
        setOpen(true);
      } else if (
        xhr.readyState === 4 &&
        (xhr.status === 404 || xhr.status === 403)
      ) {
        setSubmitted("Submission failed");
        setOpen(true);
      } else if (xhr.readyState === 4 && xhr.status === 400) {
        setSubmitted("Invalid email address");
        setOpen(true);
      }
    };
    xhr.send(JSON.stringify(data));
  };

  return h(
    "div",
    null,
    h(Snackbar, {
      open,
      autoHideDuration: 6000,
      message: submitted,
      action: h(
        IconButton,
        {
          size: "small",
          color: "inherit",
          onClick: () => setOpen(false),
        },
        h(Close, { fontSize: "small" }),
      ),
    }),
    h("h4", { className: classes.title }, "Sign up for Deal Tips"),
    h(
      "form",
      { onSubmit: handleSubmit },
      h(
        "div",
        { className: classes.flex },
        h(TextField, {
          className: classes.textField,
          label: "First Name",
          value: name,
          type: "text",
          required: true,
          onChange: ({ target: { value } }) => setName(value),
        }),
        h(TextField, {
          className: `${classes.textField} ${classes.flexGrow}`,
          label: "Email",
          value: email,
          type: "email",
          required: true,
          onChange: ({ target: { value } }) => setEmail(value),
        }),
        h(
          Button,
          {
            variant: "outlined",
            type: "submit",
            className: classes.submitButton,
          },
          "Submit",
        ),
      ),
    ),
  );
};

export default HubspotForm;

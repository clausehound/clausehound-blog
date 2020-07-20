import { FC, createElement as h, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";

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
    marginTop: theme.spacing(1.5),
  },
}));

interface Props {}

const HubspotForm: FC<Props> = ({}) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    var xhr = new XMLHttpRequest();
    var url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_ACCOUNT_NUMBER}/${process.env.HUBSPOT_API_KEY}`;
    var data = {
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
        pageUri: "https://blog.clausehound.com/",
        pageName: "Clausehound Blog",
      },
    };

    var final_data = JSON.stringify(data);

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setSubmitted(true);
      }
    };
    xhr.send(final_data);
  };

  return h(
    "div",
    null,
    h("h4", { className: classes.title }, "Sign up for Deal Tips"),
    h(
      "div",
      { className: classes.flex },
      h(TextField, {
        className: classes.textField,
        label: "First Name",
        value: name,
        onChange: ({ target: { value } }) => setName(value),
      }),
      h(TextField, {
        className: `${classes.textField} ${classes.flexGrow}`,
        label: "Email",
        value: email,
        onChange: ({ target: { value } }) => setEmail(value),
      }),
      h(
        Button,
        {
          variant: "outlined",
          className: classes.submitButton,
          onClick: handleSubmit,
        },
        "Submit",
      ),
    ),
    submitted && h("h4", { className: classes.signedUp }, "Signed up!"),
  );
};

export default HubspotForm;

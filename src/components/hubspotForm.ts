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
}));

interface Props {}

const HubspotForm: FC<Props> = ({}) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

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
    h(
      "form",
      { onClick: handleSubmit },
      null,
      h("h4", { className: classes.title }, "Sign up for Deal Tips"),
      h(
        "div",
        { className: classes.flex },
        h(TextField, {
          className: classes.textField,
          label: "First Name",
          id: "standard-basic",
          type: "text",
          value: name,
          onChange: e => setName(e.target.value),
        }),
        h(TextField, {
          className: `${classes.textField} ${classes.flexGrow}`,
          label: "Email",
          id: "standard-basic",
          type: "email",
          value: email,
          onChange: e => setEmail(e.target.value),
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
      submitted && h("h4", null, "Signed up"),
    ),
  );
};

export default HubspotForm;

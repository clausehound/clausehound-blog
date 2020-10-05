import { FC, createElement as h, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
}));

interface Props {
  title: string;
}

declare var window: Window & typeof globalThis & { hbspt: any };

const HubspotForm: FC<Props> = ({ title }) => {
  const classes = useStyles();

  const createForm = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "5646626",
        formId: "5c64138a-f472-4a76-a705-4e1207408323",
        target: "#hubspotForm",
      });
    }
  };

  const trackEvent = (event: any) => {
    if (
      event.data.type === "hsFormCallback" &&
      event.data.eventName === "onFormSubmit"
    ) {
      trackCustomEvent({
        category: "Newsletter Signup",
        action: title,
        label: event.data.data[0].value,
      });
    }
  };

  const addCreateFormEvent = () => {
    window.addEventListener("message", trackEvent);
    createForm();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    script.addEventListener("load", addCreateFormEvent);

    return () => {
      window.removeEventListener("message", trackEvent);
      script.removeEventListener("load", addCreateFormEvent);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return h(
    "div",
    null,
    h(
      "h4",
      { className: classes.title, color: "secondary" },
      "Sign up for Deal Tips",
    ),
    h("div", { id: "hubspotForm" }),
  );
};

export default HubspotForm;

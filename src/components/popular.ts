// TODO: This is a direct copy of the most popular list. This should be loaded from Google Analytics
// instead of written by hand, and give us an option of pulling the latest updates. It'll
// run fastest if it's built into the static bundle, so there it goes.
import { createElement as h } from "react";
import { Link } from "gatsby";
import { Typography } from "@material-ui/core";

const Popular = () =>
  h(
    "section",
    { style: { marginTop: "2rem" } },
    h(
      Typography,
      {
        className: "tree-heading",
        variant: "h5",
      },
      "More Popular Posts",
    ),

    [
      {
        to: '/the-mistake-tenants-need-to-know-about-estoppel-certificates/',
        title: 'The Mistake: Tenants Need to Know About Estoppel Certificates',
      },
      {
        to: '/sign-this-or-lose-your-job-can-my-employer-really-do-this/',
        title: 'Sign This or Lose Your Job! Can My Employer Really Do This?',
      },
      {
        to:
          '/is-it-legal-for-a-company-to-ask-an-employee-to-sign-an-nda-after-the-employee-has-started-working/',
        title:
          'Is it legal for a company to ask an employee to sign an NDA after the employee has started working?',
      },
      {
        to:
          '/what-is-the-maximum-term-of-an-nda-if-it-is-not-mentioned-in-the-contract/',
        title:
          'What is the maximum term of an NDA if it is not mentioned in the contract?',
      },
      {
        to:
          '/what-is-the-difference-between-a-contract-and-a-memorandum-of-understanding/',
        title:
          'What is the Difference Between a Contract and a Memorandum of Understanding?',
      },
      {
        to: '/legal-tips-and-tricks-shotgun-clause/',
        title: 'Legal Tips and Tricks: \u201CShotgun Clause\u201D',
      },
      {
        to:
          '/what-legal-rights-do-i-have-where-an-employer-promised-shares-but-did-not-deliver/',
        title:
          'What legal rights do I have where an employer promised shares but did not deliver?',
      },
      {
        to: '/limited-liability-partnership-what-is-an-llp/',
        title: 'Limited Liability Partnership: What is an LLP?',
      },
      {
        to: '/exclusive-use-clauses-a-classic-real-estate-newbie-mistake/',
        title: 'Exclusive use clauses: A classic real estate newbie mistake',
      },
      {
        to:
          '/consulting-contract-should-include-standard-of-care-that-is-reasonable-for-the-particular-profession-of-the-consultant/',
        title:
          'Consulting Contract Should Include Standard of Care that is Reasonable for the Particular Profession of the Consultant',
      },
      {
        to: '/how-enforceable-is-a-non-compete-clause-in-an-nda/',
        title: 'How Enforceable is a Non-Competition Clause in an NDA?',
      },
      {
        to:
          '/commercial-lease-the-overholding-clause-how-to-hold-on-to-your-space-after-your-lease-term-ends/',
        title:
          'Commercial Leases & The Overholding Clause \u2013 How To Hold On To Your Space After Your Lease Term Ends',
      },
      {
        to: '/what-voting-rights-do-non-voting-shareholders-have/',
        title: 'What voting rights do non-voting shareholders have?',
      },
      {
        to: '/legal-tips-and-tricks-deal-negotiations-using-an-loimou/',
        title: 'Legal Tips and Tricks: Deal Negotiations Using an LOI/MOU',
      },
      {
        to: '/who-is-responsible-for-payments-if-a-contract-is-terminated/',
        title: 'Who is responsible for payments if a contract is terminated?',
      },
      {
        to:
          '/what-is-the-difference-between-a-confidential-disclosure-agreement-cda-and-a-non-disclosure-agreement-nda/',
        title:
          'What is the difference between a confidential disclosure agreement (CDA) and a non-disclosure agreement (NDA)?',
      },
      {
        to: '/what-is-a-permanent-full-time-position/',
        title: 'What is a \u201Cpermanent\u201D full time position?',
      },
      {
        to: '/the-scope-of-your-confidential-information/',
        title:
          'The Scope of your Confidential Information: Too Broad, Too Narrow, or Just Right?',
      },
      {
        to:
          '/how-much-should-you-compensate-your-startup-company-board-of-advisorsdirectors/',
        title:
          'How much should you compensate your startup company board of advisors/directors?',
      },
      {
        to:
          '/when-forming-a-company-how-many-shares-should-be-issued-and-at-what-price/',
        title:
          'When forming a company, how many shares  should be issued, and at what price?',
      },
      {
        to:
          '/non-compete-in-an-asset-purchase-agreement-is-enforceable-but-it-may-not-be-in-an-employment-agreement/',
        title:
          'Non-Compete in an Asset Purchase Agreement is Enforceable, but It May Not Be in an Employment Agreement',
      },
      {
        to: '/what-rights-can-you-not-sign-away-in-a-contract/',
        title: 'What rights can you not sign away in a contract?',
      },
      {
        to: '/what-makes-a-contract-enforceable/',
        title: 'What Makes a Contract Enforceable?',
      },
      {
        to: '/beware-the-continuous-operations-leasing-clause/',
        title: 'Beware the Continuous Operation Leasing Clause',
      },
      {
        to:
          '/what-legal-agreements-should-be-signed-before-giving-a-project-to-a-software-developer/',
        title:
          'What legal agreements should be signed before giving a project to a software developer?',
      },
    ].map(({to, title}) =>
      h(Typography, {variant: 'body2'}, h(Link, {to}, title)),
    ),
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/the-mistake-tenants-need-to-know-about-estoppel-certificates/",
        },
        "The Mistake: Tenants Need to Know About Estoppel Certificates",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/sign-this-or-lose-your-job-can-my-employer-really-do-this/",
        },
        "Sign This or Lose Your Job! Can My Employer Really Do This?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/is-it-legal-for-a-company-to-ask-an-employee-to-sign-an-nda-after-the-employee-has-started-working/",
        },
        "Is it legal for a company to ask an employee to sign an NDA after the employee has started working?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/what-is-the-maximum-term-of-an-nda-if-it-is-not-mentioned-in-the-contract/",
        },
        "What is the maximum term of an NDA if it is not mentioned in the contract?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/what-is-the-difference-between-a-contract-and-a-memorandum-of-understanding/",
        },
        "What is the Difference Between a Contract and a Memorandum of Understanding?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/legal-tips-and-tricks-shotgun-clause/",
        },
        "Legal Tips and Tricks: \u201CShotgun Clause\u201D",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/what-legal-rights-do-i-have-where-an-employer-promised-shares-but-did-not-deliver/",
        },
        "What legal rights do I have where an employer promised shares but did not deliver?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/limited-liability-partnership-what-is-an-llp/",
        },
        "Limited Liability Partnership: What is an LLP?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/exclusive-use-clauses-a-classic-real-estate-newbie-mistake/",
        },
        "Exclusive use clauses: A classic real estate newbie mistake",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/consulting-contract-should-include-standard-of-care-that-is-reasonable-for-the-particular-profession-of-the-consultant/",
        },
        "Consulting Contract Should Include Standard of Care that is Reasonable for the Particular Profession of the Consultant",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/how-enforceable-is-a-non-compete-clause-in-an-nda/",
        },
        "How Enforceable is a Non-Competition Clause in an NDA?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/commercial-lease-the-overholding-clause-how-to-hold-on-to-your-space-after-your-lease-term-ends/",
        },
        "Commercial Leases & The Overholding Clause \u2013 How To Hold On To Your Space After Your Lease Term Ends",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/what-voting-rights-do-non-voting-shareholders-have/",
        },
        "What voting rights do non-voting shareholders have?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/legal-tips-and-tricks-deal-negotiations-using-an-loimou/",
        },
        "Legal Tips and Tricks: Deal Negotiations Using an LOI/MOU",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/who-is-responsible-for-payments-if-a-contract-is-terminated/",
        },
        "Who is responsible for payments if a contract is terminated?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/what-is-the-difference-between-a-confidential-disclosure-agreement-cda-and-a-non-disclosure-agreement-nda/",
        },
        "What is the difference between a confidential disclosure agreement (CDA) and a non-disclosure agreement (NDA)?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/what-is-a-permanent-full-time-position/",
        },
        "What is a \u201Cpermanent\u201D full time position?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/the-scope-of-your-confidential-information/",
        },
        "The Scope of your Confidential Information: Too Broad, Too Narrow, or Just Right?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/how-much-should-you-compensate-your-startup-company-board-of-advisorsdirectors/",
        },
        "How much should you compensate your startup company board of advisors/directors?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/when-forming-a-company-how-many-shares-should-be-issued-and-at-what-price/",
        },
        "When forming a company, how many shares  should be issued, and at what price?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to:
            "/non-compete-in-an-asset-purchase-agreement-is-enforceable-but-it-may-not-be-in-an-employment-agreement/",
        },
        "Non-Compete in an Asset Purchase Agreement is Enforceable, but It May Not Be in an Employment Agreement",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/what-rights-can-you-not-sign-away-in-a-contract/",
        },
        "What rights can you not sign away in a contract?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/what-makes-a-contract-enforceable/",
        },
        "What Makes a Contract Enforceable?",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },

      h(
        Link,
        {
          to: "/beware-the-continuous-operations-leasing-clause/",
        },
        "Beware the Continuous Operation Leasing Clause",
      ),
    ),
    h(
      Typography,
      { variant: "body2" },
      h(
        Link,
        {
          to:
            "/what-legal-agreements-should-be-signed-before-giving-a-project-to-a-software-developer/",
        },
        "What legal agreements should be signed before giving a project to a software developer?",
      ),
    ),
  );

export default Popular;

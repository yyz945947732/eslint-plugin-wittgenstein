"use strict";

const rule = require("../../../lib/rules/variable-name-regex"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run("variable-name-regex", rule, {
  valid: [
    {
      code: "const numRegex = /ab+c/;",
    },
    {
      code: "const numRegex = new RegExp('ab+c');",
    },
    {
      code: "const NUM_REGEX = new RegExp('ab+c');",
    },
  ],

  invalid: [
    {
      code: "const num = /ab+c/;",
      errors: [
        {
          message:
            "It is recommended to use `numRegex` instead of `num` for this variable name.",
        },
      ],
    },
    {
      code: "const num = new RegExp('ab+c');",
      errors: [
        {
          message:
            "It is recommended to use `numRegex` instead of `num` for this variable name.",
        },
      ],
    },
    {
      code: "const NUM = new RegExp('ab+c');",
      errors: [
        {
          message:
            "It is recommended to use `NUM_REGEX` instead of `NUM` for this variable name.",
        },
      ],
    },
  ],
});

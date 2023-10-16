"use strict";

const rule = require("../../../lib/rules/variable-name-boolean"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run("variable-name-boolean", rule, {
  valid: [
    {
      code: "const isShow = true;",
    },
    {
      code: "const isShow = false;",
    },
    {
      code: "const IS_OPEN = false;",
    },
    {
      code: "const isOpen = Boolean(true);",
    },
    {
      code: "const show = 'true';",
    },
    {
      code: "const show = String('true');",
    },
  ],

  invalid: [
    {
      code: "const show = true;",
      errors: [
        {
          message:
            "It is recommended to use `isShow` instead of `show` for this variable name.",
        },
      ],
    },
    {
      code: "const SHOW = true;",
      errors: [
        {
          message:
            "It is recommended to use `IS_SHOW` instead of `SHOW` for this variable name.",
        },
      ],
    },
    {
      code: "const open = Boolean(true);",
      errors: [
        {
          message:
            "It is recommended to use `isOpen` instead of `open` for this variable name.",
        },
      ],
    },
  ],
});

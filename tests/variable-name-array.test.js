"use strict";

const rule = require("../lib/rules/variable-name-array"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run("variable-name-array", rule, {
  valid: [
    {
      code: "const students = [];",
    },
    {
      code: "const studentList = [];",
    },
    {
      code: "const STUDENTS = [];",
    },
    {
      code: "const STUDENT_LIST = [];",
    },
  ],

  invalid: [
    {
      code: "const student = [];",
      errors: [
        {
          message:
            "It is recommended to use `studentList` instead of `student` for this variable name.",
        },
      ],
    },
    {
      code: "const STUDENT = [];",
      errors: [
        {
          message:
            "It is recommended to use `STUDENT_LIST` instead of `STUDENT` for this variable name.",
        },
      ],
    },
    {
      code: "const student = Array(10);",
      errors: [
        {
          message:
            "It is recommended to use `studentList` instead of `student` for this variable name.",
        },
      ],
    },
  ],
});

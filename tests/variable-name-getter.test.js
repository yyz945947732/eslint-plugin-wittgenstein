"use strict";

const rule = require("../lib/rules/variable-name-getter"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
  },
});
ruleTester.run("variable-name-getter", rule, {
  valid: [
    {
      code: "function getAge(){ return 18; };",
    },
    {
      code: "const getSex = () => 18;",
    },
    {
      code: "const getName = () => { return 'tony'; };",
    },
    {
      code: "const getNum = function(){ return 99; };",
    },
    {
      code: "const GET_NUM = function(){ return 99; };",
    },
  ],

  invalid: [
    {
      code: "function age(){ return 18; };",
      errors: [
        {
          message:
            "It is recommended to use `getAge` instead of `age` for this function name.",
        },
      ],
    },
    {
      code: "const sex = () => 18;",
      errors: [
        {
          message:
            "It is recommended to use `getSex` instead of `sex` for this function name.",
        },
      ],
    },
    {
      code: "const name = () => { return 'tony'; };",
      errors: [
        {
          message:
            "It is recommended to use `getName` instead of `name` for this function name.",
        },
      ],
    },
    {
      code: "const num = function(){ return 99; };",
      errors: [
        {
          message:
            "It is recommended to use `getNum` instead of `num` for this function name.",
        },
      ],
    },
    {
      code: "const NUM = function(){ return 99; };",
      errors: [
        {
          message:
            "It is recommended to use `GET_NUM` instead of `NUM` for this function name.",
        },
      ],
    },
  ],
});

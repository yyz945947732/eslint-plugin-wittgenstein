"use strict";

const requireIndex = require("requireindex");

module.exports = {
  rules: requireIndex(__dirname + "/rules"),
  configs: {
    recommended: {
      plugins: ["wittgenstein"],
      rules: {
        "wittgenstein/variable-name-array": "warn",
        "wittgenstein/variable-name-boolean": "warn",
        "wittgenstein/variable-name-getter": "warn",
        "wittgenstein/variable-name-regex": "warn",
      },
    },
    strict: {
      plugins: ["wittgenstein"],
      rules: {
        "wittgenstein/variable-name-array": "error",
        "wittgenstein/variable-name-boolean": "error",
        "wittgenstein/variable-name-getter": "error",
        "wittgenstein/variable-name-regex": "error",
      },
    },
  },
};

"use strict";

const getFixedVariableName = require("../utils/getFixedVariableName");

const REGEX_MESSAGE_ID = "RegexVariableName";

/**
 * @typedef {import('eslint').Rule.RuleModule.Node} Node
 * @typedef {import('eslint').Rule.RuleContext} Context
 */

/**
 * Validate Regex Variable Name.
 * @param {string} variableName
 * @param {Node} node
 * @param {Context} context
 */
function validateRegexVariableName(variableName, node, context) {
  const lowcaseVariableName = variableName.toLowerCase();
  if (!lowcaseVariableName.endsWith("regex")) {
    const fixedVariableName = getFixedVariableName(variableName, {
      suffix: "Regex",
    });
    context.report({
      loc: node.loc,
      message: `It is recommended to use \`${fixedVariableName}\` instead of \`${variableName}\` for this variable name.`,
      suggest: [
        {
          messageId: REGEX_MESSAGE_ID,
          fix: (fixer) => fixer.replaceText(node, fixedVariableName),
        },
      ],
    });
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    type: "suggestion",
    docs: {
      description: "Make sure your regex type variable name ends with `Regex`.",
    },
    messages: {
      [REGEX_MESSAGE_ID]:
        "Make sure your regex type variable name ends with `Regex`.",
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclaration(node) {
        node.declarations.forEach((declarations) => {
          if (declarations && declarations.type === "VariableDeclarator") {
            const { id, init } = declarations;
            /* istanbul ignore if */
            if (!init) {
              return;
            }
            if (
              init.regex ||
              (init.type === "NewExpression" && init.callee.name === "RegExp")
            ) {
              validateRegexVariableName(id.name, id, context);
            }
          }
        });
      },
    };
  },
};

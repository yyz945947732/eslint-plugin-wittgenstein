"use strict";

const getFixedVariableName = require("../utils/getFixedVariableName");

const BOOLEAN_MESSAGE_ID = "BooleanVariableName";

/**
 * @typedef {import('eslint').Rule.RuleModule.Node} Node
 * @typedef {import('eslint').Rule.RuleContext} Context
 */

/**
 * Validate Boolean Variable Name.
 * @param {string} variableName
 * @param {Node} node
 * @param {Context} context
 */
function validateBooleanVariableName(variableName, node, context) {
  const lowcaseVariableName = variableName.toLowerCase();
  if (!lowcaseVariableName.startsWith("is")) {
    const fixedVariableName = getFixedVariableName(variableName, {
      prefix: "is",
    });
    context.report({
      loc: node.loc,
      message: `It is recommended to use \`${fixedVariableName}\` instead of \`${variableName}\` for this variable name.`,
      suggest: [
        {
          messageId: BOOLEAN_MESSAGE_ID,
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
      description: "Make sure your boolean type variable name start with `is`.",
    },
    messages: {
      [BOOLEAN_MESSAGE_ID]:
        "Make sure your boolean type variable name start with `is`.",
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclaration(node) {
        node.declarations.forEach((declarations) => {
          if (declarations && declarations.type === "VariableDeclarator") {
            const { id, init } = declarations;
            if (!init) {
              return;
            }
            if (
              (init.type === "Literal" && typeof init.value === "boolean") ||
              (init.type === "CallExpression" && init.callee.name === "Boolean")
            ) {
              validateBooleanVariableName(id.name, id, context);
            }
          }
        });
      },
    };
  },
};

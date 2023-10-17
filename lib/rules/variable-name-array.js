"use strict";

const getFixedVariableName = require("../utils/getFixedVariableName");

const ARRAY_MESSAGE_ID = "ArrayVariableName";

/**
 * @typedef {import('eslint').Rule.RuleModule.Node} Node
 * @typedef {import('eslint').Rule.RuleContext} Context
 */

/**
 * Validate Array Variable Name.
 * @param {string} variableName
 * @param {Node} node
 * @param {Context} context
 */
function validateArrayVariableName(variableName, node, context) {
  const lowcaseVariableName = variableName.toLowerCase();
  if (
    !lowcaseVariableName.endsWith("s") &&
    !lowcaseVariableName.endsWith("list")
  ) {
    const fixedVariableName = getFixedVariableName(variableName, {
      suffix: "List",
    });
    context.report({
      loc: node.loc,
      message: `It is recommended to use \`${fixedVariableName}\` instead of \`${variableName}\` for this variable name.`,
      suggest: [
        {
          messageId: ARRAY_MESSAGE_ID,
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
      description:
        "Make sure your array type variable name ends with `List` or `s`.",
    },
    messages: {
      [ARRAY_MESSAGE_ID]:
        "Make sure your array type variable name ends with `List` or `s`.",
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
              init.type === "ArrayExpression" ||
              (init.type === "CallExpression" && init.callee.name === "Array")
            ) {
              validateArrayVariableName(id.name, id, context);
            }
          }
        });
      },
    };
  },
};

"use strict";

const getFixedVariableName = require("../utils/getFixedVariableName");
const getDocLink = require("../utils/getDocLink");

const RULE_ID = "variable-name-array";

const ARRAY_MESSAGE_ID = "ArrayVariableName";
const DOC_LINK = getDocLink(RULE_ID);

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
          data: {
            variableName,
            fixedVariableName,
          },
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
      url: DOC_LINK,
    },
    messages: {
      [ARRAY_MESSAGE_ID]:
        "Replace the variable name `{{variableName}}` with `{{fixedVariableName}}`",
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
              (init.type === "NewExpression" && init.callee.name === "Array") ||
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

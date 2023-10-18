"use strict";

const getFixedVariableName = require("../utils/getFixedVariableName");
const getDocLink = require("../utils/getDocLink");

const RULE_ID = 'variable-name-boolean';

const BOOLEAN_MESSAGE_ID = "BooleanVariableName";
const DOC_LINK = getDocLink(RULE_ID);

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
      description: "Make sure your boolean type variable name start with `is`.",
      url: DOC_LINK,
    },
    messages: {
      [BOOLEAN_MESSAGE_ID]:
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

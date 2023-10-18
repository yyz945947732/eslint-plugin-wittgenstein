"use strict";

const getFixedVariableName = require("../utils/getFixedVariableName");
const getDocLink = require("../utils/getDocLink");

const RULE_ID = "variable-name-getter";

const GETTER_MESSAGE_ID = "GetterFunctionVariableName";
const DOC_LINK = getDocLink(RULE_ID);

/**
 * @typedef {import('eslint').Rule.RuleModule.Node} Node
 * @typedef {import('eslint').Rule.RuleContext} Context
 */

/**
 * Validate Getter Function Variable Name.
 * @param {string} variableName
 * @param {Node} node
 * @param {Context} context
 */
function validateGetterFunctionVariableName(variableName, node, context) {
  const lowcaseVariableName = variableName.toLowerCase();
  if (!lowcaseVariableName.startsWith("get")) {
    const fixedVariableName = getFixedVariableName(variableName, {
      prefix: "get",
    });
    context.report({
      loc: node.loc,
      message: `It is recommended to use \`${fixedVariableName}\` instead of \`${variableName}\` for this function name.`,
      suggest: [
        {
          messageId: GETTER_MESSAGE_ID,
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

/**
 * Validate all ReturnStatement in BlockStatement.
 * @param {Node} block
 * @param {Node} id
 * @param {Context} context
 */
function handleBlockStatement(block, id, context) {
  if (Array.isArray(block.body)) {
    for (const part of block.body) {
      if (part.type === "ReturnStatement") {
        validateGetterFunctionVariableName(id.name, id, context);
        break;
      }
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    type: "suggestion",
    docs: {
      description: "Make sure your getter function name start with `get`.",
      url: DOC_LINK,
    },
    messages: {
      [GETTER_MESSAGE_ID]:
        "Replace the variable name `{{variableName}}` with `{{fixedVariableName}}`",
    },
    schema: [],
  },

  create(context) {
    return {
      FunctionDeclaration(node) {
        const { id, body } = node;
        if (body.type === "BlockStatement") {
          handleBlockStatement(body, id, context);
        }
      },
      VariableDeclaration(node) {
        node.declarations.forEach((declarations) => {
          if (declarations && declarations.type === "VariableDeclarator") {
            const { id, init } = declarations;
            /* istanbul ignore if */
            if (!init) {
              return;
            }
            if (init.type === "ArrowFunctionExpression") {
              if (init.body.type === "Literal") {
                validateGetterFunctionVariableName(id.name, id, context);
              } else if (init.body.type === "BlockStatement") {
                handleBlockStatement(init.body, id, context);
              }
            } else if (
              init.type === "FunctionExpression" &&
              init.body.type === "BlockStatement"
            ) {
              handleBlockStatement(init.body, id, context);
            }
          }
        });
      },
    };
  },
};

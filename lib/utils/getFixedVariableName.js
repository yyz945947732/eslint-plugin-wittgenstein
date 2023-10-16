const capitalize = require("capitalize");

/**
 * @private
 * 
 * Get fixed variable name based on prefix or suffix.
 * @param {string} variableName
 * @param {{ prefix?: string, suffix?: string }} options
 * @returns {string}
 */
function getFixedVariableName(variableName, options) {
  const { prefix = "", suffix = "" } = options;
  if (variableName.toUpperCase() === variableName) {
    return [prefix, variableName, suffix].filter(Boolean).join("_").toUpperCase();
  }
  if (prefix) {
    variableName = capitalize(variableName, true);
  }
  return [prefix, variableName, suffix].filter(Boolean).join("");
}

module.exports = getFixedVariableName;

<p align="center">
 <img width="225" src="https://github.com/yyz945947732/eslint-plugin-wittgenstein/blob/master/assets/wittgenstein.jpeg" />
</p>

<h1 align="center">eslint-plugin-wittgenstein</h1>

<div align="center">

![CI](https://github.com/yyz945947732/eslint-plugin-wittgenstein/actions/workflows/test.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/yyz945947732/eslint-plugin-wittgenstein/badge.svg?branch=master)](https://coveralls.io/github/yyz945947732/eslint-plugin-wittgenstein?branch=master)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-wittgenstein.svg?logo=npm&logoColor=fff)](https://npmjs.org/package/eslint-plugin-wittgenstein)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yyz945947732/eslint-plugin-wittgenstein/pulls)
[![License](https://img.shields.io/github/license/yyz945947732/eslint-plugin-wittgenstein.svg?style=flat)](https://github.com/yyz945947732/eslint-plugin-wittgenstein/blob/master/LICENSE)

</div>

This plugin intends to let you use semantic variable names when naming variables.

```JS
❌ const show = true;
👌 const isShow = true;
```

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-wittgenstein`:

```sh
npm install eslint-plugin-wittgenstein --save-dev
```

## Usage

On your `.eslintrc` file extend the plugin's recommended configuration:

```json
{
  "extends": ["plugin:wittgenstein/recommended"]
}
```

If you want to use your own configuration, you can do so by adding the plugin to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["wittgenstein"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "wittgenstein/variable-name-boolean": "warn"
  }
}
```

## Rules

💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                         | Description                                                      | 💡  |
| :----------------------------------------------------------- | :--------------------------------------------------------------- | :-- |
| [variable-name-array](docs/rules/variable-name-array.md)     | Make sure your array type variable name ends with `List` or `s`. | 💡  |
| [variable-name-boolean](docs/rules/variable-name-boolean.md) | Make sure your boolean type variable name start with `is`.       | 💡  |
| [variable-name-getter](docs/rules/variable-name-getter.md)   | Make sure your getter function name start with `get`.            | 💡  |
| [variable-name-regex](docs/rules/variable-name-regex.md)     | Make sure your regex type variable name ends with `Regex`.       | 💡  |

## Contribution

Contribution is welcome! There are many ways you could help:

- Triaging Issues
- Writing Code
- Improving Doc

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/yyz945947732/eslint-plugin-wittgenstein/issues). Pull requests are also appreciated.

## LICENSE

[MIT](https://github.com/yyz945947732/eslint-plugin-wittgenstein/blob/master/LICENSE)

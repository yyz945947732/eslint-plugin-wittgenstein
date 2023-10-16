# eslint-plugin-wittgenstein

Make sure you use semantic variable names.

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

Add `wittgenstein` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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

| Name                                                         | Description                                                     | 💡  |
| :----------------------------------------------------------- | :-------------------------------------------------------------- | :-- |
| [variable-name-array](docs/rules/variable-name-array.md)     | Make sure your array type variable name ends with `List` or `s` | 💡  |
| [variable-name-boolean](docs/rules/variable-name-boolean.md) | Make sure your boolean type variable name start with `is`       | 💡  |
| [variable-name-regex](docs/rules/variable-name-regex.md)     | Make sure your regex type variable name ends with `Regex`       | 💡  |

## LICENSE

[MIT](https://github.com/yyz945947732/eslint-plugin-wittgenstein/blob/master/LICENSE)

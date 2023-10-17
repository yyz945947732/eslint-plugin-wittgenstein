# Make sure your regex type variable name ends with `Regex` (`wittgenstein/variable-name-regex`)

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

## Rule Details

This rule aims to make sure you RegExp variable name is end with `Regex`.

Examples of **incorrect** code for this rule:

```js
const num = /ab+c/;
```

Examples of **correct** code for this rule:

```js
const numRegex = /ab+c/;
```

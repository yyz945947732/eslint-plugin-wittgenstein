# Make sure your getter function name start with `get` (`wittgenstein/variable-name-getter`)

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

## Rule Details

This rule aims to make sure you Getter Function variable name is end with `get`.

Examples of **incorrect** code for this rule:

```js
function age() {
  return 18;
}
```

Examples of **correct** code for this rule:

```js
function getAge() {
  return 18;
}
```

# Make sure your array type variable name ends with `List` or `s` (`wittgenstein/variable-name-array`)

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

This rule aims to make sure you array variable name is end with `List` or `s`.

Examples of **incorrect** code for this rule:

```js
const student = [];
```

Examples of **correct** code for this rule:

```js
const students = [];
const studentList = [];
```


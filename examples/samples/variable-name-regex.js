// invalid
const num = /ab+c/;
const number = new RegExp("ab+c");
const NUM = new RegExp("ab+c");

console.log(num);
console.log(number);
console.log(NUM);

// valid
const numRegex = /ab+c/;
const numberRegex = new RegExp("ab+c");
const NUM_REGEX = new RegExp("ab+c");

console.log(numRegex);
console.log(numberRegex);
console.log(NUM_REGEX);

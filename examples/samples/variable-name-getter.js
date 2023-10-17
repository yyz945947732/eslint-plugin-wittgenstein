// invalid
function age() {
  return 18;
}

const sex = () => 18;

const myName = () => {
  return "tony";
};

const num = function () {
  return 99;
};

const NUM = function () {
  return 99;
};

age();
sex();
myName();
num();
NUM();

// valid
function getAge() {
  return 18;
}

const getSex = () => 18;

const getMyName = () => {
  return "tony";
};

const getNum = function () {
  return 99;
};

const GET_NUM = function () {
  return 99;
};

getAge();
getSex();
getMyName();
getNum();
GET_NUM();

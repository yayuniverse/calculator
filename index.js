let num1;
let num2;
let operator;
let parsedExpression;

function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}

const calcScreen = document.querySelector("#displayField");

function parseInput() {
  parsedExpression = calcScreen.value.split(/([+\-*/])/); //split by operator
  if (parsedExpression[0]) num1 = Number(parsedExpression[0]);
  if (parsedExpression[1]) operator = parsedExpression[1];
  if (parsedExpression[2]) num2 = Number(parsedExpression[2]);
}

function operate() {
  let result;
  if (operator === "+") result = add(num1, num2);
  else if (operator === "-") result = subtract(num1, num2);
  else if (operator === "*") result = multiply(num1, num2);
  else if (operator === "/" && num2 === 0) return "No can do 😒";
  else if (operator === "/") result = divide(num1, num2);
  else return "Error: Invalid operator";
  return Number.isInteger(result) ? result : result.toFixed(2);
}

calcScreen.addEventListener("keyup", (event) => {
  parseInput();
  if (event.key === "Enter") {
    calcScreen.value = operate();
  }
  console.log(parsedExpression);
});

const buttonGroup = document.querySelector(".buttonGroup");
buttonGroup.addEventListener("click", function (e) {
  if (e.target.className === "regularButton") {
    calcScreen.value += e.target.textContent;
    parseInput()
    console.log(parsedExpression);
  }
});

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () => {
  parseInput();
  calcScreen.value = operate();
});

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => (calcScreen.value = ""));

// The next two event listeners ensure the cursor always stays at the end of the input field
calcScreen.addEventListener("input", function () {
  calcScreen.setSelectionRange(
    calcScreen.value.length,
    calcScreen.value.length,
  );
});
calcScreen.addEventListener("click", function () {
  calcScreen.setSelectionRange(
    calcScreen.value.length,
    calcScreen.value.length,
  );
});

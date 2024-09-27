let num1, num2, operator, parsedExpression, result;
const acceptedChars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "/",
  "*",
  "=",
  ".",
];

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

function parseExpression() {
  splitInputIntoArray();
  console.log(parsedExpression);
  assignExpressionToVariables();
  console.log(num1, operator, num2);
  limitToTwoOperands();
}

function splitInputIntoArray() {
  parsedExpression = calcScreen.value
    .split(/([+\-*/=])/) //split by operator and equals sign
    .filter((item) => item !== ""); //remove empty strings

  if (parsedExpression[0] === "-" && parsedExpression[1]) {
    parsedExpression[0] = parsedExpression[0] + parsedExpression[1];
    parsedExpression.splice(1, 1);
  }
  if (parsedExpression[2] === "-") {
    parsedExpression[2] = parsedExpression[2] + parsedExpression[3];
    parsedExpression.splice(3, 1);
  }
}

function assignExpressionToVariables() {
  if (parsedExpression[0]) num1 = Number(parsedExpression[0]);
  if (parsedExpression[1]) operator = parsedExpression[1];
  if (parsedExpression[2]) num2 = Number(parsedExpression[2]);
}

function limitToTwoOperands() {
  if (parsedExpression.length > 3 && parsedExpression[2] !== "-") {
    operate();
    calcScreen.value =
      result === "Put numbers in me"
        ? result
        : `${result}${parsedExpression[parsedExpression.length - 1]}`;
    result = null;
    resetExpressionVariables();
  }
}

function isFloat(num) {
  return Number.isFinite(num) && !Number.isInteger(num);
}

function hasDecimal(operand) {
  if (operand) return operand.toString().includes(".");
  else if (!operand) return false;
}

function resetExpressionVariables() {
  num1 = null;
  num2 = null;
  operator = null;
}

function operate() {
  if (operator === "+") result = add(num1, num2);
  else if (operator === "-") result = subtract(num1, num2);
  else if (operator === "*") result = multiply(num1, num2);
  else if (operator === "/") result = divide(num1, num2);
  else if (operator === "/" && num2 === 0) return "No can do 😒";
  else return "Invalid operator";

  console.log(`result: ${result} and typeof: ${typeof result}`);
  if (Number.isNaN(result)) {
    result = "Put numbers in me";
    return result;
  }
  return Number.isInteger(result) ? result : Number(result.toFixed(2));
}

function clearDisplay() {
  calcScreen.value = "";
  resetExpressionVariables();
  parsedExpression = null;
  result = null;
}

function canAddDecimalToFirstOperand(parsedExpression) {
  if (parsedExpression)
    return !hasDecimal(parsedExpression[0]) && !parsedExpression[2];
  else return true;
}

function canAddDecimalToSecondOperand(parsedExpression, operator) {
  return operator && !hasDecimal(parsedExpression[2]);
}

calcScreen.addEventListener("keyup", (event) => {
  parseExpression();
  if (event.key === "Enter" || event.key === "=") {
    calcScreen.value = operate();
    parseExpression();
    resetExpressionVariables();
  }
});

calcScreen.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    event.preventDefault();
    clearDisplay();
    parseExpression();
    resetExpressionVariables();
  } else if (event.key === "=") event.preventDefault();
  else if (
    event.key === "." &&
    !canAddDecimalToFirstOperand(parsedExpression) &&
    !canAddDecimalToSecondOperand(parsedExpression, operator)
  ) {
    event.preventDefault();
  } else if (!acceptedChars.includes(event.key)) {
    event.preventDefault();
  }
});

const buttonGroup = document.querySelector(".buttonGroup");
buttonGroup.addEventListener("click", function (e) {
  if (e.target.className === "regularButton") {
    calcScreen.value += e.target.textContent;
    parseExpression();
    console.log(parsedExpression);
  }

  if (
    e.target.className === "decimalButton" &&
    (canAddDecimalToFirstOperand(parsedExpression) ||
      canAddDecimalToSecondOperand(parsedExpression, operator))
  ) {
    calcScreen.value += e.target.textContent;
    parseExpression();
  }
});

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () => {
  parseExpression();
  calcScreen.value = operate();
});

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => {
  clearDisplay();
});

document.addEventListener("click", () => calcScreen.focus());

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

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  video.play();
});

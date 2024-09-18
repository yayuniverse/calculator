let num1;
let num2;
let operator;

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

function inputFormatter() {
  output = calcScreen.value.split(/([+\-*/])/); //split by operator
  num1 = Number(output[0]);
  operator = output[1];
  num2 = Number(output[2]);
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

calcScreen.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    inputFormatter();
    calcScreen.value = operate();
  }
});

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

const buttonGroup = document.querySelector(".buttonGroup");

buttonGroup.addEventListener("click", function (e) {
  if (e.target.className === "regularButton") calcScreen.value += e.target.textContent;
});

const submitButton = document.querySelector(".submit")

submitButton.addEventListener("click", () => {
  inputFormatter();
  calcScreen.value = operate();
})

let num1;
let num2;
let operator;

// Operator functions
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

const displayField = document.querySelector("#displayField");

function inputFormatter() {
  output = displayField.value.split(/([+\-*/])/); //split by operator
  num1 = Number(output[0]);
  operator = output[1];
  num2 = Number(output[2]);
}

// Operate function
function operate() {
  let result;
  if (operator === "+") result = add(num1, num2);
  else if (operator === "-") result = subtract(num1, num2);
  else if (operator === "*") result = multiply(num1, num2);
  else if (operator === "/" && num2 === 0) return "No can do 😒"
  else if (operator === "/") result = divide(num1, num2);
  else return "Error: Invalid operator";
  return Number.isInteger(result)  ? result : result.toFixed(2);
}

displayField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    inputFormatter();
    displayField.value = operate();
  }
});

// The next two event listeners ensure the cursor always stays at the end of the input field
displayField.addEventListener("input", function () {
  displayField.setSelectionRange(
    displayField.value.length,
    displayField.value.length,
  );
});

displayField.addEventListener("click", function () {
  displayField.setSelectionRange(
    displayField.value.length,
    displayField.value.length,
  );
});

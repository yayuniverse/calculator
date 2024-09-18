let num1 = null;
let num2 = null;
let operator = null;

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
  if (operator === "+") return add(num1, num2);
  else if (operator === "-") return subtract(num1, num2);
  else if (operator === "*") return multiply(num1, num2);
  else if (operator === "/") return divide(num1, num2);
  else return "Error: Invalid operator";
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

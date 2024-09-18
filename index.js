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

// Operate function
function operate() {
  console.log(operator(num1, num2));
}

function inputFormatter() {
  output = displayField.value.split(/([+\-*/])/);
  num1 = Number(output[0]);
  num2 = Number(output[output.length - 1]);
}

const displayField = document.querySelector("#displayField");

displayField.addEventListener("keypress", (event) => {
  if (event.key === "+") operator = add;
  else if (event.key === "-") operator = subtract;
  else if (event.key === "*") operator = multiply;
  else if (event.key === "/") operator = divide;
  else if (event.key === "Enter") {
    inputFormatter();
    operate();
  }
});

// The next two event listeners ensure the cursor always stays at the end of the input field
displayField.addEventListener('input', function() {
  displayField.setSelectionRange(displayField.value.length, displayField.value.length);
});

displayField.addEventListener('click', function() {
  displayField.setSelectionRange(displayField.value.length, displayField.value.length);
});

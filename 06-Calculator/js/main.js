const calculator = document.querySelector(".calculator");
const calculatorDisplay = calculator.querySelector(".calculator__display");
const calculatorButtonsDiv = calculator.querySelector(".calculator__keys");

calculatorButtonsDiv.addEventListener("click", (event) => {
  const button = event.target;
  // console.log(event.target);
  const { buttonType, key } = button.dataset;
  const result = calculatorDisplay.textContent;
  const { previousButtonType } = calculator.dataset;

  // Release operator pressed state
  const operatorKeys = [...calculatorButtonsDiv.children].filter(
    (button) => button.dataset.buttonType === "operator"
  );
  operatorKeys.forEach((button) => button.classList.remove("is-pressed"));

  if (buttonType === "number") {
    if (result === "0") {
      calculatorDisplay.textContent = key;
    } else {
      calculatorDisplay.textContent = result + key;
    }

    if (previousButtonType === "operator") {
      calculatorDisplay.textContent = key;
    }
  }

  if (buttonType === "decimal") {
    calculatorDisplay.textContent = result + ".";
  }

  if (buttonType === "operator") {
    button.classList.add("is-pressed");
    calculator.dataset.firstValue = result;
    calculator.dataset.operator = button.dataset.key;
  }

  if (buttonType === "equal") {
    const firstValue = parseFloat(calculator.dataset.firstValue);
    const operator = calculator.dataset.operator;
    const secondValue = parseFloat(result);

    console.log(`firstValue: ${firstValue}`);
    console.log(operator);
    console.log(`secondValue: ${secondValue}`);

    let newResult;
    if (operator === "plus") newResult = firstValue + secondValue;
    if (operator === "minus") newResult = firstValue - secondValue;
    if (operator === "times") newResult = firstValue * secondValue;
    if (operator === "divide") newResult = firstValue / secondValue;

    calculatorDisplay.textContent = newResult;
  }

  if (buttonType !== "clear") {
    const clearButton = calculator.querySelector("[data-button-type=clear]");
    clearButton.textContent = "CE";
  }

  if (buttonType === "clear") {
    if (button.textContent === "AC") {
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
    }
    calculatorDisplay.textContent = "0";
    button.textContent = "AC";
  }

  console.log(calculator.dataset.firstValue);
  console.log(calculator.dataset.operator);
  calculator.dataset.previousButtonType = buttonType;
});

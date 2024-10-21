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
    if (previousButtonType === "equal") {
      resetCalculator();
      calculatorDisplay.textContent = key;
    }
  }

  if (buttonType === "decimal") {
    if (!result.includes(".")) {
      calculatorDisplay.textContent = result + ".";
    }

    if (previousButtonType === "equal") {
      resetCalculator();
      calculatorDisplay.textContent = "0.";
    }

    if (previousButtonType === "operator") {
      calculatorDisplay.textContent = "0.";
    }
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

    // Skips calculation if there's no `firstValue` and `operator`
    if (firstValue && operator) {
      let newResult;
      if (operator === "plus") newResult = firstValue + secondValue;
      if (operator === "minus") newResult = firstValue - secondValue;
      if (operator === "times") newResult = firstValue * secondValue;
      if (operator === "divide") newResult = firstValue / secondValue;

      calculatorDisplay.textContent = newResult;
    } else {
      // Strips unnecessary decimal point
      calculatorDisplay.textContent = parseFloat(result) * 1;
    }
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

  // console.log(calculator.dataset.firstValue);
  // console.log(calculator.dataset.operator);
  calculator.dataset.previousButtonType = buttonType;
});

function pressKeys(...keys) {
  keys.forEach((pressKey) => {
    calculator.querySelector(`[data-key="${pressKey}"]`).click();
  });
}

function getDisplayValue() {
  return calculator.querySelector(".calculator__display").textContent;
}
function resetCalculator() {
  pressKeys("clear");
  pressKeys("clear");

  console.assert(getDisplayValue() === "0", "Calculator cleared");
  console.assert(!calculator.dataset.firstValue, "No first value");
  console.assert(!calculator.dataset.operator, "No operator value");
}

function runTest(test) {
  pressKeys(...test.keys);
  console.assert(getDisplayValue() === test.result, test.message);
  resetCalculator();
}

function testClearKey() {
  // Before calculation
  pressKeys("5", "clear");
  const clearKeyText =
    calculator.querySelector('[data-key="clear"]').textContent;
  console.assert(getDisplayValue() === "0", "Clear before calculation");
  console.assert(clearKeyText === "AC", "Clear once, should show AC");
  resetCalculator();

  // After calculation
  pressKeys("5", "times", "9", "equal", "clear");
  const { firstValue, operator } = calculator.dataset;
  console.assert(firstValue, "Clear once;  should have first value");
  console.assert(operator, "Clear once;  should have operator value");
  resetCalculator();
}

// runTest({
//   keys: ["4", "decimal", "5"],
//   result: "4.5",
//   message: "Number Decimal Number",
// });

const tests = [
  // {
  //   keys: ["2"],
  //   result: "2",
  //   message: "Number key",
  // },
  // {
  //   keys: ["3", "5"],
  //   result: "35",
  //   message: "Number Number",
  // },
  // {
  //   keys: ["4", "decimal"],
  //   result: "4.",
  //   message: "Number Decimal",
  // },
  // {
  //   keys: ["4", "decimal", "5"],
  //   result: "4.5",
  //   message: "Number Decimal Number",
  // },
  // // Calculations
  // {
  //   keys: ["2", "plus", "5", "equal"],
  //   result: "7",
  //   message: "Addition",
  // },
  // {
  //   keys: ["5", "minus", "9", "equal"],
  //   result: "-4",
  //   message: "Subtraction",
  // },
  // {
  //   keys: ["4", "times", "8", "equal"],
  //   result: "32",
  //   message: "Multiplication",
  // },
  // {
  //   keys: ["5", "divide", "1", "0", "equal"],
  //   result: "0.5",
  //   message: "Division",
  // },
  // {
  //   keys: ["5", "equal"],
  //   result: "5",
  //   message: "Number Equal",
  // },
  // {
  //   message: "Number Decimal Equal",
  //   keys: ["2", "decimal", "4", "5", "equal"],
  //   result: "2.45",
  // },
  // {
  //   message: "Decimal key",
  //   keys: ["decimal"],
  //   result: "0.",
  // },
  // {
  //   message: "Decimal Decimal",
  //   keys: ["2", "decimal", "decimal"],
  //   result: "2.",
  // },
  // {
  //   message: "Decimal Number Decimal",
  //   keys: ["2", "decimal", "5", "decimal", "5"],
  //   result: "2.55",
  // },
  // {
  //   message: "Decimal Equal",
  //   keys: ["2", "decimal", "equal"],
  //   result: "2",
  // },
  // {
  //   message: "Equal",
  //   keys: ["equal"],
  //   result: "0",
  // },
  // {
  //   message: "Equal Number",
  //   keys: ["equal", "3"],
  //   result: "3",
  // },
  // {
  //   message: "Number Equal Number",
  //   keys: ["5", "equal", "3"],
  //   result: "3",
  // },
  // {
  //   message: "Equal Decimal",
  //   keys: ["equal", "decimal"],
  //   result: "0.",
  // },
  // {
  //   message: "Number Equal Decimal",
  //   keys: ["5", "equal", "decimal"],
  //   result: "0.",
  // },
  // {
  //   message: "Calculation + Operator",
  //   keys: ["1", "plus", "1", "equal", "plus", "1", "equal"],
  //   result: "3",
  // },
  // {
  //   message: "Operator Decimal",
  //   keys: ["times", "decimal"],
  //   result: "0.",
  // },
  // {
  //   message: "Number Operator Decimal",
  //   keys: ["5", "times", "decimal"],
  //   result: "0.",
  // },
  {
    message: "Number Operator Equal",
    keys: ["7", "divide", "equal"],
    result: "1",
  },
];

// Runs tests
tests.forEach(runTest);

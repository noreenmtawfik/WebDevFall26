// 1. DOM: Select elements (slide 10 & 28)
const display = document.getElementById('display');
const keysContainer = document.getElementById('keys');

// State variables (Logic)
let currentInput = '0';
let previousInput = null;
let activeOperator = null;
let resetDisplayOnNextDigit = false;

// 2. Logic Functions (slide 7 & 28)
function updateDisplay(value) {
  display.textContent = value;
}

function handleNumber(num) {
  if (currentInput === '0' || resetDisplayOnNextDigit) {
    currentInput = num;
    resetDisplayOnNextDigit = false;
  } else {
    currentInput += num;
  }
  updateDisplay(currentInput);
}

function handleDecimal() {
  if (resetDisplayOnNextDigit) {
    currentInput = '0.';
    resetDisplayOnNextDigit = false;
    updateDisplay(currentInput);
    return;
  }
  // Prevent duplicate decimals
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay(currentInput);
  }
}

function handleOperator(operator) {
  const inputValue = parseFloat(currentInput);

  if (previousInput !== null && !resetDisplayOnNextDigit) {
    calculate();
  } else {
    previousInput = inputValue;
  }

  activeOperator = operator;
  resetDisplayOnNextDigit = true;
}

function calculate() {
  if (previousInput === null || activeOperator === null) return;

  const current = parseFloat(currentInput);
  let result = 0;

  switch (activeOperator) {
    case '+':
      result = previousInput + current;
      break;
    case '-':
      result = previousInput - current;
      break;
    case '*':
      result = previousInput * current;
      break;
    case '/':
      result = current === 0 ? 'Error' : previousInput / current;
      break;
    default:
      return;
  }

  // Handle floats cleanly
  if (typeof result === 'number') {
    result = Math.round(result * 100000000) / 100000000;
  }

  currentInput = `${result}`;
  previousInput = typeof result === 'number' ? result : null;
  activeOperator = null;
  resetDisplayOnNextDigit = true;
  updateDisplay(currentInput);
}

function handleClear() {
  currentInput = '0';
  previousInput = null;
  activeOperator = null;
  resetDisplayOnNextDigit = false;
  updateDisplay('0');
}

function handlePercent() {
  currentInput = `${parseFloat(currentInput) / 100}`;
  updateDisplay(currentInput);
}

function handleDoubleZero() {
  if (currentInput !== '0' && !resetDisplayOnNextDigit) {
    currentInput += '00';
    updateDisplay(currentInput);
  }
}

// 3. Event Listener: Event Delegation 3ala el-parent container (slide 21)
keysContainer.addEventListener('click', (event) => {
  // Only handle clicks directly on button tags
  if (event.target.nodeName !== 'BUTTON') return;

  const target = event.target;
  const number = target.dataset.number;
  const operator = target.dataset.operator;
  const action = target.dataset.action;

  if (number !== undefined) {
    handleNumber(number);
  } else if (operator !== undefined) {
    handleOperator(operator);
  } else if (action === 'calculate') {
    calculate();
  } else if (action === 'clear') {
    handleClear();
  } else if (action === 'decimal') {
    handleDecimal();
  } else if (action === 'percent') {
    handlePercent();
  } else if (action === 'double-zero') {
    handleDoubleZero();
  }
});
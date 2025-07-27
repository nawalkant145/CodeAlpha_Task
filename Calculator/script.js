const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let lastInputWasOperator = false;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('key');

    if (value === 'C') {
      currentInput = '';
      screen.value = '';
      lastInputWasOperator = false;
    } else if (value === 'Enter' || value === '=') {
      try {
        // Evaluate safely using Function
        const result = Function('"use strict";return (' + currentInput + ')')();
        screen.value = result;
        currentInput = result.toString();
        lastInputWasOperator = false;
      } catch {
        screen.value = 'Error';
        currentInput = '';
        lastInputWasOperator = false;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput === '' && value !== '-') {
        // Don't allow operator as first char except negative.
        return;
      }
      if (lastInputWasOperator) {
        // Replace last operator
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
      lastInputWasOperator = true;
      screen.value = currentInput;
    } else if (value === '.') {
      // Prevent multiple decimals in a single number
      const parts = currentInput.split(/[\+\-\*\/]/);
      const lastNum = parts[parts.length - 1];
      if (!lastNum.includes('.')) {
        currentInput += value;
        screen.value = currentInput;
        lastInputWasOperator = false;
      }
    } else {
      // Handle numbers
      currentInput += value;
      screen.value = currentInput;
      lastInputWasOperator = false;
    }
  });
});

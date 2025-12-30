// Select the display element
const display = document.querySelector('.display');
// Select all buttons
const buttons = document.querySelectorAll('.btn');

let currentInput = "";
let previousInput = "";
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // Handle AC (Clear All)
        if (value === 'AC') {
            currentInput = "";
            previousInput = "";
            operator = null;
            updateDisplay("0");
            return;
        }

        // Handle DEL (Delete last character)
        if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || "0");
            return;
        }

        // Handle Operators (+, -, *, /, %)
        if (['+', '-', '*', '/', '%'].includes(value)) {
            if (currentInput === "") return;
            operator = value;
            previousInput = currentInput;
            currentInput = "";
            return;
        }

        // Handle Equals (=)
        if (value === '=') {
            if (previousInput === "" || currentInput === "") return;
            calculate();
            operator = null;
            return;
        }

        // Handle Numbers and Decimal
        if (currentInput.length < 10) { // Limit input length
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        case '%': result = prev % current; break;
        default: return;
    }

    currentInput = result.toString();
    updateDisplay(currentInput);
}

function updateDisplay(text) {
    display.innerText = text;
}
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}


function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}


let displayValue = '0';
let firstNumber = null;
let operator = null;
let secondNumber = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function clear() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
}

function inputNumber(number) {
    if (displayValue === '0' || operator !== null) {
        displayValue = number;
    } else {
        displayValue += number;
    }
}

function inputOperator(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);
    } else if (operator) {
        secondNumber = parseFloat(displayValue);
        firstNumber = operate(operator, firstNumber, secondNumber);
        displayValue = String(firstNumber);
    }
    operator = op;
    displayValue = '0';
}

function handleEquals() {
    if (firstNumber !== null && operator !== null) {
        secondNumber = parseFloat(displayValue);
        displayValue = String(operate(operator, firstNumber, secondNumber));
        firstNumber = null;
        operator = null;
        secondNumber = null;
    }
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        inputNumber(button.textContent);
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        inputOperator(button.textContent);
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    handleEquals();
    updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    clear();
    updateDisplay();
});

updateDisplay();


document.querySelector('.decimal').addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
});


function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

document.querySelector('.backspace').addEventListener('click', () => {
    backspace();
});


document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        inputNumber(event.key);
        updateDisplay();
    } else if (event.key === '.') {
        if (!displayValue.includes('.')) {
            displayValue += '.';
            updateDisplay();
        }
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        inputOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        handleEquals();
        updateDisplay();
    } else if (event.key === 'Escape') {
        clear();
        updateDisplay();
    }
});
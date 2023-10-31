// Calculator logic
let currentInput = '';
let operator = '';
let result = null;

function clearDisplay() {
    currentInput = '';
    operator = '';
    result = null;
    updateDisplay('0');
}

function toggleSign() {
    if (currentInput !== '') {
        currentInput = (-parseFloat(currentInput)).toString();
        updateDisplay(currentInput);
    }
}

function percentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

function appendToDisplay(value) {
    currentInput += value;
    updateDisplay(currentInput);
}

function appendOperator(op) {
    if (currentInput !== '') {
        if (operator !== '') {
            calculateResult();
        }
        operator = op;
        result = parseFloat(currentInput);
        currentInput = '';
    }
}

function appendDot() {
    if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

function calculateResult() {
    if (operator !== '' && currentInput !== '') {
        switch (operator) {
            case '+':
                result += parseFloat(currentInput);
                break;
            case '-':
                result -= parseFloat(currentInput);
                break;
            case '*':
                result *= parseFloat(currentInput);
                break;
            case '/':
                if (parseFloat(currentInput) !== 0) {
                    result /= parseFloat(currentInput);
                } else {
                    updateDisplay('Error');
                    return;
                }
                break;
        }
        currentInput = result.toString();
        operator = '';
        result = null;
        updateDisplay(currentInput);
    }
}

// Add event listeners to the document to listen for keypress events
document.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;

    // Define a mapping of keys to calculator functions
    const keyMap = {
        '0': 'appendToDisplay("0")',
        '1': 'appendToDisplay("1")',
        '2': 'appendToDisplay("2")',
        '3': 'appendToDisplay("3")',
        '4': 'appendToDisplay("4")',
        '5': 'appendToDisplay("5")',
        '6': 'appendToDisplay("6")',
        '7': 'appendToDisplay("7")',
        '8': 'appendToDisplay("8")',
        '9': 'appendToDisplay("9")',
        '.': 'appendDot()',
        '+': 'appendOperator("+")',
        '-': 'appendOperator("-")',
        '*': 'appendOperator("*")',
        '/': 'appendOperator("/")',
        '%': 'percentage()',
        'Enter': 'calculateResult()',
        '=': 'calculateResult()',
        'c': 'clearDisplay()',
    };

    // Check if the pressed key is in the keyMap
    if (key in keyMap) {
        // Call the corresponding calculator function
        eval(keyMap[key]);
    }
}


function updateDisplay(value) {
    const display = document.getElementById('display');
    const formattedValue = parseFloat(value).toLocaleString(); // Format with commas
    display.textContent = formattedValue;
}


// Initialize the calculator
clearDisplay();

let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultCalculated = false;
let numberEntered = false;
const operators = {
    '+': (a,b) => a + b,
    '-': (a,b) => a - b,
    '/': (a,b) => a / b,
    '*': (a,b) => a * b,
}

function updateDisplay() {
    document.querySelector('#result').textContent = `${firstNumber} ${operator} ${secondNumber || ''}`;
}

function operate(operator, a, b){
    if(operators.hasOwnProperty(operator)){
        return operators[operator](a,b);
    }
}

function calculateResult() {
    let resultSpan = document.querySelector('#result');
    let result;

    if (resultCalculated && (operator === '+' || operator === '-' || operator === '*' || operator === '/')) {
        firstNumber = result.toString();
        secondNumber = '';
        operator = '';
    }

    if (operator === '' || isNaN(parseFloat(secondNumber))) {
        resultSpan.innerHTML = 'Invalid input';
        setTimeout(() => {
            updateDisplay();
        }, 2000);
        return;
    }

    result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    if (result.toString().length > 15) {
        result = result.toExponential();
    }
    resultSpan.innerHTML = result;
    firstNumber = result;
    secondNumber = '';
    operator = '';
    resultCalculated = true;
}


function handleOperator(value) {
    if (value === '=' || (value in operators && secondNumber !== '')) {
        calculateResult();
        return;
    }

    if (resultCalculated) {
        resultCalculated = false;
    }

    if (operator !== '' && secondNumber !== '' && secondNumber !== '.') {
        calculateResult();
        operator = value;
        numberEntered = false;
    }

    if (operator !== '' && secondNumber === '') {
        operator = value;
    }

    if (firstNumber !== '' && firstNumber !== '.') {
        operator = value;
    }

    updateDisplay();
}


function checkLength(number, maxDigits) {
    if (number.replace('.', '', '-').length > maxDigits) {
        return false;
    }
    return true;
}

function handleNumber(value) {
    numberEntered = true;
    let currentNumber = operator === '' ? firstNumber : secondNumber;
    currentNumber += value;

    if (!checkLength(currentNumber, 15)) {
        return;
    }

    if (operator === '') {
        firstNumber = currentNumber;
    } 
    if (operator !== '') {
        secondNumber = currentNumber;
    }

    updateDisplay();
}


function handleDecimal() {
    let currentNumber = operator === '' ? firstNumber : secondNumber;
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }

    if (!checkLength(currentNumber, 15)) {
        return;
    }

    if (operator === '') {
        firstNumber = currentNumber;
    } 
    if (operator !== '') {
        secondNumber = currentNumber;
    }
    
    numberEntered = true;
    updateDisplay();   
}


function resetCalculator() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    resultCalculated = false;
    updateDisplay();
}

function storeValue(value) {
    if (!numberEntered && (value === '+' || value === '-' || value === '*' || value === '/')) {
        return;
    }

    if (value === 'C') {
        resetCalculator();
        return;
    }

    if (value === '+' || value === '-' || value === '*' || value === '/') {
        handleOperator(value);
        return;
    }

    if (value === '.') {
        handleDecimal();
        return;
    }

    if (value < '0' || value > '9') {
        return;
    }

    if (resultCalculated) {
        resetCalculator();
    }

    if (resultCalculated && operator === '') {
        resetCalculator();
    }

    handleNumber(value);
}


function deleteLastDigit(){
    if (operator === '') {
        firstNumber = firstNumber.slice(0, -1);
    } 
    if (operator !== ''){
        secondNumber = secondNumber.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    if (operator === '') {
        firstNumber = -firstNumber;
    } 
    if (operator !== ''){
        secondNumber = -secondNumber;
    }
    updateDisplay();
}

document.addEventListener(
    "keydown", (event) => {
        let keyName = event.key;

        if(/[0-9.]$/.test(keyName)){
            storeValue(keyName);
        }
        const keyMappings = {
            '+' : '+',
            '=' : '=',
            '-' : '-',
            '*' : '*',
            '/' : '/',
            'c' : 'C',
            'Enter' : calculateResult,
            'Backspace' : deleteLastDigit,
            'Shift' : toggleSign,
        };

        const mappedValue = keyMappings[keyName];

        if(mappedValue === undefined){
            return;
        }

        if (typeof mappedValue === 'function') {
            mappedValue();
            return;
        }

        storeValue(mappedValue);
    }
)

function removeSelectedButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.blur();
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        removeSelectedButtons();
    }
});
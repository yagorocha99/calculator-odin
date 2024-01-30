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

    if (operator !== '' && !isNaN(parseFloat(secondNumber))) {
        result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        resultSpan.innerHTML = result;
        firstNumber = result.toString();
        secondNumber = '';
        operator = '';
        resultCalculated = true;
    } 

    else {
        resultSpan.innerHTML = 'Invalid input';
    }
}

function handleOperator(value) {
    if (value === '=' || (value in operators && secondNumber !== '')) {
        calculateResult();
        return;
    }

    if (resultCalculated) {
        resultCalculated = false;
    }

    if (operator !== '' && secondNumber !== '') {
        calculateResult();
        operator = value;
        numberEntered = false;
    }

    if (operator !== '' && secondNumber === '') {
        operator = value;
    }

    if (firstNumber !== '') {
        operator = value;
    }

    updateDisplay();
}


function handleNumber(value) {
    numberEntered = true;
    if (operator === '') {
        firstNumber += value;
    } 

    else {
        secondNumber += value;
    }

    updateDisplay();
}

function handleDecimal() {
    let currentNumber = operator === '' ? firstNumber : secondNumber;
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }

    if (operator === '') {
        firstNumber = currentNumber;
    } 

    else {
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

    if (value >= '0' && value <= '9') {
        if (resultCalculated) {
            resetCalculator();
        }
        handleNumber(value);
    }

    if (value === '.') {
        handleDecimal();
        return;
    }

    if (resultCalculated && operator === '') {
        resetCalculator();
    }
}

function deleteLastDigit(){
    if (operator === '') {
        firstNumber = firstNumber.slice(0, -1);
    } 
    else{
        secondNumber = secondNumber.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    if (operator === '') {
        firstNumber = (parseFloat(firstNumber) * -1).toString();
    } else if (secondNumber !== '') {
        secondNumber = (parseFloat(secondNumber) * -1).toString();
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

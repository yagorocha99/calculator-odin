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
    
    if (firstNumber === '-') {
        firstNumber = '';
    }
    
    if (secondNumber === '-') {
        secondNumber = '';
    }

    document.querySelector('#result').textContent = `${firstNumber} ${operator} ${secondNumber || ''}`;
}


function operate(operator, a, b){
    
    if(operator === '/' && b === 0){
        document.querySelector('#result').innerHTML = 'Invalid input';
        setTimeout(() => {
            resetCalculator();
        }, 2000);
        return;
    }

    if(operators.hasOwnProperty(operator)){
        const result = operators[operator](a, b);
        return result;
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

    if (firstNumber !== '' && firstNumber !== '.' && firstNumber !== '-') {
        operator = value;
    }

    updateDisplay();
}

function checkLength(number, maxDigits) {
    
    if (number.startsWith('-')) {
        number = number.slice(1);
    }

    if (number.replace('.', '').length > maxDigits) {
        return false;
    }

    return true;
}

function handleNumber(value) {
    numberEntered = true;
    let currentNumber = operator === '' ? firstNumber : secondNumber;

    if (currentNumber === '-') {
        currentNumber = '';
    }

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
    
    if (currentNumber === '' || currentNumber === '-') {
        currentNumber += '0.';
    }

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
    if (operator === '' && firstNumber === '-') {
        return;
    }

    if (operator !== '' && secondNumber === '-') {
        return;
    }

    if (operator === '' && firstNumber !== '') {
        firstNumber = firstNumber.slice(0, -1);
    }

    if (operator !== '' && secondNumber !== ''){
        secondNumber = secondNumber.slice(0, -1);
    }

    updateDisplay();
}

function toggleSign() {
    let isExponential = (num) => /^-?\d+\.?\d*e[\+\-]\d+$/i.test(num);

    if (operator === '' && firstNumber !== '' && !isExponential(firstNumber) && firstNumber !== '-') {
        firstNumber = (parseFloat(firstNumber) * -1).toString();
    }

    if (operator !== '' && secondNumber !== '' && !isExponential(secondNumber) && secondNumber !== '-') {
        secondNumber = (parseFloat(secondNumber) * -1).toString();
    }
     
    if (operator === '' && isExponential(firstNumber)) {
        firstNumber = firstNumber.startsWith('-') ? firstNumber.slice(1) : '-' + firstNumber;
    }

    if (operator !== '' && isExponential(secondNumber)) {
        secondNumber = secondNumber.startsWith('-') ? secondNumber.slice(1) : '-' + secondNumber;
    }

    if (operator === '' && (firstNumber === '' || firstNumber === '-')) {
        firstNumber = '-';
    }

    if (operator !== '' && (secondNumber === '' || secondNumber === '-')) {
        secondNumber = '-';
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
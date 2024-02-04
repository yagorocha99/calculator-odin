let numberButtons = document.querySelectorAll('.bg-number');
let operatorButtons = document.querySelectorAll('.bg-operator');
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

    document.querySelector('#firstNumberDisplay').textContent = `${firstNumber}`;
    document.querySelector('#operatorDisplay').textContent = `${operator}`;
    document.querySelector('#secondNumberDisplay').textContent = `${secondNumber || ''}`;
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

    if (!isFinite(result)) {
        document.querySelector('#firstNumberDisplay').textContent = '';
        document.querySelector('#operatorDisplay').textContent = '';
        document.querySelector('#secondNumberDisplay').textContent = '';
        document.querySelector('#errorMessage').textContent = 'Maximum Value';
        setTimeout(() => {
            resetCalculator();
        }, 3000);
        return;
    }

    if (result.toString().length > 15) {
        result = result.toExponential();
    }

    document.querySelector('#firstNumberDisplay').textContent = `${firstNumber} ${operator} ${secondNumber}`;
    document.querySelector('#operatorDisplay').textContent = '=';
    document.querySelector('#secondNumberDisplay').textContent = result;
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
    document.querySelector('#errorMessage').textContent = '';
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
    let currentNumber = operator === '' ? firstNumber : secondNumber;

    let isExponential = /^-?\d+\.?\d*e[\+\-]\d+$/i.test(currentNumber);

    if (isExponential) {
        currentNumber = currentNumber.startsWith('-') ? currentNumber.slice(1) : '-' + currentNumber;
    }

    if (currentNumber !== '' && currentNumber !== '-') {
        currentNumber = (parseFloat(currentNumber) * -1).toString();
    }

    if (currentNumber === '' || currentNumber === '-') {
        currentNumber = '-';
    }

    if (operator === '') {
        firstNumber = currentNumber;
    } 
    
    if (operator !== ''){
        secondNumber = currentNumber;
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

for(let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('touchstart', function() {
      this.classList.add('text-white');
    });
  
    numberButtons[i].addEventListener('touchend', function() {
      this.classList.remove('text-white');
    });
}

for(let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('touchstart', function() {
      this.classList.add('text-white');
    });
  
    operatorButtons[i].addEventListener('touchend', function() {
      this.classList.remove('text-white');
    });
}
  
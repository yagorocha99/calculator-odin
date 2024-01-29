let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultCalculated = false;

const operators = {
    '+': (a,b) => a + b,
    '-': (a,b) => a - b,
    '/': (a,b) => a / b,
    '*': (a,b) => a * b,
}

function updateDisplay() {
    document.querySelector('#result').textContent = `${firstNumber} ${operator} ${secondNumber || ''}`;
}

function storeValue(value) {
    if (value === 'C'){
        firstNumber = '';
        secondNumber = '';
        operator = '';
        resultCalculated = false
        return;
    }
    if (value === '='){
        calculateResult();
        return;
    }
    if (value === '+' || value === '-' || value === '*' || value === '/'){
        if (operator !== '') {
            calculateResult();
        }
        operator = value;
        updateDisplay();
        return;
    }
    if (value === '.') {
        operator === '' 
            ? (firstNumber.includes('.') 
                ? null 
                : (firstNumber += '.')) 
            : (secondNumber.includes('.') 
                ? null 
                : (secondNumber += '.'));
        updateDisplay();   
        return;
    }
    if (resultCalculated && operator === '') {
        firstNumber = '';
        secondNumber = '';
        resultCalculated = false;
    }
    if (operator === '') {
        firstNumber += value;
    } 
    else {
        secondNumber += value;
    }
    updateDisplay();
    return;
}


function calculateResult() {
    let resultSpan = document.querySelector('#result');
    let result;

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

function operate(operator, a, b){
    if(operators.hasOwnProperty(operator)){
        return operators[operator](a,b);
    } {
        return 'Invalid operator'
    }
}
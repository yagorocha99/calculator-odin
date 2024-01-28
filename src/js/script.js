let firstNumber = '';
let secondNumber = '';
let operator = '';


function updateDisplay() {
    document.querySelector('#result').innerHTML = `${firstNumber} ${operator} ${secondNumber || ''}`;
}
function storeValue(value) {
    if (value === 'C'){
        firstNumber = '';
        secondNumber = '';
        operator = '';
        document.querySelector('#result').innerHTML = '';
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
    else {
        operator === '' ? (firstNumber = parseFloat(`${firstNumber}${value}`)) : (secondNumber = parseFloat(`${secondNumber}${value}`));
        updateDisplay();
        return;
    }
}

function calculateResult() {
    let resultSpan = document.querySelector('#result');
    let result;

    if (operator !== '' && !isNaN(secondNumber)) {
        result = operate(operator, firstNumber, secondNumber);
        resultSpan.innerHTML = result;
        firstNumber = result;
        secondNumber = '';
        operator = '';
    } else {
        resultSpan.innerHTML = 'Invalid input';
    }
}

function add (a, b){
    return a + b;
}

function subtract (a, b){
    return a - b;
};

function divide (a, b){
    return a / b;
};

function multiply (a, b){
    return a * b;
};

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '/':
            return divide(a, b);
        case '*':
            return multiply(a, b);
        default:
            return 'Invalid operator';
    }
}
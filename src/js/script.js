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
        resultCalculated = false;
        updateDisplay();
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
    }
}

function deleteLastDigit(){
    if (operator === '') {
        firstNumber = firstNumber.slice(0, -1);
    } else{
        secondNumber = secondNumber.slice(0, -1);
    }
    updateDisplay();
}

document.addEventListener(
    "keydown", (event) => {
        let keyName = event.key;

        if(/[0-9]$/.test(keyName)){
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

        if (keyName === '/') {
            event.preventDefault();
        }
    }
)


/*document.addEventListener(
    "keydown", (event) => {
        let keyName = event.key;

        if(/[0-9]$/.test(keyName)){
            storeValue(keyName);
        }
        else {
            const keyMappings = {
                '+' : '+',
                '=' : '=',
                '-' : '-',
                '*' : '*',
                '/' : '/',
                'c' : 'C',
                'Enter' : calculateResult,
                'Backspace' : deleteLastDigit
            };

            const mappedValue = keyMappings[keyName];

            if(mappedValue !== undefined){
                if (typeof mappedValue === 'function') {
                    mappedValue();
                } else {
                    storeValue(mappedValue);
                }
                if (keyName === '/') {
                    event.preventDefault();
                }
            }
        }
    }
)*/

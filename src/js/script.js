    let firstNumber = 0;
    let secondNumber = '';
    let operator = '';

    function storeValue(value) {
        value = String(value);
    
        if (value === 'C') {
            firstNumber = 0;
            secondNumber = '';
            operator = '';
            document.querySelector('#result').innerHTML = '';
        } else if (value === '=') {
            calculateResult();
            return;
        } else {
            if (value === '+' || value === '-' || value === '*' || value === '/') {
                if (operator !== '') {
                    calculateResult();
                }
                operator = value;
                document.querySelector('#result').innerHTML = `${firstNumber} ${operator} ${secondNumber || ''}`;
            } else {
                (operator === '') ? firstNumber = parseFloat(`${firstNumber}${value}`) : secondNumber = parseFloat(`${secondNumber}${value}`);
                document.querySelector('#result').innerHTML = `${firstNumber} ${operator} ${secondNumber || ''}`;
            }
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


const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('cancel');

// Globally variables
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;



function sendNumberValue(number) {
    // if th ecurrent value is 0 replace it , if not add number
    // const displayValue = calculatorDisplay.textContent;
    // calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;

    // Replace current display value if first value is entered
    if (awaitingNextValue === true) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if th ecurrent value is 0 replace it , if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}


// decimal function
function addDecimal() {
    // if operator pressed , don't add decimal
    if (awaitingNextValue) return;
    // if ono decimal , add one 
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


// console.log(clearBtn);
// console.log(calculatorDisplay);
// console.log(inputBtns);
// Add event listners

// Calculate first and second values deending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '%': (firstNumber, secondNumber) => firstNumber % secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};




// Operator function
function useOperator(operator) {

    const currentValue = Number(calculatorDisplay.textContent);
    //    prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        // console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        // console.log('calculation', calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // ready for the next value,store operator
    awaitingNextValue = true;
    operatorValue = operator;
}


inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset all value Display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}
// Event listener
clearBtn.addEventListener('click', resetAll);
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('cancel');

function sendNumberValue(number) {
    // if th ecurrent value is 0 replace it , if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}


// decimal function
function addDecimal() {
    // if ono decimal , add one 
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


// console.log(clearBtn);
// console.log(calculatorDisplay);
// console.log(inputBtns);
// Add event listners


inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset Display
function resetAll() {
    calculatorDisplay.textContent = '0';
}
// Event listener
clearBtn.addEventListener('click', resetAll);
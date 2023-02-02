// this code will:
// get user input
// the result should be mutable as it will change dynamically on the page
    // the input is always a number
// display what happened ex: 1 + 3 + 5 - 100

// declare global variables
let result = 0;
let tempResult = 0;
let history = []


function create_history(operand, value) {
    history.push(`${operand}`, value)
}
// user input
let uinpt = document.getElementById('input-number')

function add() {
    let value = Number(uinpt.value)
    result = tempResult + value
    tempResult = result
    create_history('+', value)
    show_result(history.join(' '), result)
}

function subtract() {
    let value = Number(uinpt.value)
    result = tempResult - value
    tempResult = result
    create_history('-', value)
    show_result(history.join(' '), result)

}

function multiply() {
    let value = Number(uinpt.value)
    
    if (value == 0) {
        show_result('You can not multiply with zero!', 0)
    } else if (tempResult === 0) {
        tempResult = 1
        result = value * tempResult
        tempResult = result
        create_history('*', value)
        show_result(history.join(' '), result)
    } else {
        result = tempResult * value
        tempResult = result
        create_history('*', value)
        show_result(history.join(' '), result)
    }
}

function divide() {
    let value = Number(uinpt.value)
    if (value == 0) {
        show_result('You can not divide by zero!', 0)
    } else if (tempResult === 0) {
        tempResult = 1
        result = value / tempResult
        tempResult = result
        create_history('/', value)
        show_result(history.join(' '), result)
    } else {
        result = tempResult / value
        tempResult = result
        create_history('/', value)
        show_result(history.join(' '), result)
    }
}

// btn-add
let btnAdd = document.getElementById('btn-add')
btnAdd.addEventListener('click', add)

// btn-subtract
let btnSubtract = document.getElementById('btn-subtract')
btnSubtract.addEventListener('click', subtract)

// btn-multiply
let btnMultiply = document.getElementById('btn-multiply')
btnMultiply.addEventListener('click', multiply)

// btn-divide
let btnDivide = document.getElementById('btn-divide')
btnDivide.addEventListener('click', divide)

// get result
function show_result(history, result_value) {
    MAX_LENGTH = 40
    // there's no need to have the first element with a plus sign as a prefix, looks like bad design
    let displayHistory;
    if (history[0] === '+' || history[0] === '*' || history[0] === '/') {
        displayHistory = history.slice(1)
    } else {
        displayHistory = history
    }

    if (displayHistory.length > MAX_LENGTH) {
        displayHistory = displayHistory.slice(-MAX_LENGTH)
    }
    

    document.getElementById('current-calculation').textContent = `${displayHistory}`;
    document.getElementById('current-result').textContent = `${result_value}`;
    console.log(history)
}

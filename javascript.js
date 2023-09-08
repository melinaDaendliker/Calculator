const equal = document.querySelector('#equal');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const deleteButtons = document.querySelectorAll('.del');
const calculationDisplay = document.querySelector('.calculation');
const result = document.querySelector('.solution');


// default values
let operant1 = "";
let operant2 = "";
let oper = "";
let res = 0;
let display = "";


// + - function
// percentage function
// . function
// press longer calculations than 2 numbers storgage and stuff
// and what if we add operator directly before getting new number storage needs to be different 
// division 0 error message
// add computer kyes to use it also 
// max length of number 
// round display for division
// make code nicer more readable 

deleteButtons.forEach(del => del.addEventListener('click', (e) => {
    del.classList.add('opPressed');
    del.addEventListener('transitionend', removeTransition);
    if (e.target.id === "deleteAll") {
        deleteAll();
    } else if (e.target.id === 'delete') {
        deleteNumber();
    }
}))


operators.forEach(operator => operator.addEventListener("click", (e) => {
    oper = e.target.id;
    operator.classList.add('opPressed');
    operator.addEventListener('transitionend', removeTransition);
    display += displayConversion(oper);
    calculationDisplay.textContent = display;
}));


numbers.forEach(number => number.addEventListener("click", (e) => {
    num = e.target.id;
    calculationDisplay.classList.remove('calculationResult');
    result.textContent = "";
    number.classList.add('opPressed');
    number.addEventListener('transitionend', removeTransition);
    if (oper===""){
        operant1 += num;
        display += num;
        calculationDisplay.textContent = display;
    } else if (oper!="") {
        operant2 += num;
        display += num;
        calculationDisplay.textContent = display;
    } 
}));

equal.addEventListener('click', (e) => {
    operant1 = Number(operant1);
    operant2 = Number(operant2);
    res = calculation(oper,operant1, operant2);
    result.textContent = res;
    calculationDisplay.classList.add('calculationResult')
    
    // might change later when using longer calculations
    operant1 = "";
    operant2 = "";
    oper = "";
    display = ""
    res = "";
    
    
})


function deleteNumber(){
    if (oper==="" && operant2==="") {
        operant1 = operant1.slice(0, -1);
        display = display.slice(0, -1);
    } else if (operant2==="" && oper!="") {
        oper = "";
        display = display.trimEnd().slice(0,-1);
    } else if (operant2!=""){
        operant2 = operant2.slice(0, -1);
        display = display.slice(0, -1);
    }
    calculationDisplay.textContent = display
}

function deleteAll(){
    operant1 = "";
    operant2 = "";
    oper = "";
    display = ""
    res = "";
    result.textContent = "";
    calculationDisplay.textContent = "";
    calculationDisplay.classList.remove('calculationResult');
    //console.log(operant1, operant2, oper, display, res);
}


function displayConversion(oper) {
    switch(oper) {
        case 'plus' : return ' + ';
        case 'minus' : return ' - ';
        case 'multiply' : return ' × '
        case 'divide' : return ' ÷ ';
    };

}

function calculation(operant, a, b){
    switch(operant) {
        case 'plus' : return add(a,b);
        case 'minus' : return subtract(a,b);
        case 'multiply' : return multiply(a,b);
        case 'divide' : return divide(a,b);
    };
}

function add(a,b) {
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b 
}

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('opPressed');
  }
  
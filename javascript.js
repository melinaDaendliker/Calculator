const equal = document.querySelector('#equal');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');

// default values
let operant1 = [];
let operant2 = [];
let oper = "";
let res = 0;

// display the number that is typed
// display the operator
// display the new number
// display the result 



// delet functions 
// + - function
// percentage function
// . function
// press longer calculations than 2 numbers storgage and stuff
// division 0 error message
// add computer kyes to use it also 



operators.forEach(operator => operator.addEventListener("click", (e) => {
    oper = e.target.id;
    operator.classList.add('opPressed');
    operator.addEventListener('transitionend', removeTransition);
}));


numbers.forEach(number => number.addEventListener("click", (e) => {
    num = e.target.id;
    number.classList.add('opPressed');
    number.addEventListener('transitionend', removeTransition);
    if (oper===""){
        operant1.push(num);
    } else if (oper!="") {
        operant2.push(num);
    } 
}));

equal.addEventListener('click', (e) => {
    operant1 = Number(operant1.join(""));
    operant2 = Number(operant2.join(""));
    res = calculation(oper,operant1, operant2);
    console.log(res);
    operant1 = [];
    operant2 = [];
    oper = "";

})


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
  
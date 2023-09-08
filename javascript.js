const equal = document.querySelector('#equal');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op');
const deleteButtons = document.querySelectorAll('.del');
const calculationDisplay = document.querySelector('.calculation');
const result = document.querySelector('.solution');
const extras = document.querySelectorAll('.extra');


// default values
let operant1 = "";
let operant2 = "";
let oper = "";
let res = 0;
let display = "";

// max length of number 

// round display for division

// press longer calculations than 2 numbers storgage and stuff
// and what if we add operator directly before getting new number storage needs to be different 

// add computer kyes to use it also 

// make code nicer more readable (get function to evaluate which operant is needed)

extras.forEach(extra => extra.addEventListener('click', (e) => {
    extra.classList.add('opPressed');
    extra.addEventListener('transitionend', removeTransition);
    if(e.target.id === 'plusMinus') {
        changePlusMinus();
    } else if (e.target.id === 'dot') {
        addDot();
    }
}))

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
    console.log(operant1);
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

function changePlusMinus(){
    if (operant2 === ""){
        if(Number(operant1>0)){
            operant1 = -operant1;
        } 
        else if(Number(operant1<0)){
            operant1 = -1 * operant1;
        }
        display = operant1;

    } else if (operant2 != "") {
        if(Number(operant2>0)){
            operant2 = -operant2;
        } 
        else if(Number(operant2<0)){
            operant2 = -1 * operant2;
        }
        display = operant1 + displayConversion(oper) + operant2;
    } //else if (res != "") {
         // if result not 0
        // change the sing 
    //}
   
    calculationDisplay.textContent = display;
}

function addDot(){
    if(operant2=== ''){
        if(operant1.indexOf('.')>-1 ) return '';
        operant1 += '.';
        display += '.';
    } else if (operant2!= ''){
        if(operant2.indexOf('.')>-1) return '';
        operant2 += '.';
        display += '.';
    }
    calculationDisplay.textContent = display
}




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
    calculationDisplay.textContent = display;
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
}

// remove that not needed when given the right names 
function displayConversion(oper) {
    switch(oper) {
        case 'plus' : return ' + ';
        case 'minus' : return ' - ';
        case 'multiply' : return ' × '
        case 'divide' : return ' ÷ ';
        case 'power'  : return '^2';
    };

}

// change this to new names
function calculation(operant, a, b){
    switch(operant) {
        case 'plus' : return add(a,b);
        case 'minus' : return subtract(a,b);
        case 'multiply' : return multiply(a,b);
        case 'divide' : return divide(a,b);
        case  'power' : return power(a)
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
    if (a==0){
        return 'ERROR'
    }
    return a / b 
}

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('opPressed');
  }

function power(a) {
    return a**2;
}
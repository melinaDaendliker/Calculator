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
let intermediateResult = 0;
let display = "";
let numOperators = 0;
let equalPressed = 0;

// max length of number 
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
    numOperators ++;
    operator.classList.add('opPressed');
    operator.addEventListener('transitionend', removeTransition); 
    if (numOperators>1) {
        res = calculation(oper,Number(operant1), Number(operant2));
        oper = e.target.id; 
        operant1 = res;
        operant2 = '';
        display = res + ' ' + oper + ' ';
    } else if (equalPressed==1 && numOperators==1){
        oper = e.target.id;  
        operant1 = intermediateResult;
        display = intermediateResult + ' ' + oper + ' ';
    } else if (numOperators==1){
        oper = e.target.id;  
        display += ' ' + oper + ' ';
    }
    intermediateResult = 0;
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
    res = calculation(oper,Number(operant1), Number(operant2));
    intermediateResult = res;
    result.textContent = res;
    calculationDisplay.classList.add('calculationResult')
    
    operant1 = "";
    operant2 = "";
    oper = "";
    display = ""
    res = "";
    numOperators = 0;
    equalPressed = 1;
})

function changePlusMinus(){
    if (intermediateResult!=0) {
        intermediateResult = -1* intermediateResult;
        console.log(intermediateResult);
     } else if (operant2 === ""){
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
        display = operant1 + ' ' + oper + ' ' + operant2;
    } 
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
    numOperators = 0;
    equalPressed = 0;
    result.textContent = "";
    calculationDisplay.textContent = "";
    calculationDisplay.classList.remove('calculationResult');
}

function calculation(operant, a, b){
    switch(operant) {
        case '+' : return add(a,b);
        case '-' : return subtract(a,b);
        case '×' : return multiply(a,b);
        case '÷' : return divide(a,b);
        case  '^2' : return power(a)
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
    return (a / b).toFixed(4); 
}

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('opPressed');
  }

function power(a) {
    return a**2;
}
const buttons = document.querySelectorAll('button');
const calculationDisplay = document.querySelector('.calculation');
const result = document.querySelector('.solution');
const extras = document.querySelectorAll('.extra');


// default values
let operant1 = '';
let operant2 = '';
let oper = '';
let res = 0;
let intermediateResult = 0;
let display = '';
let numOperators = 0;
let equalPressed = 0;
let keysUsed = false; 

// fix the decimal problem // round all numbers to the amount of digits added
// max length of number // from 11 digits we show e thing 

window.addEventListener('keydown' , (e) => {
    const key = document.querySelectorAll(`button[data-key="${e.key}"]`)
    keysUsed = true
    let keyPressed = e.key;
    let buttonPressed = key[0];
    if (keyPressed=='/'){
        keyPressed = '÷'

    } else if (keyPressed=='*'){
        keyPressed = '×'}
    makeDecision(e, keyPressed, buttonPressed);
    keysUsed = false
});


buttons.forEach(button => button.addEventListener('click', (e) => {
    key = e.target.id;
    makeDecision(e,key,button);
}))


function makeDecision(e, key, button) {
    //console.log(button);
    //console.log(key)
    switch(key) {
        case '=' :
            equalButton();
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7': 
        case '8':
        case '9': 
            numberButtons(key, button);
            break;
        case '+' :
        case '-' :
        case '×' :
        case '÷' :
        case '^2':
            operatorButton(e,button);
            break;
        case 'Delete': 
        case 'Backspace':
            deleteButton(key, button);
            break;
        case '.':
        case 'plusMinus':
            extraOperations(key, button);
    };
}

function extraOperations(key, button){
    button.classList.add('opPressed');
    button.addEventListener('transitionend', removeTransition);
    if(key === 'plusMinus') {
        changePlusMinus();
    } else if (key === '.') {
        addDot();
    }
}

function deleteButton(key, button){
    button.classList.add('opPressed');
    button.addEventListener('transitionend', removeTransition);
    if (key === 'Delete') {
        deleteAll();
    } else if (key === 'Backspace') {
        deleteNumber();
    }
}

function operatorButton(e,operator){
    numOperators ++;
    operator.classList.add('opPressed');
    operator.addEventListener('transitionend', removeTransition); 
    if (numOperators>1) {
        res = calculation(oper,Number(operant1), Number(operant2));
        oper = getOperant(e); 
        operant1 = res;
        operant2 = '';
        display = res + ' ' + oper + ' ';
    } else if (equalPressed==1 && numOperators==1){        
        oper = getOperant(e);  
        operant1 = intermediateResult;
        display = intermediateResult + ' ' + oper + ' ';
    } else if (numOperators==1){
        oper = getOperant(e);  
        display += ' ' + oper + ' ';
    }
    intermediateResult = 0;
    calculationDisplay.textContent = display;
}

function equalButton(){
    res = calculation(oper,Number(operant1), Number(operant2));
    intermediateResult = res;
    result.textContent = res;
    calculationDisplay.classList.add('calculationResult')
    resetValues();
    equalPressed = 1;
}

function numberButtons(num, number) {
    calculationDisplay.classList.remove('calculationResult');
    result.textContent = '';
    number.classList.add('opPressed');
    number.addEventListener('transitionend', removeTransition);
    if (oper===''){
        operant1 += num;
        display += num;
        calculationDisplay.textContent = display;
    } else if (oper!='') {
        operant2 += num;
        display += num;
        calculationDisplay.textContent = display;
    } 
}

function changePlusMinus(){
    if (intermediateResult!=0) {
        intermediateResult = -1* intermediateResult;
        display = intermediateResult;
     } else if (operant2 === ''){
        operant1 = -1 * operant1;
        display = operant1;
     } else if (operant2 != '') {
        operant2 = -1 * operant2;
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
    if (oper==='' && operant2==='') {
        operant1 = operant1.slice(0, -1);
        display = display.slice(0, -1);
    } else if (operant2==='' && oper!='') {
        oper = '';
        numOperators = 0;
        display = display.trimEnd().slice(0,-1);
    } else if (operant2!=''){
        operant2 = operant2.slice(0, -1);
        display = display.slice(0, -1);
    }
    calculationDisplay.textContent = display;
}

function deleteAll(){
    resetValues()
    equalPressed = 0;
    intermediateResult = 0;
    result.textContent = '';
    calculationDisplay.textContent = '';
    calculationDisplay.classList.remove('calculationResult');
}

function resetValues() {
    operant1 = '';
    operant2 = '';
    oper = '';
    display = ''
    res = '';
    numOperators = 0;
}

function calculation(operant, a, b){
    switch(operant) {
        case '+' : return addition(a,b);
        case '-' : return subtract(a,b);
        case '×' : return multiply(a,b);
        case '÷' : return divide(a,b);
        case '^2' : return power(a)
    };
}

function getOperant(e) {
    if (keysUsed){
        let thing = e.key;
        if (thing=='/'){
            return '÷';
        }else if (thing=='*'){
            return '×';
        }else return thing;
     } else {
         return e.target.id;
     }
}

function addition(a,b) {
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
    return a / b; 
}

function power(a) {
    return a**2;
}

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('opPressed');
  }
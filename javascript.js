//const equal = document.querySelector('#equal');
//const plus = document.querySelector('#plus');
//console.log(plus);

const operators = document.querySelectorAll('.op');
operators.forEach(operator => operator.addEventListener("click", (e) => {
    console.log(calculation(e,2,4));
    operator.classList.add('opPressed');
    operator.addEventListener('transitionend', removeTransition);
 
        
    
}));




function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('opPressed');
  }
  

function calculation(e, a, b){
    let oper = e.target.id;
    switch(oper) {
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

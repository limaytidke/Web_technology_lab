const display = document.querySelector('.display');
let operator;

let one = document.querySelector('#one');
let two = document.querySelector('#two');
let three = document.querySelector('#three');
let four = document.querySelector('#four');
let five = document.querySelector('#five');
let six = document.querySelector('#six');
let seven = document.querySelector('#seven');
let eight = document.querySelector('#eight');
let nine = document.querySelector('#nine');
let plus = document.querySelector('#plus');
let minus = document.querySelector('#minus');
let mul = document.querySelector('#mul');
let divide = document.querySelector('#divide');

let clear = document.querySelector('#clear');
let equal = document.querySelector('#equal');

zero.addEventListener("click",function() { displayInput(zero.innerText); });
one.addEventListener("click",function() { displayInput(one.innerText); });
two.addEventListener("click",function() { displayInput(two.innerText); });
three.addEventListener("click",function() { displayInput(three.innerText); });
four.addEventListener("click",function() { displayInput(four.innerText); });
five.addEventListener("click",function() { displayInput(five.innerText); });
six.addEventListener("click",function() { displayInput(six.innerText); });
seven.addEventListener("click",function() { displayInput(seven.innerText); });
eight.addEventListener("click",function() { displayInput(eight.innerText); });
nine.addEventListener("click",function() { displayInput(nine.innerText); });

plus.addEventListener("click",function() { 
    operator = plus.innerText;
    displayInput(operator); 
});
minus.addEventListener("click",function() { 
    operator = minus.innerText;
    displayInput(operator); 
});
mul.addEventListener("click",function() { 
    operator = mul.innerText;
    displayInput(operator); 
});
divide.addEventListener("click",function() { 
    operator = divide.innerText;
    displayInput(operator); 
});

clear.addEventListener("click",function() { clearAll() });
equal.addEventListener("click",function() { calcAll() });

function displayInput(value) {
    display.innerText += value;
}

function clearAll() {
    display.innerText = '';
}

function calcAll() {
    let values = display.innerText.split(operator);
    const num1 = parseInt(values[0],10);
    const num2 = parseInt(values[1],10);
    
    if (operator == '+') {
        display.innerText = num1 + num2;
    }
    else if (operator == '-') {
        display.innerText = num1 - num2;
    }
    else if (operator == '*') {
        display.innerText = num1 * num2;
    }
    else if (operator == '/') {
        if (num2 == 0) { display.innerText = "♾️"; }
        else { display.innerText = num1 / num2; }
    }
}
   

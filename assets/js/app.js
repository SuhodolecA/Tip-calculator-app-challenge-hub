const billInput = document.querySelector('.calculator-input-section__bill-display-input');
const peopleNum = document.querySelector('.calculator-input-section__people-display-input');
const customInput = document.querySelector('.calculator-input-section__tip-set__values-value__custom');
const tipsValues = document.querySelectorAll('.calculator-input-section__tip-set__values-value__radio');
const outputs = document.querySelectorAll('.calculator-output-section__item-input');

// === event listeners ===
billInput.addEventListener('blur',(e) => {
    catchError(e.target);
    checkInputVal(e.target);
    if(checkValidValues()) {
        fillOutputs(calculateAmount());
    }
});

billInput.addEventListener('mousedown',(e) => {
    clearInput(e);
});

billInput.addEventListener('keydown',(e) => {
    if(e.keyCode === 13) {
        e.target.blur();
    }
});

peopleNum.addEventListener('blur',(e) => {
    checkInputVal(e.target);
    catchError(e.target);
    if(checkValidValues()) {
        fillOutputs(calculateAmount());
    }
});

peopleNum.addEventListener('mousedown',(e) => {
    clearInput(e);
});

peopleNum.addEventListener('keydown',(e) => {
    if(e.keyCode === 13) {
        e.target.blur();
    }
});

customInput.addEventListener('blur',(e) => {
    checkInputVal(e.target);
    resetActiveRadio(tipsValues);
    if(checkValidValues()) {
        fillOutputs(calculateAmount());
    }
});

customInput.addEventListener('focus',(e) => {
    clearInput(e);
});

customInput.addEventListener('keydown',(e) => {
    if(e.keyCode === 13) {
        e.target.blur();
    }
});

tipsValues.forEach(radio => radio.addEventListener('click', () => {
    clearCustomInput();
    if(checkValidValues()) {
        fillOutputs(calculateAmount());
    }
}));

// === / event listeners ===


// ==== helper functions === 
function checkInputVal(obj) {
    const value = obj.value;
    return !isNaN(value) && !(value < 0) && value != 0;
  }

function clearInput(obj) {
    obj.target.value = '';
  }

function resetActiveRadio(obj) {
    for(let key of obj) {
        console.log(key.checked = false);
    }
}

function clearCustomInput() {
    customInput.value = '';
}

function catchError(obj) {
    if (obj.value === '0') {
        obj.parentNode.dataset.error = "Can't be zero";
        obj.parentNode.classList.add('error');
    } else if(!checkInputVal(obj)) {
        obj.parentNode.dataset.error = "Invalid value";
        obj.parentNode.classList.add('error');
    } else {
        obj.parentNode.classList.remove('error');
    }
}

function calculateAmount() {
    const bill = parseFloat(billInput.value);
    console.log('bill', bill)
    const numOfPeople = parseFloat(peopleNum.value);
    const tipValue = parseFloat(customInput.value || getTipValue(tipsValues));
    const tipAmount = (bill / 100 * tipValue / numOfPeople).toFixed(2);
    const total = (bill / 100 * tipValue).toFixed(2);
    console.log('[tipAmount, total]',[tipAmount, total]);
    if (tipAmount >= 10000000 || total >= 10000000) {
        return ['Error', 'Error']
    } else {
        return [tipAmount, total];
    }
  }
// -- todo
  function checkValidValues() {
    let bill = parseFloat(billInput.value);
    console.log('bill', bill);
    let people = parseFloat(peopleNum.value);
    console.log('people', people);
    let tips = parseFloat(getTipValue(tipsValues) || customInput.value);
    console.log('tips', tips);
    return Boolean(bill && people && tips)
    }

    function fillOutputs(arr) {
        if(arr) {
            outputs[0].value = `$${arr[0]}`;
            outputs[1].value = `$${arr[1]}`;
        }
  }

  
function getTipValue(obj) {
    let tipValue;
    obj.forEach(element => {
        if(element.checked) {
            tipValue = element.id;
        }
    });
    console.log('tipValue', tipValue)
    return tipValue;
  }
// ==== / helper functions === 
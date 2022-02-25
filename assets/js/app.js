const billInput = document.querySelector(".calculator-input-section__bill-display-input");
      peopleNum = document.querySelector(".calculator-input-section__people-display-input");
      customInput = document.querySelector(".calculator-input-section__tip-set__values-value__custom");
      tipsValues = document.querySelectorAll(".calculator-input-section__tip-set__values-value__radio");
      outputs = document.querySelectorAll(".calculator-output-section__item-input");
      resetBtn = document.querySelector(".calculator-output-section__reset-btn");

// === event listeners ===
billInput.addEventListener("blur", (e) => {
  catchError(e.target);
  checkInputVal(e.target);
  if (checkValidValues(e.target)) {
    fillOutputs(calculateAmount());
  }
});

billInput.addEventListener("mousedown", (e) => {
  clearInput(e);
});

billInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) e.target.blur();
});

peopleNum.addEventListener("blur", (e) => {
  checkInputVal(e.target);
  catchError(e.target);
  if (checkValidValues()) {
    fillOutputs(calculateAmount());
  }
});

peopleNum.addEventListener("mousedown", (e) => {
  clearInput(e);
});

peopleNum.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) e.target.blur();
});

customInput.addEventListener("blur", (e) => {
  checkInputVal(e.target);
  resetActiveRadio(tipsValues);
  if (checkValidValues()) {
    fillOutputs(calculateAmount());
  }
});

customInput.addEventListener("focus", (e) => {
  clearInput(e);
});

customInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) e.target.blur();
});

tipsValues.forEach((radio) =>
  radio.addEventListener("click", () => {
    clearCustomInput();
    if (checkValidValues()) {
      fillOutputs(calculateAmount());
    }
  })
);

resetBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    resetBtn.classList.remove("active");
    outputs.forEach((output) => (output.value = "$0.00"));
    tipsValues.forEach((val) => (val.checked = false));
    billInput.value = "";
    peopleNum.value = "";
    resetBtn.disabled = true;
  }
});
// === / event listeners ===

// ==== helper functions ===
function checkInputVal(obj) {
  const value = obj.value;
  console.log('!isNaN(value) && !(value < 0) && value != 0', !isNaN(value) && !(value < 0) && value != 0)
  return !isNaN(value) && !(value < 0) && value != 0;
}

function clearInput(obj) {
  obj.target.value = "";
}

function resetActiveRadio(obj) {
  for (let key of obj) {
    key.checked = false;
  }
}

function clearCustomInput() {
  customInput.value = "";
}

function catchError(obj) {
  if (obj.value === "0") {
    obj.parentNode.dataset.error = "Can't be zero";
    obj.parentNode.classList.add("error");
  } else if (!checkInputVal(obj)) {
    obj.parentNode.dataset.error = "Invalid value";
    obj.parentNode.classList.add("error");
  } else {
    obj.parentNode.classList.remove("error");
  }
}
// !!!!!!!!!!!!!!!!!!!!!! resolve rounded problem!!!
// !!!!!!!!!!!!!!!!!!!!!! bug with negative numbers in inputs!!!
function calculateAmount() {
  const bill = parseFloat(billInput.value); 
  console.log('bill', bill);
  const numOfPeople = parseFloat(peopleNum.value);
  console.log('numOfPeople', numOfPeople);
  const tipValue = parseFloat(customInput.value || getTipValue(tipsValues));
  console.log('tipValue', tipValue);
  const tipAmount = (((bill / 100) * tipValue) / numOfPeople).toFixed(2);
  console.log('tipAmount', tipAmount);
  const total = ((bill / 100) * tipValue).toFixed(2);
  console.log('total', total);
  if (tipAmount >= 10000000 || total >= 10000000) {
    return ["Error", "Error"];
  } else {
    return [tipAmount, total];
  }
}
// -- todo
function checkValidValues() {
  const bill = parseFloat(billInput.value);
  let people = parseFloat(peopleNum.value);
  let tips = parseFloat(getTipValue(tipsValues) || customInput.value);
  if (bill <=0 || people <=0 || tips <= 0) return false;
  return Boolean(bill && people && tips);
}

function fillOutputs(arr) {
  if (arr) {
    outputs[0].value = `$${arr[0]}`;
    outputs[1].value = `$${arr[1]}`;
    resetBtn.classList.add("active");
    resetBtn.disabled = false;
  }
}

function getTipValue(obj) {
  let tipValue;
  obj.forEach((element) => {
    if (element.checked) {
      tipValue = element.id;
    }
  });
  return tipValue;
}
// ==== / helper functions ===

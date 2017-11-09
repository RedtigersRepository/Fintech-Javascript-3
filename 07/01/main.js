/* eslint-disable linebreak-style */

const keyCode = {
  BACKSPACE: 8,
  F1: 112,
  F12: 123,
  F5: 116,
  RIGHTARROW: 39,
  LEFTARROW: 37
};

function replace(str, index, chr) {
  if (index > str.length - 1) { return str; }
  return str.substr(0, index) + chr + str.substr(index + 1);
}

const inputField = document.querySelector('.phone-field__input');
const callButton = document.querySelector('.call');
let currentCursorPosition = 3;

inputField.addEventListener('focus', onFocus);
inputField.addEventListener('keydown', onInputKeyDown);

function onFocus(event) {
  event.preventDefault();
  if (!inputField.value) {
    inputField.value = '+7(___)-___-__-__';
  }
  inputField.selectionStart = currentCursorPosition;
  inputField.selectionEnd = currentCursorPosition;
}

function addNumber(key) {
  let currentPhone = inputField.value.slice();
  const cursorPos = inputField.selectionStart;

  for (let i = cursorPos; i < currentPhone.length; i++) {
    if (currentPhone[i] === '_') {
      currentPhone = replace(currentPhone, i, key);
      currentCursorPosition = i + 1;
      break;
    }
  }

  return currentPhone;
}

function deleteNumber() {
  let currentPhone = inputField.value.slice();
  const cursorPos = inputField.selectionStart;

  for (let i = cursorPos - 1; i >= 2; i--) {
    console.log(currentPhone[i]);
    if (currentPhone[i] >= '0' && currentPhone[i] <= '9') {
      currentPhone = replace(currentPhone, i, '_');
      currentCursorPosition = i;
      break;
    }
  }

  return currentPhone;
}

function renderCallButton() {
  if (inputField.value.indexOf('_') === -1) {
    callButton.textContent = `Позвонить на ${inputField.value}`;
    callButton.style.display = 'block';
  } else {
    callButton.style.display = 'none';
  }
}

function onInputKeyDown(event) {
  if (event.keyCode !== keyCode.RIGHTARROW && event.keyCode !== keyCode.LEFTARROW && event.keyCode !== keyCode.F5) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (event.keyCode === keyCode.BACKSPACE) {
    inputField.value = deleteNumber();
    inputField.selectionStart = currentCursorPosition;
    inputField.selectionEnd = currentCursorPosition;
  }

  if (/\d/.test(event.key) && !(event.keyCode >= keyCode.F1 && event.keyCode <= keyCode.F12)) {
    inputField.value = addNumber(event.key);
    inputField.selectionStart = currentCursorPosition;
    inputField.selectionEnd = currentCursorPosition;
  }

  renderCallButton();
}

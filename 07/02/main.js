/* eslint-disable linebreak-style */

const buttonDouble = document.querySelector('.doubleClick-button');
const clickList = document.querySelector('.click-counter');

buttonDouble.addEventListener('click', clickHandler(onClick, onDoubleClick, 200));

function clickHandler(onClick, onDblClick, delay) {
  let timeout = null;

  delay = delay || 400;
  return function(event) {
    if (!timeout) {
      timeout = setTimeout(function() {
        onClick(event);
        timeout = null;
      }, delay);
    } else {
      timeout = clearTimeout(timeout);
      onDblClick(event);
    }
  };
}

function onClick(event) {
  let date = new Date();

  renderList('1xClick:  ' + date.toString());
}

function onDoubleClick(event) {
  let date = new Date();

  renderList('2xClick:  ' + date.toString());
}

function renderList(str) {
  clickList.innerHTML += `<li><a href="">${str}</a></li>`;
}

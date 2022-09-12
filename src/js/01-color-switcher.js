const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('[data-start]'),
  btnStopEl: document.querySelector('[data-stop]'),
};
let interval = null;

refs.btnStartEl.addEventListener('click', changeColorBody);
refs.btnStopEl.addEventListener('click', stopChangeColor);

function changeColorBody(e) {
  if (interval) {
    return;
  }
  interval = setInterval(changeColor, 1000);
  refs.btnStartEl.setAttribute('disabled', 'true');
}

function changeColor(e) {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function stopChangeColor(e) {
  clearInterval(interval);
  interval = null;
  refs.btnStartEl.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

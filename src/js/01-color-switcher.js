function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let timerId = null;

buttonStop.setAttribute("disabled", "disabled");

buttonStart.addEventListener("click", () => {
   timerId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
      buttonStart.setAttribute("disabled", "disabled");
      buttonStop.removeAttribute("disabled");
   }, 1000);
 });


 buttonStop.addEventListener("click", () => {
   clearInterval(timerId);
   buttonStart.removeAttribute("disabled");
   buttonStop.setAttribute("disabled", "disabled");
 });



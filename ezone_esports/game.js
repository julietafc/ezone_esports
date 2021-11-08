"use strict";
window.addEventListener("load", startGame);
let btnReflects, taskContainer, pCounter;
let circleClicked = false;
let clickTime = 0;

function startGame() {
  btnReflects = document.querySelector(".btn-reflects");
  taskContainer = document.querySelector(".task_container");
  pCounter = document.querySelector(".counter");
  btnReflects.addEventListener("click", startCounting);
}

function startCounting() {
  btnReflects.classList.add("hidden");
  pCounter.classList.add("visible");
  let i = 3;
  timer(i);
}

function timer(i) {
  if (i >= 0) {
    pCounter.textContent = i;
    setTimeout(() => {
      i--;
      timer(i);
    }, 900);
  } else {
    setTimeout(() => {
      pCounter.classList.remove("visible");
      taskContainer.classList.add("visible");
      selectCircleColor();
    }, 300);
  }
}

function selectCircleColor() {
  const colors = ["green", "blue", "red"];
  const index = Math.floor(Math.random() * 3);
  let x = index + 1;
  if (x > 2) {
    x = 0;
  }
  taskContainer.querySelector("p span").style.color = colors[x];
  taskContainer.querySelector("p span").textContent = colors[index];
  startTimer();
  document.querySelector(`.circle.${colors[index]}`).addEventListener("click", () => {
    circleClicked = true;
  });
}

//time functions
function startTimer() {
  // Checking if game is paused
  if (circleClicked === false) {
    setTimeout(plusTime, 10);
  } else {
    alert(`take you ${clickTime / 1000} seconds`);
  }
}

function plusTime() {
  clickTime = clickTime + 10;
  startTimer();
}

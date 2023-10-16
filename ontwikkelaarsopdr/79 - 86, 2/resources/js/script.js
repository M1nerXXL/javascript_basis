"use strict";

//Define variables
let goal = 0;
const gridNumbers = [0, 0, 0, 0, 0, 0, 0, 0];
const gridSelected = [false, false, false, false, false, false, false, false];
let total = 0;

const goalDisplay = document.querySelector(".goal");
const gridNumbersDisplay = [
  document.querySelector(".grid-container__item-0"),
  document.querySelector(".grid-container__item-1"),
  document.querySelector(".grid-container__item-2"),
  document.querySelector(".grid-container__item-3"),
  document.querySelector(".grid-container__item-4"),
  document.querySelector(".grid-container__item-5"),
  document.querySelector(".grid-container__item-6"),
  document.querySelector(".grid-container__item-7"),
];
const submit = document.querySelector(".button-container__button-submit");
const skip = document.querySelector(".button-container__button-skip");

//Set numbers immediately
resetGame();

//Selectable grid numbers
for (let i = 0; i < 8; i++) {
  gridNumbersDisplay[i].addEventListener("click", function () {
    if (!gridSelected[i]) {
      gridSelected[i] = true;
      gridNumbersDisplay[i].style.border = "5px solid black";
    } else {
      gridSelected[i] = false;
      gridNumbersDisplay[i].style.border = "none";
    }
  });
}

//When submit is pressed, check answer
submit.addEventListener("click", function () {
  total = 0;
  for (let i = 0; i < 8; i++) {
    if (gridSelected[i]) total += gridNumbers[i];
  }

  if (total == goal) {
    //Right answer
    console.log(`${total} is correct.`);
    submit.style.backgroundColor = "green";
    setTimeout(() => {
      submit.style.backgroundColor = "white";
    }, 1000);
    resetGame();
  } else {
    //Wrong answer
    console.log(`${total} is incorrect.`);
    submit.style.backgroundColor = "red";
    setTimeout(() => {
      submit.style.backgroundColor = "white";
    }, 1000);
  }
});

//When skip is pressed, reset game
skip.addEventListener("click", resetGame);

//Reset game
function resetGame() {
  //Set goal
  goal = Math.trunc(Math.random() * 30 + 10);
  goalDisplay.textContent = goal;

  for (let i = 0; i < 8; i++) {
    //Set numbers
    gridNumbers[i] = Math.trunc(Math.random() * 10 + 1);
    gridNumbersDisplay[i].textContent = gridNumbers[i];

    //Un-select all numbers
    gridSelected[i] = false;
    gridNumbersDisplay[i].style.border = "none";
  }
}

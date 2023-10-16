"use strict";

//Define variables
let score = 0;
let wrongAnswers = 0;
let operator;
let number1;
let number2;
let rightAnswer;
let givenAnswer;
const startTime = performance.now();

const scoreDisplay = document.querySelector(".grid-container__item-score");
const operatorDisplay = document.querySelector(
  ".grid-container__item-operator"
);
const number1Display = document.querySelector(".grid-container__item-number-1");
const number2Display = document.querySelector(".grid-container__item-number-2");
const input = document.querySelector(
  ".grid-container__item-answer__item-input"
);
const submit = document.querySelector(
  ".grid-container__item-answer__item-submit"
);
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__item-window__item-text");
const retry = document.querySelector(".modal__item-window__item-retry");

//Generate the first problem immediately
generateProblem();

//Calls for answer to be checked when Submit or Enter is pressed
submit.addEventListener("click", function () {
  input.focus();
  checkAnswer();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && modal.classList.contains("hidden"))
    checkAnswer();
});

//Resets game when retry button is pressed
retry.addEventListener("click", function () {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  generateProblem();
  modal.classList.add("hidden");
});

//Function that generates a new problem
function generateProblem() {
  //Empties and focuses on input field
  input.value = "";
  input.focus();

  //Sets operator to 0 (+), 1 (-), 2 (*) or 3 (/)
  operator = Math.trunc(Math.random() * 4);

  //Sets numbers and answer
  switch (operator) {
    //Operator = +; Number 1 = 1-100; Number 2 = 1-100
    case 0:
      operator = "+";
      number1 = Math.trunc(Math.random() * 100 + 1);
      number2 = Math.trunc(Math.random() * 100 + 1);
      rightAnswer = number1 + number2;
      break;
    //Operator = -; Number 1 = 1-100; Number 2 <= Number 1
    case 1:
      operator = "-";
      number1 = Math.trunc(Math.random() * 100 + 1);
      number2 = Math.trunc(Math.random() * number1 + 1);
      rightAnswer = number1 - number2;
      break;
    //Operator = *; Number 1 = 1-10; Number 2 = 1-10
    case 2:
      operator = "*";
      number1 = Math.trunc(Math.random() * 10 + 1);
      number2 = Math.trunc(Math.random() * 10 + 1);
      rightAnswer = number1 * number2;
      break;
    //Operator = /; Number 1 = 1-10; Number 2 = 1-3
    case 3:
      operator = "/";
      number1 = Math.trunc(Math.random() * 10 + 1);
      number2 = Math.trunc(Math.random() * 3 + 1);
      //Ensure answer is a whole number
      while (number1 / number2 !== Math.trunc(number1 / number2)) {
        number1 = Math.trunc(Math.random() * 10 + 1);
      }
      rightAnswer = number1 / number2;
      break;
  }

  //Displays the problem
  console.log(`${number1} ${operator} ${number2} = ${rightAnswer}`);
  number1Display.textContent = number1;
  operatorDisplay.textContent = operator;
  number2Display.textContent = number2;
}

//Checks if the answer is correct when called
function checkAnswer() {
  //If field isn't empty
  if (input.value !== "") {
    givenAnswer = input.value;
    console.log(
      `${givenAnswer} is ${
        givenAnswer == rightAnswer ? "correct!" : "incorrect."
      }`
    );

    if (givenAnswer == rightAnswer) {
      //Right answer
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      input.style.backgroundColor = "green";
      setTimeout(() => {
        input.style.backgroundColor = "white";
      }, 1000);

      //When game is won
      if (score === 10) {
        input.blur();
        const endTime = performance.now();
        const playTime = (endTime - startTime) / 1000;
        const playMinutes = Math.trunc(playTime / 60);
        const playSeconds = Math.round(playTime % 60);
        //10 right
        modalText.innerHTML = `${score} right ${
          //answers
          score === 1 ? "answer" : "answers"
          //0 wrong
        }<br>${wrongAnswers} wrong ${
          //answers
          wrongAnswers === 1 ? "answer" : "answers"
          //in 1
        }<br>in ${playMinutes} ${
          //minute
          playMinutes === 1 ? "minute" : "minutes"
          //and 15 seconds
        } and ${playSeconds} ${playSeconds === 1 ? "second" : "seconds"}`;
        modal.classList.remove("hidden");
      } else {
        //Generate new problem
        generateProblem();
      }
    } else {
      //Wrong answer
      input.value = "";
      input.style.backgroundColor = "red";
      wrongAnswers++;
      input.focus();
    }
  }
}

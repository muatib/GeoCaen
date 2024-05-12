let currentIndex = 0;
let data;

function init() {
  fetch("/json/dat.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      if (localStorage.getItem("currentIndex")) {
        currentIndex = parseInt(localStorage.getItem("currentIndex"));
      }
      displayContent();
    });
}

function displayContent() {
  if (data) {
    const gameContent = data[currentIndex];
    const game1Txt = document.querySelector("#game1__txt");
    game1Txt.textContent = gameContent.text;
    document.querySelector("#showClue").addEventListener("click", function () {
      clue.textContent = gameContent.clue;
    });
  }
}

function getAnswer() {
  const userAnswer = document.querySelector("#answer").value.toLowerCase();
  const correctAnswer = data[currentIndex].answer.toLowerCase();
  const answerInput = document.querySelector("#answer");
  if (userAnswer === correctAnswer) {
    showPopup("correctPopup");
  } else {
    answerInput.value = "";
    answerInput.classList.add("game__form-wrong", "shake");
    changeTextState.classList.add("wrong__txt--disp");
    changeTextState.classList.remove("wrong__txt");
  }
}

function showPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add("show");
  }
}

/**
 * Moves to the next question in the data.
 */
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= data.length) {
    currentIndex = 0;
  }
  displayContent();
}

document.addEventListener("DOMContentLoaded", init);

const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", getAnswer);

const closeCorrectPopupButton = document.querySelector("#closeCorrectPopup");
closeCorrectPopupButton.addEventListener("click", function () {
  closePopup("correctPopup");
  nextQuestion();
});

const closeIncorrectPopupButton = document.querySelector(
  "#closeIncorrectPopup"
);
closeIncorrectPopupButton.addEventListener("click", function () {
  closePopup("incorrectPopup");
});

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove("show");
  }
}

window.onbeforeunload = function () {
  localStorage.setItem("currentIndex", currentIndex);
};

window.onload = function () {
  if (localStorage.getItem("currentIndex")) {
    currentIndex = parseInt(localStorage.getItem("currentIndex"));
  }
  displayContent();
};
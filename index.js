const game = (() => {
  //cache DOm
  const optionBtns = document.querySelectorAll(".options");
  const modal = document.querySelector(".modal");
  const qBox = document.querySelector(".questionBox");
  const qNumDisplay = document.querySelector(".qNum");
  const timerDisplay = document.querySelector(".timer");
  const answerBubbles = document.querySelectorAll(".bubble");

  //add event listeners
  optionBtns.forEach((btn) => btn.addEventListener("click", whichGame));
  answerBubbles.forEach((bubble) =>
    bubble.addEventListener("click", selectAnswer)
  );
  //variables
  let gameOption;
  let qNum;
  let answer;

  function whichGame(e) {
    if (e.target.innerText == "Addition") {
      gameOption = "addition";
    } else if (e.target.innerText == "Subtraction") {
      gameOption = "subtraction";
    } else if (e.target.innerText == "Multiplication") {
      gameOption = "multiplication";
    } else if (e.target.innerText == "Division") {
      gameOption = "division";
    }

    console.log(gameOption);

    modal.classList.toggle("hidden");
  }

  function selectAnswer(e) {
    answer = e.target.innerText;
    console.log(answer);
    pop(e);
  }

  function pop(e) {
    let bubbleNum = e.target.classList[1];
    console.log(bubbleNum);
    e.target.remove();
  }
})();

const addition = (() => {
  //some code
})();

const subtraction = (() => {
  //some code
})();

const multiplication = (() => {
  //some code
})();

const division = (() => {
  //some code
})();

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
  let qNum = 1;
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
    setTimeout(clearBubbles, 500);
    // clearBubbles();
    nextQ(gameOption);
  }

  function pop(e) {
    let bubbleNum = e.target.classList[1];
    console.log(bubbleNum);
    e.target.remove();
  }

  function clearBubbles() {
    answerBubbles.forEach((bubble) => bubble.remove());
  }

  function nextQ(gameOption) {
    if (gameOption == "addition") {
      addition.nextQ();
    } else if (gameOption == "subtraction") {
      subtraction.nextQ();
    } else if (gameOption == "multiplication") {
      multiplication.nextQ();
    } else if (gameOption == "division") {
      division.nextQ();
    }

    updateQNum(qNum);
  }

  function updateQNum(qNum) {
    qNum++;
    qNumDisplay.innerText = `Q${qNum}`;
  }
})();

const addition = (() => {
  //some code
  function nextQ() {
    console.log("A");
  }

  return {
    nextQ,
  };
})();

const subtraction = (() => {
  //some code
  function nextQ() {
    console.log("S");
  }

  return {
    nextQ,
  };
})();

const multiplication = (() => {
  //some code
  function nextQ() {
    console.log("M");
  }

  return {
    nextQ,
  };
})();

const division = (() => {
  //some code
  function nextQ() {
    console.log("D");
  }

  return {
    nextQ,
  };
})();

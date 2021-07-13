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
    startTimer();
  }

  function selectAnswer(e) {
    answer = e.target.innerText;
    console.log(answer);
    pop(e);
    setTimeout(clearBubbles, 500);
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

    updateQNum();
  }

  function updateQNum() {
    qNum++;
    qNumDisplay.innerText = `Q${qNum}`;
  }

  function updateQBox(question) {
    qBox.innerText = question;
  }

  function startTimer() {
    // //code for 2 min timer
    // const timeGiven = 1;
    // let time = timeGiven * 60;
    // setInterval(countdown, 1000);
    // function countdown() {
    //   if (time <= 0) {
    //     timerDisplay.innerText = `0:00`;
    //     clearInterval(countdown);
    //     alert("game over");
    //   } else {
    //     const mins = Math.floor(time / 60);
    //     let seconds = time % 60;
    //     seconds = seconds < 2 ? "0" + seconds : seconds;
    //     timerDisplay.innerText = `${mins}:${seconds}`;
    //     time--;
    //   }
    // }
  }
  return {
    updateQBox,
  };
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

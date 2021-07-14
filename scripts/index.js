const game = (() => {
  //cache DOm
  const optionBtns = document.querySelectorAll(".options");
  const modal = document.querySelector(".modal");
  const qBox = document.querySelector(".questionBox");
  const qNumDisplay = document.querySelector(".qNum");
  const timerDisplay = document.querySelector(".timer");

  const container = document.querySelector(".bubbleContainer");

  //add event listeners
  optionBtns.forEach((btn) => btn.addEventListener("click", whichGame));

  //variables
  let gameOption;
  let qNum = 0;
  let answer;

  function whichGame(e) {
    setTimeout(updateQNum, 700);

    if (e.target.innerText == "Addition") {
      gameOption = "addition";
      addition.nextQ();
    } else if (e.target.innerText == "Subtraction") {
      gameOption = "subtraction";
      subtraction.nextQ();
    } else if (e.target.innerText == "Multiplication") {
      gameOption = "multiplication";
      multiplication.nextQ();
    } else if (e.target.innerText == "Division") {
      gameOption = "division";
      division.nextQ();
    }

    // console.log(gameOption);

    modal.classList.toggle("hidden");
    startTimer();
  }

  function addBubbleListener() {
    const answerBubbles = document.querySelectorAll(".bubble");

    answerBubbles.forEach((bubble) =>
      bubble.addEventListener("click", selectAnswer)
    );
  }

  function selectAnswer(e) {
    answer = e.target.innerText;
    console.log(` you picked: ${answer}`);
    if (Array.from(e.target.classList).includes("bubble")) {
      pop(e);
      setTimeout(clearBubbles, 400);
      nextQ(gameOption);
    }
  }

  function pop(e) {
    // let bubbleNum = e.target.classList[1];
    // console.log(bubbleNum);
    e.target.remove();
  }

  function clearBubbles() {
    const answerBubbles = document.querySelectorAll(".bubble");
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

    setTimeout(updateQNum, 700);
  }

  function updateQNum() {
    qNum++;
    qNumDisplay.innerText = `Q${qNum}`;
  }

  function updateQBox(question) {
    qBox.innerText = question;
  }

  function render(choices) {
    choices.forEach((choice) => {
      let i = choices.indexOf(choice) + 1;
      let className = `b${i}`;
      let bubble = document.createElement("div");
      bubble.classList.add("bubble", className);
      bubble.innerText = choice;
      container.appendChild(bubble);
    });

    addBubbleListener();
  }

  function startTimer() {
    let interval = setInterval(countdown, 1000);
    let counter = 0;
    let allocatedTime = 10;

    function convertSeconds(s) {
      let mins = Math.floor(s / 60);
      let seconds = s % 60;
      if (seconds < 10) {
        return `${mins}:0${seconds}`;
      }
      return `${mins}:${seconds}`;
    }

    function countdown() {
      counter++;
      timerDisplay.innerText = convertSeconds(allocatedTime - counter);

      if (counter == allocatedTime) {
        alert("game over");
        clearInterval(interval);
      }
    }
  }

  return {
    updateQBox,
    render,
  };
})();

const addition = (() => {
  function nextQ() {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 30) + 1;

    let randomIndex = Math.floor(Math.random() * 10);

    let question = `${num1} + ${num2}`;
    let actualAnswer = num1 + num2;

    let answerChoices = Array.from(myRandomInts(11, 50));
    answerChoices.shift();
    answerChoices.splice(randomIndex, 0, actualAnswer);

    function myRandomInts(quantity, max) {
      const set = new Set();
      set.add(actualAnswer);
      while (set.size < quantity) {
        set.add(Math.floor(Math.random() * max) + 1);
      }
      return set;
    }

    setTimeout(function () {
      game.updateQBox(question);
    }, 700);
    setTimeout(function () {
      game.render(answerChoices);
    }, 700);

    console.log(`Actual answer = ${actualAnswer}`);
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

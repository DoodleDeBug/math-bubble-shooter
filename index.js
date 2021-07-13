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
  let qNum = 1;
  let answer;

  function whichGame(e) {
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

    updateQNum();
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
    render,
  };
})();

const addition = (() => {
  function nextQ() {
    let num1 = Math.floor(Math.random() * 50) + 1;
    let num2 = Math.floor(Math.random() * 50) + 1;

    let randomIndex = Math.floor(Math.random() * 10);

    let question = `${num1} + ${num2}`;
    let acutalAnswer = num1 + num2;

    let answerChoices = generateChoices();
    answerChoices.splice(randomIndex, 0, acutalAnswer);

    function generateChoices() {
      let choices = [];

      for (let i = 0; i < 11; i++) {
        let c = Math.floor(Math.random() * 50) + 1;
        if (choices.includes(c)) {
          c = Math.floor(Math.random() * 50) + 1;
        }
        choices.push(c);
      }

      return choices;
    }

    setTimeout(function () {
      game.updateQBox(question);
    }, 1000);
    setTimeout(function () {
      game.render(answerChoices);
    }, 1000);

    console.log(`Actual answer = ${acutalAnswer}`);
    // console.log(answerChoices);
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

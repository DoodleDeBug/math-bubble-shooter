const game = (() => {
  //cache DOm
  const optionBtns = document.querySelectorAll(".options");
  const modal = document.querySelector(".modal");
  const qBox = document.querySelector(".questionBox");
  const qNumDisplay = document.querySelector(".qNum");
  const timerDisplay = document.querySelector(".timer");
  const main = document.querySelector("main");
  const container = document.querySelector(".bubbleContainer");

  //add event listeners
  optionBtns.forEach((btn) => btn.addEventListener("click", whichGame));

  //variables
  let gameOption;
  let qNum = 0;
  let answer;
  let questionList = [];
  let actualAnswerList = [];
  let userAnswerList = [];

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

    modal.classList.toggle("hidden");
    nextQ(gameOption);
    startTimer();
  }

  function addBubbleListener() {
    const answerBubbles = document.querySelectorAll(".bubble");

    answerBubbles.forEach((bubble) =>
      bubble.addEventListener("click", selectAnswer)
    );
  }

  function removeBubbleListener() {
    const answerBubbles = document.querySelectorAll(".bubble");

    answerBubbles.forEach((bubble) =>
      bubble.removeEventListener("click", selectAnswer)
    );
  }

  function selectAnswer(e) {
    answer = e.target.innerText;
    userAnswerList.push(answer);

    if (Array.from(e.target.classList).includes("bubble")) {
      pop(e);
      setTimeout(clearBubbles, 400);
      nextQ(gameOption);
    }
  }

  function pop(e) {
    // let bubbleNum = e.target.classList[1];
    // console.log(bubbleNum);
    let popSound = new Audio("./sounds/pop.mp3");
    popSound.play();
    e.target.remove();
  }

  function clearBubbles() {
    const answerBubbles = document.querySelectorAll(".bubble");
    answerBubbles.forEach((bubble) => bubble.remove());
  }

  function nextQ(gameOption) {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 30) + 1;

    let randomIndex = Math.floor(Math.random() * 10);

    let data;

    if (gameOption == "addition") {
      data = addition.createQ(num1, num2);
    } else if (gameOption == "subtraction") {
      data = subtraction.createQ(num1, num2);
    } else if (gameOption == "multiplication") {
      data = multiplication.createQ();
    } else if (gameOption == "division") {
      data = division.createQ();
    }

    questionList.push(data[0]);
    actualAnswerList.push(data[1]);

    function myRandomInts(quantity, max) {
      const set = new Set();
      set.add(data[1]);
      while (set.size < quantity) {
        set.add(Math.floor(Math.random() * max) + 1);
      }
      return set;
    }

    let answerChoices = Array.from(myRandomInts(11, 50));
    answerChoices.shift();
    answerChoices.splice(randomIndex, 0, data[1]);

    setTimeout(function () {
      updateQBox(data[0]);
    }, 700);
    setTimeout(function () {
      render(answerChoices);
    }, 700);
    setTimeout(updateQNum, 700);

    // console.log(questionList);
    // console.log(actualAnswerList);
    // console.log(userAnswerList);
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
    let allocatedTime = 30;

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
        removeBubbleListener();
        compileResults();
        navigateToResults();
      }
    }
  }

  function navigateToResults() {
    const resultsBtn = document.createElement("a");
    resultsBtn.setAttribute("href", "/pages/results.html");
    resultsBtn.classList.add("btn");
    resultsBtn.innerText = "See Results";
    main.appendChild(resultsBtn);
  }

  function compileResults() {
    let points = 0;

    for (let i = 0; i < qNum - 1; i++) {
      // console.log(
      //   `Q${i + 1}. ${questionList[i]} answer = ${
      //     actualAnswerList[i]
      //   } your answer = ${userAnswerList[i]}`
      // );

      if (userAnswerList[i] == actualAnswerList[i]) {
        points++;
      }
    }

    console.log(points);
  }
})();

const addition = (() => {
  function createQ(num1, num2) {
    let question = `${num1} + ${num2}`;
    let actualAnswer = num1 + num2;

    return [question, actualAnswer];
  }

  return {
    createQ,
  };
})();

const subtraction = (() => {
  function createQ(num1, num2) {
    let question;
    let actualAnswer;

    if (num1 > num2) {
      question = `${num1} - ${num2}`;
      actualAnswer = num1 - num2;
    } else {
      question = `${num2} - ${num1}`;
      actualAnswer = num2 - num1;
    }

    return [question, actualAnswer];
  }

  return {
    createQ,
  };
})();

const multiplication = (() => {
  function createQ() {
    let num1 = Math.floor(Math.random() * 12) + 1;
    let num2 = Math.floor(Math.random() * 12) + 1;

    let question = `${num1} × ${num2}`;
    let actualAnswer = num1 * num2;

    return [question, actualAnswer];
  }

  return {
    createQ,
  };
})();

const division = (() => {
  function createQ() {
    let num1 = Math.floor(Math.random() * 12) + 1;
    let num2 = Math.floor(Math.random() * 12) + 1;

    let question = `${num1 * num2} ÷ ${num2}`;
    let actualAnswer = (num1 * num2) / num2;

    return [question, actualAnswer];
  }

  return {
    createQ,
  };
})();

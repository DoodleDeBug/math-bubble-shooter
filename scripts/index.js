const game = (() => {
  //cache DOm
  const optionBtns = document.querySelectorAll(".options");
  const modal = document.querySelector(".modal");

  const main = document.querySelector("main");
  const container = document.querySelector(".bubbleContainer"); /////////////////////////bubble container

  const qBox = document.querySelector(".questionBox");
  const qNumDisplay = document.querySelector(".qNum");
  const timerDisplay = document.querySelector(".timer");

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
    localStorage.setItem("gameOption", gameOption);
    nextQ(gameOption);
    startTimer();
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
  }

  function render(choices) {
    /////////////////////////bubble container
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

  function addBubbleListener() {
    /////////////////////////bubble container
    const answerBubbles = document.querySelectorAll(".bubble");

    answerBubbles.forEach((bubble) =>
      bubble.addEventListener("click", selectAnswer)
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
    /////////////////////////bubble container
    let popSound = new Audio("./assets/sounds/pop.mp3");
    popSound.play();
    e.target.remove();
  }

  function clearBubbles() {
    /////////////////////////bubble container
    const answerBubbles = document.querySelectorAll(".bubble");
    answerBubbles.forEach((bubble) => setTimeout(bubble.remove(), 1000));
  }

  function updateQNum() {
    qNum++;
    qNumDisplay.innerText = `Q${qNum}`;
  }

  function updateQBox(question) {
    qBox.innerText = question;
  }

  function startTimer() {
    let interval = setInterval(countdown, 3000);
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
        removeBubbleListener();
        compileResults();
        intermediatePage();
      }
    }
  }

  function removeBubbleListener() {
    /////////////////////////bubble container
    const answerBubbles = document.querySelectorAll(".bubble");

    answerBubbles.forEach((bubble) =>
      bubble.removeEventListener("click", selectAnswer)
    );
  }

  function compileResults() {
    const resultsList = {};
    let points = 0;

    for (let i = 0; i < qNum - 1; i++) {
      if (userAnswerList[i] == actualAnswerList[i]) {
        points++;
        resultsList[`${questionList[i]} = ${userAnswerList[i]}`] = "correct";
      } else {
        resultsList[`${questionList[i]} = ${userAnswerList[i]}`] = "incorrect";
      }
    }

    saveLocal();

    function saveLocal() {
      localStorage.setItem("resultsList", JSON.stringify(resultsList));
      localStorage.setItem("currentPoints", points);
    }
  }

  function intermediatePage() {
    window.location = "./pages/intermediatePage.html";
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

const gameOptions = (() => {
  //cache DOm
  const optionBtns = document.querySelectorAll(".options");
  const modal = document.querySelector(".modal");

  //add event listeners
  optionBtns.forEach((btn) => btn.addEventListener("click", whichGame));

  //variables
  let gameOption;

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

const getName = (() => {
  //restore local leaderboard data
  let additionLeaderboard = JSON.parse(
    localStorage.getItem("additionLeaderboard")
  );
  let subtractionLeaderboard = JSON.parse(
    localStorage.getItem("subtractionLeaderboard")
  );
  let multiplicationLeaderboard = JSON.parse(
    localStorage.getItem("multiplicationLeaderboard")
  );
  let divisionLeaderboard = JSON.parse(
    localStorage.getItem("divisionLeaderboard")
  );

  if (additionLeaderboard === null) additionLeaderboard = [];
  if (subtractionLeaderboard === null) subtractionLeaderboard = [];
  if (multiplicationLeaderboard === null) multiplicationLeaderboard = [];
  if (divisionLeaderboard === null) divisionLeaderboard = [];

  displayGameOption();

  function displayGameOption() {
    //get gameOption
    const gameOption = localStorage.getItem("gameOption");

    //cache DOM
    gameDisplay = document.querySelector("p");

    gameDisplay.innerText =
      gameOption.charAt(0).toUpperCase() + gameOption.slice(1);
  }
})();

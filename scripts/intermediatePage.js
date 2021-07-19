const getName = (() => {
  //get points
  const points = localStorage.getItem("currentPoints");

  //get gameOption
  const gameOption = localStorage.getItem("gameOption");

  //cache DOM
  const input = document.querySelector("input");

  //add event listener
  document.addEventListener("keypress", submitName);

  function submitName(e) {
    if (e.key === "Enter") {
      let name = input.value;
      addToLeaderboard(name, points);
      goToLeaderboard();
    }
  }

  function goToLeaderboard() {
    window.location = "./../pages/leaderboard.html";
  }

  function navigateToResults() {
    window.location = "./../pages/results.html";
  }

  function addToLeaderboard(name, points) {
    if (gameOption == "addition") {
      let additionLeaderboard = JSON.parse(
        localStorage.getItem("additionLeaderboard")
      );
      if (additionLeaderboard === null) additionLeaderboard = [];
      console.table(additionLeaderboard);

      additionLeaderboard.push([name, points]);

      console.table(additionLeaderboard);
      localStorage.setItem(
        "additionLeaderboard",
        JSON.stringify(additionLeaderboard)
      );
    } else if (gameOption == "subtraction") {
      let subtractionLeaderboard = JSON.parse(
        localStorage.getItem("subtractionLeaderboard")
      );
      if (subtractionLeaderboard === null) subtractionLeaderboard = [];

      subtractionLeaderboard.push([name, points]);

      localStorage.setItem(
        "subtractionLeaderboard",
        JSON.stringify(subtractionLeaderboard)
      );
    } else if (gameOption == "multiplication") {
      let multiplicationLeaderboard = JSON.parse(
        localStorage.getItem("multiplicationLeaderboard")
      );
      if (multiplicationLeaderboard === null) multiplicationLeaderboard = [];

      multiplicationLeaderboard.push([name, points]);

      localStorage.setItem(
        "multiplicationLeaderboard",
        JSON.stringify(multiplicationLeaderboard)
      );
    } else if (gameOption == "division") {
      let divisionLeaderboard = JSON.parse(
        localStorage.getItem("divisionLeaderboard")
      );

      if (divisionLeaderboard === null) divisionLeaderboard = [];

      divisionLeaderboard.push([name, points]);

      localStorage.setItem(
        "divisionLeaderboard",
        JSON.stringify(divisionLeaderboard)
      );
    }
  }
})();

const getName = (() => {
  //get points
  const points = localStorage.getItem("currentPoints");
  console.log(points);

  //get gameOption
  const gameOption = localStorage.getItem("gameOption");
  console.log(gameOption);

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

  //cache DOM
  const input = document.querySelector("input");

  //add event listener
  document.addEventListener("keypress", submitName);

  //variables

  function submitName(e) {
    if (e.key === "Enter") {
      let name = input.value;
      console.log(name);
      addToLeaderboard(name, points);
    }
  }

  function addToLeaderboard(name, points) {
    if (gameOption == "addition") {
      console.table(additionLeaderboard);
      additionLeaderboard.push([name, points]);
      console.table(additionLeaderboard);
      localStorage.setItem(
        "additionLeaderboard",
        JSON.stringify(additionLeaderboard)
      );
    } else if (gameOption == "subtraction") {
      subtractionLeaderboard.push([name, points]);
      localStorage.setItem(
        "subtractionLeaderboard",
        JSON.stringify(subtractionLeaderboard)
      );
    } else if (gameOption == "multiplication") {
      multiplicationLeaderboard.push([name, points]);
      localStorage.setItem(
        "multiplicationLeaderboard",
        JSON.stringify(multiplicationLeaderboard)
      );
    } else if (gameOption == "division") {
      divisionLeaderboard.push([name, points]);
      localStorage.setItem(
        "divisionLeaderboard",
        JSON.stringify(divisionLeaderboard)
      );
    }
  }
})();

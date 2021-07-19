const getName = (() => {
  //get gameOption
  const gameOption = localStorage.getItem("gameOption");

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
  displayLeaderboard();

  function displayGameOption() {
    //cache DOM
    const gameDisplay = document.querySelector("p");

    gameDisplay.innerText =
      gameOption.charAt(0).toUpperCase() + gameOption.slice(1);
  }

  function displayLeaderboard() {
    let data = getLocalData();

    //cache DOM
    const leaderboard = document.querySelector(".leaderboard");

    let pos = 0;
    let colours = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "pink",
    ];

    data.forEach((user) => {
      const li = document.createElement("li");

      if (pos == colours.length) {
        pos = 0;
      }

      li.innerHTML = `${
        user[0].charAt(0).toUpperCase() + user[0].slice(1)
      }, <span class="${colours[pos]}"s>${user[1]}</span> points`;

      leaderboard.appendChild(li);

      pos++;
    });
  }

  function getLocalData() {
    if (gameOption == "addition") {
      let additionLeaderboard = JSON.parse(
        localStorage.getItem("additionLeaderboard")
      );

      if (additionLeaderboard === null) additionLeaderboard = [];

      return additionLeaderboard;
    } else if (gameOption == "subtraction") {
      let subtractionLeaderboard = JSON.parse(
        localStorage.getItem("subtractionLeaderboard")
      );
      if (subtractionLeaderboard === null) subtractionLeaderboard = [];

      return subtractionLeaderboard;
    } else if (gameOption == "multiplication") {
      let multiplicationLeaderboard = JSON.parse(
        localStorage.getItem("multiplicationLeaderboard")
      );
      if (multiplicationLeaderboard === null) multiplicationLeaderboard = [];

      return multiplicationLeaderboard;
    } else if (gameOption == "division") {
      let divisionLeaderboard = JSON.parse(
        localStorage.getItem("divisionLeaderboard")
      );

      if (divisionLeaderboard === null) divisionLeaderboard = [];

      return divisionLeaderboard;
    }
  }
})();

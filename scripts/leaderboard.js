const getName = (() => {
  //get gameOption
  const gameOption = localStorage.getItem("gameOption");

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
    if (data === null) data = [];

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

      return additionLeaderboard;
    } else if (gameOption == "subtraction") {
      let subtractionLeaderboard = JSON.parse(
        localStorage.getItem("subtractionLeaderboard")
      );

      return subtractionLeaderboard;
    } else if (gameOption == "multiplication") {
      let multiplicationLeaderboard = JSON.parse(
        localStorage.getItem("multiplicationLeaderboard")
      );

      return multiplicationLeaderboard;
    } else if (gameOption == "division") {
      let divisionLeaderboard = JSON.parse(
        localStorage.getItem("divisionLeaderboard")
      );

      return divisionLeaderboard;
    }
  }
})();

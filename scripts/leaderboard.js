const leaderboardControl = (() => {
  //get gameOption
  const gameOption = sessionStorage.getItem("gameOption");

  //varaibles
  let leaderboardType;

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
      }, <span class="${colours[pos]}">${user[1]}</span> points`;

      leaderboard.appendChild(li);

      pos++;
    });
  }

  function getLocalData() {
    if (gameOption == "addition") {
      leaderboardType = JSON.parse(localStorage.getItem("additionLeaderboard"));
    } else if (gameOption == "subtraction") {
      leaderboardType = JSON.parse(
        localStorage.getItem("subtractionLeaderboard")
      );
    } else if (gameOption == "multiplication") {
      leaderboardType = JSON.parse(
        localStorage.getItem("multiplicationLeaderboard")
      );
    } else if (gameOption == "division") {
      leaderboardType = JSON.parse(localStorage.getItem("divisionLeaderboard"));
    }

    if (leaderboardType.length > 10) leaderboardType.splice(10);
    return leaderboardType;
  }
})();

const getName = (() => {
  // variables
  let leaderboardType;

  //cache DOM
  const input = document.querySelector("input");
  const msg = document.querySelector(".displayMsg");
  const container = document.querySelector(".center");
  const pointsDisplay = document.querySelector(".pointsDisplay");

  //get points
  const points = localStorage.getItem("currentPoints");
  pointsDisplay.innerText = `${points} points`;

  //get gameOption
  const gameOption = localStorage.getItem("gameOption");

  compareToLeaderboard(points);

  function compareToLeaderboard(points) {
    let data = getLocalData();
    if (data === null) data = [];

    let pointsList = [];
    data.forEach((user) => {
      pointsList.push(user[1]);
    });

    console.log(pointsList);

    if (points == 0) {
      msg.innerHTML = `<span class="red">Too</span>
        <span class="orange">Bad</span>
        <span class="yellow">!</span>
        <span class="green">You</span>
        <span class="blue">Didn't</span>
        <span class="purple">Make</span>
        <span class="pink">It</span>
        <span class="red">On</span>
        <span class="orange">To</span>
        <span class="yellow">The</span>
        <span class="green">Leaderboard</span>
        <span class="blue">!</span>`;

      Array.from(container.childNodes).forEach((child) => child.remove());

      const leaderboardBtn = document.createElement("button");
      leaderboardBtn.classList.add("btn");
      leaderboardBtn.innerText = "See Leaderboard";
      container.appendChild(leaderboardBtn);
      leaderboardBtn.addEventListener("click", goToLeaderboard);

      const resultsBtn = document.createElement("button");
      resultsBtn.classList.add("btn");
      resultsBtn.innerText = "See Results";
      container.appendChild(resultsBtn);
      resultsBtn.addEventListener("click", navigateToResults);
    } else {
      //add event listener
      document.addEventListener("keypress", submitName);

      if (points > 5) {
        msg.innerHTML = `<span class="red">You</span>
        <span class="orange">Got</span>
        <span class="yellow">A</span>
        <span class="green">New</span>
        <span class="blue">High</span>
        <span class="purple">Score</span>
        <span class="pink">!</span>`;
      }
    }
  }

  function submitName(e) {
    if (e.key === "Enter") {
      let name = input.value;
      addToLeaderboard(name, points);
      goToLeaderboard();
    }
  }

  function goToLeaderboard() {
    window.location = "./leaderboard.html";
  }

  function navigateToResults() {
    window.location = "./results.html";
  }

  function addToLeaderboard(name, points) {
    if (gameOption == "addition") {
      let additionLeaderboard = JSON.parse(
        localStorage.getItem("additionLeaderboard")
      );
      if (additionLeaderboard === null) additionLeaderboard = [];

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
    console.table(leaderboardType);
    return leaderboardType;
  }
})();

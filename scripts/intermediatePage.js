const getName = (() => {
  // // variables
  // let leaderboard;

  //get points
  const points = localStorage.getItem("currentPoints");

  //get gameOption
  const gameOption = localStorage.getItem("gameOption");

  //cache DOM
  const input = document.querySelector("input");
  const msg = document.querySelector(".displayMsg");
  const container = document.querySelector(".center");

  compareToLeaderboard(points);

  function compareToLeaderboard(points) {
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

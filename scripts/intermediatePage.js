const getName = (() => {
  // variables
  let leaderboardType;

  //cache DOM
  let input;
  const pointsDisplay = document.querySelector(".pointsDisplay");

  //get points
  const points = localStorage.getItem("currentPoints");
  pointsDisplay.innerText = `${points} points`;

  //get gameOption
  const gameOption = localStorage.getItem("gameOption");

  //get local data
  let data = getLocalData();
  if (data === null) data = [];

  compareToLeaderboard(points);

  function compareToLeaderboard(points) {
    let status;

    let pointsList = [];
    data.forEach((user) => {
      pointsList.push(user[1]);
    });

    console.log(pointsList);

    if (pointsList.length == 0) {
      console.log("no data yet");
      status = "push";
      document.addEventListener("keypress", (e) => {
        submitName(e, status);
      });
    } else {
      for (let i = 0; i < 10; i++) {
        if (points >= pointsList[i]) {
          let index = i;
          console.log(index);
          status = "splice";
          index == 0
            ? displayMessage("highscore")
            : displayMessage("leaderboard");
          document.addEventListener("keypress", (e) => {
            submitName(e, status, index);
          });
          return;
        }
      }
    }

    if (pointsList.length < 10) {
      status = "push";
      document.addEventListener("keypress", (e) => {
        submitName(e, status);
      });
    }
  }

  function displayMessage(message) {
    //cache DOM
    const msg = document.querySelector(".displayMsg");
    const container = document.querySelector(".center");

    if (message == "highscore") {
      msg.innerHTML = `<span class="red">You</span>
      <span class="orange">Got</span>
      <span class="yellow">A</span>
      <span class="green">New</span>
      <span class="blue">High</span>
      <span class="purple">Score</span>
      <span class="pink">!</span>`;
    } else if (message == "leaderboard") {
      msg.innerHTML = `<span class="red">You </span>
      <span class="orange">Made</span>
              <span class="yellow">It</span>
              <span class="green">On</span>
              <span class="blue">To</span>
              <span class="purple">The</span>
              <span class="pink">Leaderboard</span>
              <span class="red">!</span>`;
    }

    Array.from(container.childNodes).forEach((child) => child.remove());

    container.innerHTML = `<h2>Your Name</h2>
    <input type="text" name="name" id="name">
    <p>Press Enter To Continue</p>`;

    input = document.querySelector("input");
  }

  function submitName(e, status, index) {
    if (e.key === "Enter") {
      let name = input.value;

      if (status == "push") {
        data.push([name, points]);
      } else if (status == "splice") {
        data.splice(index, 0, [name, points]);
      }

      updateLeaderboard(data);
      goToLeaderboard();
    }
  }

  function goToLeaderboard() {
    window.location = "./leaderboard.html";
  }

  function updateLeaderboard(data) {
    if (gameOption == "addition") {
      localStorage.setItem("additionLeaderboard", JSON.stringify(data));
    } else if (gameOption == "subtraction") {
      localStorage.setItem("subtractionLeaderboard", JSON.stringify(data));
    } else if (gameOption == "multiplication") {
      localStorage.setItem("multiplicationLeaderboard", JSON.stringify(data));
    } else if (gameOption == "division") {
      localStorage.setItem("divisionLeaderboard", JSON.stringify(data));
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

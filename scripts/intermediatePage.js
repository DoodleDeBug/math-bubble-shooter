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
      console.log("his");
      status = "push";
      document.addEventListener("keypress", (e) => {
        submitName(e, status);
      });
    } else {
      console.log("howdy");
      for (let i = 0; i < 10; i++) {
        if (points >= pointsList[i]) {
          let index = i;
          console.log(index);
          status = "splice";
          document.addEventListener("keypress", (e) => {
            submitName(e, status, index);
          });
          return;
        }
      }
      // pointsList.forEach((item) => {
      //   if (points >= item) {
      //     let index = pointsList.indexOf(item);
      //     console.log(index);
      //     status = "splice";
      //     document.addEventListener("keypress", (e) => {
      //       submitName(e, status, index);
      //     });
      //   }
      // });
    }

    if (pointsList.length < 10) {
      status = "push";
      document.addEventListener("keypress", (e) => {
        submitName(e, status);
      });
    }

    // if (points == 0) {
    //   msg.innerHTML = `<span class="red">Too</span>
    //     <span class="orange">Bad</span>
    //     <span class="yellow">!</span>
    //     <span class="green">You</span>
    //     <span class="blue">Didn't</span>
    //     <span class="purple">Make</span>
    //     <span class="pink">It</span>
    //     <span class="red">On</span>
    //     <span class="orange">To</span>
    //     <span class="yellow">The</span>
    //     <span class="green">Leaderboard</span>
    //     <span class="blue">!</span>`;

    //   Array.from(container.childNodes).forEach((child) => child.remove());

    //   const leaderboardBtn = document.createElement("button");
    //   leaderboardBtn.classList.add("btn");
    //   leaderboardBtn.innerText = "See Leaderboard";
    //   container.appendChild(leaderboardBtn);
    //   leaderboardBtn.addEventListener("click", goToLeaderboard);

    //   const resultsBtn = document.createElement("button");
    //   resultsBtn.classList.add("btn");
    //   resultsBtn.innerText = "See Results";
    //   container.appendChild(resultsBtn);
    //   resultsBtn.addEventListener("click", navigateToResults);
    // } else {
    //   //add event listener
    //   document.addEventListener("keypress", submitName);

    //   if (points > 5) {
    //     msg.innerHTML = `<span class="red">You</span>
    //     <span class="orange">Got</span>
    //     <span class="yellow">A</span>
    //     <span class="green">New</span>
    //     <span class="blue">High</span>
    //     <span class="purple">Score</span>
    //     <span class="pink">!</span>`;
    //   }
    // }
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

  function navigateToResults() {
    window.location = "./results.html";
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

const results = (() => {
  //cache DOM
  const container = document.querySelector("main");

  //get results
  const resultsList = JSON.parse(localStorage.getItem("resultsList"));
  console.table(resultsList);

  let q = 1;
  let colours = [
    ".red",
    ".orange",
    ".yellow",
    ".green",
    ".blue",
    ".purple",
    ".pink",
  ];

  if (Object.keys(resultsList).length % 10 == 0) {
    let numOfCol = Object.keys(resultsList).length / 10;
  }

  for (let question in resultsList) {
    const div = document.createElement("div");
    container.appendChild(div);

    const qNum = document.createElement("span");
    qNum.classList.add("red");
    qNum.innerText = `Q${q}.`;
    div.appendChild(qNum);
    q++;

    const fullQuestion = document.createElement("span");
    fullQuestion.innerText = `${question}`;
    div.appendChild(fullQuestion);

    const mark = document.createElement("img");
    let icon =
      resultsList[question] == "correct"
        ? "./../assets/images/tick.png"
        : "./../assets/images/cross.png";
    mark.setAttribute("src", icon);
    mark.setAttribute("alt", resultsList[question]);
    div.appendChild(mark);
  }
})();

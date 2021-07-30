const results = (() => {
  //cache DOM
  const container = document.querySelector("main");

  //get results
  const resultsList = JSON.parse(sessionStorage.getItem("resultsList"));

  let q = 1;
  let pos = 0;
  let colours = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];

  for (let question in resultsList) {
    const div = document.createElement("div");
    container.appendChild(div);

    const qNum = document.createElement("span");
    qNum.innerText = `Q${q}.`;
    if (pos == colours.length) {
      pos = 0;
    }
    qNum.classList.add(colours[pos]);
    div.appendChild(qNum);
    pos++;
    q++;

    const fullQuestion = document.createElement("span");
    fullQuestion.classList.add("fullQ");
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

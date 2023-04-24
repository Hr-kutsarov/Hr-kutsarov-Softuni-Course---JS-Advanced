function toggle() {
  // An HTML file is given and your task is to show more/less information.
  // By clicking the [More] button, it should reveal the content of a hidden div and changes the text of the button to [Less].
  // When the same link is clicked again (now reading Less), hide the div and change the text of the link to More.
  // Link action should be toggleable (you should be able to click the button an infinite amount of times).

  let extraElement = document.getElementById("extra");
  let btn = document.querySelector(".button");
  if (btn.textContent.toLowerCase() === "more") {
    extraElement.style.display = "block";
    btn.textContent = "less".toUpperCase();
  } else if (btn.textContent.toLowerCase() === "less") {
    extraElement.style.display = "none";
    btn.textContent = "more".toUpperCase();
  }
}

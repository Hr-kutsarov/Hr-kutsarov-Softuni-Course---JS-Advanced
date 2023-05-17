async function solution() {
  const url = "http://localhost:3030/jsonstore/advanced/articles/list";
  const resultData = await fetch(url, { method: "GET" });
  const data = await resultData.json();
  const articles = Object.entries(data);

  domBulder(articles);
}

async function domBulder(articles) {
  for (let a of articles) {
    const objData = a[1];

    // extra
    let extraP = document.createElement("p");
    extraP.textContent = `${objData.title} ............`;

    let extraDiv = document.createElement("div");
    extraDiv.classList.add("extra");
    extraDiv.appendChild(extraP);

    // head
    let buttonMore = document.createElement("button");
    buttonMore.classList.add("button");
    buttonMore.id = objData._id;
    buttonMore.textContent = "More";
    buttonMore.addEventListener("click", (e) => {
      btnMoreHandler(e.target.id);
    });

    let titleSpan = document.createElement("span");
    titleSpan.textContent = objData.title;

    let headDiv = document.createElement("div");
    headDiv.classList.add("head");
    headDiv.appendChild(titleSpan);
    headDiv.appendChild(buttonMore);

    let accordionDiv = document.createElement("div");
    accordionDiv.classList.add("accordion");
    accordionDiv.appendChild(headDiv);
    accordionDiv.appendChild(extraDiv);

    document.getElementById("main").appendChild(accordionDiv);
  }
}

async function btnMoreHandler(id) {
  //   console.log(`CURRENT EVENT ID ${id}`);
  const result = await fetch(
    `http://localhost:3030/jsonstore/advanced/articles/details/${id}`,
    { method: "GET" }
  );
  const data = await result.json();
  domLoader(id, data);
  let el = document.getElementById(id);
  let eltwo = el.parentNode.parentNode.querySelector(".extra");

  if (el.textContent === "More") {
    el.textContent = "Less";
    eltwo.style.display = "block";
  } else {
    el.textContent = "More";
    eltwo.style.display = "none";
  }
}

async function domLoader(id, data) {
  let dataContent = data.content;

  let el = document.getElementById(`${id}`);
  let extra = el.parentNode.parentNode.querySelector(".extra");
  extra.innerHTML = dataContent;
  extra.style.display = "block";
}
solution();

function lockedProfile() {
  getData();
}

async function getData() {
  const result = await fetch(
    "http://localhost:3030/jsonstore/advanced/profiles",
    { method: "GET" }
  );
  const resultData = await result.json();

  for (let obj of Object.entries(resultData)) {
    const [_, { username, email, _id, age }] = obj;
    // console.log(`${username},  ${email},  ${_id} ${age}`);
    createDomElements(_id, username, email, age);
  }
  // console.log(Object.entries(resultData));
}

async function createDomElements(id, username, email, age) {
  const inputAge = document.createElement("input");
  inputAge.type = "email";
  inputAge.name = "user1Age";
  inputAge.value = age;

  const labelAge = document.createElement("label");
  labelAge.innerHTML = "Age:";

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.name = "user1Email";
  inputEmail.value = email;
  inputEmail.disabled = true;
  inputEmail.readonly = true;

  const labelEmail = document.createElement("label");
  labelEmail.innerHTML = "Email:";
  const innerHRelement = document.createElement("hr");

  // divHiddenFields
  const divHiddenFields = document.createElement("div");
  divHiddenFields.id = "user1Hiddenfields";
  divHiddenFields.appendChild(innerHRelement);
  divHiddenFields.appendChild(labelEmail);
  divHiddenFields.appendChild(inputEmail);
  divHiddenFields.appendChild(labelAge);
  divHiddenFields.appendChild(inputAge);
  divHiddenFields.style.display = "none";
  // usernameField

  const usernameField = document.createElement("input");
  usernameField.type = "text";
  usernameField.name = "user1Username";
  usernameField.value = username;
  usernameField.disabled = true;
  usernameField.readonly = true;

  //username label
  const labelUsername = document.createElement("label");
  labelUsername.innerHTML = "Username";
  // hr
  const elementHR = document.createElement("hr");
  // break line
  const breakLine = document.createElement("br");
  // input Unlock
  const inputUnlock = document.createElement("input");
  inputUnlock.type = "radio";
  inputUnlock.value = window.localStorage.getItem("STATE");
  inputUnlock.name = `${id}`;
  inputUnlock.addEventListener("change", (e) => {
    console.log(e.target.value);
    window.localStorage.setItem("STATE", "unlocked");
    let value = window.localStorage.getItem("STATE");
    console.log(`${value} <----`);
  });

  // label unlock
  const labelUnlock = document.createElement("label");
  labelUnlock.innerHTML = "Unlock";

  // inputLock
  const inputLock = document.createElement("input");
  inputLock.type = "radio";
  inputLock.name = id;
  inputLock.value = window.localStorage.getItem("STATE");
  inputLock.checked = true;
  inputLock.addEventListener("change", (e) => {
    console.log(`${e.target.value}`);
    window.localStorage.setItem("STATE", "locked");
  });
  inputLock.id = "lockBtn";

  // label Lock
  const labelLock = document.createElement("label");
  labelLock.innerHTML = "Lock";

  // icon element
  const iconElement = document.createElement("img");
  iconElement.src = "./iconProfile2.png";
  iconElement.classList.add("userIcon");

  // profile div
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile");
  profileDiv.appendChild(iconElement);
  profileDiv.appendChild(labelLock);
  profileDiv.appendChild(inputLock);
  profileDiv.appendChild(labelUnlock);
  profileDiv.appendChild(inputUnlock);
  profileDiv.appendChild(breakLine);
  profileDiv.appendChild(elementHR);
  profileDiv.appendChild(labelUsername);
  profileDiv.appendChild(usernameField);
  profileDiv.appendChild(divHiddenFields);

  const buttonShowMore = document.createElement("button");
  buttonShowMore.textContent = "Show more";

  buttonShowMore.addEventListener("click", handleShowMore);

  profileDiv.appendChild(buttonShowMore);

  // attach to the main element and set the inital value to locked
  window.localStorage.setItem("STATE", "locked");
  const mainElement = document.getElementById("main");
  mainElement.appendChild(profileDiv);
}

async function handleShowMore() {
  try {
    const currentElement = this.parentNode.querySelector("#user1Hiddenfields");
    let item = window.localStorage.getItem("STATE");

    // console.log(item);
    if (
      currentElement &&
      currentElement.style.display === "block" &&
      item === "unlocked"
    ) {
      currentElement.style.display = "none";
      currentElement.querySelector("button").textContent = "Show More";
    } else if (
      currentElement &&
      currentElement.style.display === "none" &&
      item === "unlocked"
    ) {
      currentElement.style.display = "block";
      currentElement.querySelector("button").textContent = "Show Less";
      // console.log(item);
    }
  } catch (err) {
    // TODO There is an error here and I don't know how to optimize the solution to avoid it
  }
}

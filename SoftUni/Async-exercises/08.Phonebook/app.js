function attachEvents() {
  const loadBtn = document.getElementById("btnLoad");
  loadBtn.addEventListener("click", loadData);

  const createBtn = document.getElementById("btnCreate");
  createBtn.addEventListener("click", createData);

  const inputPerson = document.getElementById("person");

  const inputPhone = document.getElementById("phone");
}

// GET request should be made to the server to get all phonebook entries.
async function loadData() {
  const url = "http://localhost:3030/jsonstore/phonebook";
  const res = await fetch(url, { method: "GET" });
  const data = await res.json().then((e) => {
    return Object.entries(e);
  });
  buildEntries(data);
}

async function buildEntries(data) {
  const ul = document.getElementById("phonebook");
  ul.innerHTML = "";
  for (let d of data) {
    let { person, phone, _id } = d[1];
    let btn = document.createElement("button");
    btn.addEventListener("click", (e) => {
      handleDelete(e.target.parentNode);
    });
    btn.textContent = "DELETE";
    let li = document.createElement("li");
    li.id = _id;

    li.textContent = `${person}: ${phone}`;
    li.appendChild(btn);
    // console.log(d[1]); -> the object is in the format {id: {person: _, phone: _, _id}}

    console.log(person, phone, _id);
    ul.appendChild(li);
  }
}

async function handleDelete(li) {
  const url = `http://localhost:3030/jsonstore/phonebook/${li.id}`;
  let res = await fetch(url, { method: "DELETE" });
  let data = await res.json();
  console.log(data);
}

async function createData() {
  const personInput = document.getElementById("person");
  const phoneInput = document.getElementById("phone");

  createContact(personInput.value, phoneInput.value);
}

async function createContact(person, phone) {
  const inputField = document.getElementById("person");
  const phoneField = document.getElementById("phone");

  const message = {
    person: person,
    phone: phone,
  };
  const url = `http://localhost:3030/jsonstore/phonebook/`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(message),
  });
  const data = await res.json();
  //   console.log(data);
  loadData();
  inputField.value = "";
  phoneField.value = "";
}
attachEvents();

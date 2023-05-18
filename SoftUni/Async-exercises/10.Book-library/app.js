console.log("My requests...");
document.getElementById("loadBooks").addEventListener("click", getAllBooks);

document.querySelector("form").addEventListener("submit", (e) => {
  createBooks(e);
});
async function getAllBooks() {
  // clear data
  clearDomElement();
  // make request
  const url = `http://localhost:3030/jsonstore/collections/books`;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();

  const dataArray = Object.entries(data);
  const td = document.querySelector("tbody");

  // create dom elements
  for (let el of dataArray) {
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.addEventListener("click", (e) => handleEdit(e));
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", (e) => handleDelete(e));
    const tdName = document.createElement("td");
    tdName.textContent = el[1].title;
    const tdAuthor = document.createElement("td");
    tdAuthor.textContent = el[1].author;
    const tdButtons = document.createElement("td");
    tdButtons.appendChild(btnEdit);
    tdButtons.appendChild(btnDelete);

    const row = document.createElement("tr");
    row.id = el[0];
    row.appendChild(tdName);
    row.appendChild(tdAuthor);
    row.appendChild(tdButtons);
    td.appendChild(row);
  }
}

async function clearDomElement() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
}

async function createBooks(e) {
  e.preventDefault();
  const titleField = document.querySelector("form input[name='title']");

  const authorField = document.querySelector("form input[name='author']");

  try {
    const url = `http://localhost:3030/jsonstore/collections/books`;
    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        author: titleField.value,
        title: authorField.value,
      }),
    });
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function handleEdit(e) {
  const id = e.target.parentNode.parentNode.id;

  const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  console.log(data);

  const heading = document.querySelector("h3");
  heading.textContent = `EDIT FORM`;
  const titleField = document.querySelector("form input[name='title']");
  titleField.value = data.author;
  const authorField = document.querySelector("form input[name='author']");
  authorField.value = data.title;

  document.querySelector("form").removeEventListener("submit", createBooks);
  document.querySelector("form").addEventListener("submit", (e) => {
    handlePutRequest(e, titleField.value, authorField.value, data._id);
  });
}

async function handleDelete(e) {
  const id = e.target.parentNode.parentNode.id;
  const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
  const res = await fetch(url, { method: "DELETE" });
  const data = await res.json();
  console.log(data);
}

async function handlePutRequest(e, title, author, id) {
  try {
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    let res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    });
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

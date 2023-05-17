function attachEvents() {
  const btnLoadPosts = document.getElementById("btnLoadPosts");
  btnLoadPosts.addEventListener("click", getData);
  const selectElement = document.getElementById("posts");
  selectElement.addEventListener("change", (e) => {
    window.localStorage.setItem("id", e.target.value);
    // console.log(e.target.value);
  });
  const btnViewPost = document.getElementById("btnViewPost");

  btnViewPost.addEventListener("click", (e) => {
    viewData(e.target);
  });

  //   debugger;
}

async function getData() {
  const url = `http://localhost:3030/jsonstore/blog/posts`;
  let res = await fetch(url);
  let data = await res.json();
  dataHandler(data);
}

async function dataHandler(data) {
  let objData = [];
  Object.entries(data).forEach((e) => {
    // console.log(e[1]);
    objData.push(e[1]);
    domHandler(e[1]);
  });
  window.localStorage.setItem("dataArray", objData);
}

async function domHandler({ body, id, title }) {
  const optionElement = document.createElement("option");
  optionElement.value = id;
  optionElement.textContent = title;
  window.localStorage.setItem("dataID", id);
  window.localStorage.setItem("dataID", id);
  window.localStorage.setItem("dataID", id);
  document.getElementById("posts").appendChild(optionElement);
}

async function viewData(e) {
  let itemID = window.localStorage.getItem("id");
  const url = `http://localhost:3030/jsonstore/blog/posts`;
  let res = await fetch(url);
  let data = await res.json();

  const dataID = data[itemID].id;
  const dataBody = data[itemID].body;
  const dataTitle = data[itemID].title;

  const postTitle = document.getElementById("post-title");
  postTitle.textContent = dataTitle;

  const postParagraph = document.getElementById("post-body");
  postParagraph.textContent = dataBody;

  createComments(itemID);
}

async function createComments(id) {
  // console.log(id);
  const postComments = document.getElementById("post-comments");
  postComments.innerHTML = "";
  const url = `http://localhost:3030/jsonstore/blog/comments/`;
  let res = await fetch(url);
  let resData = await res.json();
  let arr = Object.entries(resData);
  for (let ar of arr) {
    if (ar[1].postId === id) {
      let newComment = document.createElement("li");
      newComment.textContent = ar[1].text;
      newComment.id = ar[1].id;
      postComments.appendChild(newComment);
    }
  }
}
attachEvents();

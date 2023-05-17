async function attachEvents() {
  const sendBtn = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");
  sendBtn.addEventListener("click", handleSubmit);
  refreshBtn.addEventListener("click", handleRefresh);
}

async function handleSubmit() {
  let inputs = document.querySelectorAll("input");
  let authorInputValue = inputs[0].value;
  let messageInputValue = inputs[1].value;

  let message = {
    author: authorInputValue,
    content: messageInputValue,
  };

  sendData(message);
}

async function sendData(message) {
  let url = `http://localhost:3030/jsonstore/messenger`;
  await fetch(url, { method: "POST", body: JSON.stringify(message) });

  let inputs = document.querySelectorAll("input");
  let authorInput = inputs[0];
  let messageInput = inputs[1];
  authorInput.value = "";
  messageInput.value = "";
  handleRefresh();
}

async function handleRefresh() {
  const textMessages = document.getElementById("messages");

  const url = `http://localhost:3030/jsonstore/messenger`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(Object.entries(data));
  let elements = Object.entries(data);
  let result = "";
  for (let e of elements) {
    let { author, content } = e[1];

    console.log(`${author} - ${content}`);
    result += `${author}: ${content}\n`;
  }
  textMessages.innerHTML = result;
}
attachEvents();

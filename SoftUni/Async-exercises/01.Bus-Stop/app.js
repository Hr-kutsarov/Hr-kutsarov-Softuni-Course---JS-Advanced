async function getInfo() {
  const inputElement = document.getElementById("stopId");
  const inputValue = inputElement.value;
  const stopName = document.getElementById("stopName");
  const buses = document.getElementById("buses");
  buses.innerHTML = "";
  try {
    const URL = `http://localhost:3030/jsonstore/bus/businfo/${inputValue}`;
    let response = await fetch(URL, {
      method: "GET",
    });

    const data = await response.json();
    stopName.textContent = data["name"];
    Object.entries(data.buses).forEach(([id, time]) => {
      let newLiElement = document.createElement("li");
      newLiElement.innerText = `Bus ${id} arrives in ${time} minutes`;
      buses.appendChild(newLiElement);
    });
  } catch (error) {
    stopName.textContent = "Error";
  }
}

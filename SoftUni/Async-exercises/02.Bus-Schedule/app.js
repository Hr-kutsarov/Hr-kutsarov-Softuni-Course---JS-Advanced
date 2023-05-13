function solve() {
  const btnDepart = document.getElementById("depart");
  const btnArrive = document.getElementById("arrive");

  const textElement = document.querySelector(".info");
  let stopName = "depot";
  let next = "depot";

  async function depart() {
    try {
      let response = await fetch(
        `http://localhost:3030/jsonstore/bus/schedule/${next}`
      );
      let data = await response.json();
      next = data.next;
      stopName = data.name;
      textElement.textContent = `Next stop ${stopName}`;
      btnDepart.disabled = true;
      btnArrive.disabled = false;
    } catch (error) {
      textElement.textContent = `Error`;
      btnDepart.disabled = true;
      btnArrive.disabled = true;
    }
  }

  function arrive() {
    textElement.textContent = `Arriving at ${stopName}`;
    btnDepart.disabled = false;
    btnArrive.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();

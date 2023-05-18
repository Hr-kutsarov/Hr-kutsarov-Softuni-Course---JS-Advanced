document.getElementById("form").addEventListener("submit", (e) => {
  handleSubmit(e);
});

async function handleSubmit(e) {
  e.preventDefault();
  clearTable();
  createStudent();
  getStudents();
}

async function getStudents() {
  const url = `http://localhost:3030/jsonstore/collections/students`;
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  let dataArray = Object.entries(data);

  console.log(dataArray);
  createDomElements(dataArray);
}

async function createDomElements(data) {
  for (let el of data) {
    // console.log(`What each element looks like: {k: 'v'}`);
    const { firstName, lastName, facultyNumber, grade, _id } = el[1];
    createRow(firstName, lastName, facultyNumber, grade, _id);
  }
}

async function createRow(first, last, num, grade, id) {
  const table = document.getElementById("results");
  const tableBody = table.getElementsByTagName("tbody")[0];
  //

  let tdName = document.createElement("td");
  tdName.innerHTML = first;
  let tdLast = document.createElement("td");
  tdLast.innerHTML = last;
  let tdNum = document.createElement("td");
  tdNum.innerHTML = num;
  let tdGrade = document.createElement("td");
  tdGrade.innerHTML = grade;
  let row = document.createElement("tr");
  row.appendChild(tdName);
  row.appendChild(tdLast);
  row.appendChild(tdNum);
  row.appendChild(tdGrade);
  tableBody.appendChild(row);
}

async function createStudent() {
  const firstName = document.querySelector(
    "form[id='form'] input[name='firstName']"
  );
  const lastName = document.querySelector(
    "form[id='form'] input[name='lastName']"
  );
  const facultyNumber = document.querySelector(
    "form[id='form'] input[name='facultyNumber']"
  );
  const grade = document.querySelector("form[id='form'] input[name='grade']");

  dataHandler(
    firstName.value,
    lastName.value,
    facultyNumber.value,
    grade.value
  );
}

async function dataHandler(fname, lname, facultyNumber, grade) {
  //   console.log(`${fname} ${lname} ${facultyNumber} ${grade}`);

  clearInputData();
  if (fname !== "" && lname !== "" && facultyNumber !== "" && grade !== "") {
    try {
      const res = await fetch(
        "http://localhost:3030/jsonstore/collections/students",
        {
          method: "POST",
          body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            grade: grade,
            facultyNumber: facultyNumber,
          }),
        }
      );
      const data = await res.json();

      // returns the server response with the created object
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("wrong data");
  }
}

async function clearInputData() {
  document.querySelector("form[id='form'] input[name='firstName']").value = "";
  document.querySelector("form[id='form'] input[name='lastName']").value = "";
  document.querySelector("form[id='form'] input[name='facultyNumber']").value =
    "";
  document.querySelector("form[id='form'] input[name='grade']").value = "";
}

async function clearTable() {
  const table = document.getElementById("results");
  const tableBody = table.querySelector("tbody");
  tableBody.innerHTML = "";
}

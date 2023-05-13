const globals = {
  City: "",
  Sunny: "&#x2600",
  "Partly sunny": "&#x26C5",
  Overcast: "&#x2601;",
  Rain: "&#x2614;",
  Degrees: "&#176;",
  cityName: "",
  forecastUpcoming: {},
};

// add a function to the only button that can be clicked on the page
function attachEvents() {
  document.getElementById("submit").addEventListener("click", handleClick);
}

// this function gets the user input and gives it to another function which will handle this action
function handleClick() {
  const inputField = document.getElementById("location");
  const inputValue = inputField.value;

  // if the page contains old results reload the entire page and try again - scuffed but avoids overcluttering of the elements
  const visible = document.getElementById("forecast").style.display == "block";
  if (!!visible === true) {
    location.reload();
  } else {
    requestData(inputValue);
  }
}

// calls the server with the requested data as string
async function requestData(string) {
  try {
    const url = "http://localhost:3030/jsonstore/forecaster/locations";
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    // finds an object on the server
    const city = data.find((e) => e.name === string);
    // just push all of the data into one object called globals and then access the data from there

    globals["cityName"] = city.name;
    globals["cityCode"] = city.code;

    // used those so I don't have to type every time I want to test the application
    // globals["cityName"] = "Barcelona";
    // globals["cityCode"] = "barcelona";

    getForecastInfo(globals["cityCode"]);
  } catch (err) {
    alert("Valid strings are 'Barcelona', 'New York', 'London");
  }
}

async function getForecastInfo(code) {
  const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
  const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code} `;

  const promiseToday = fetch(urlToday, { method: "GET" });
  const promiseUpcoming = fetch(urlUpcoming, { method: "GET" });

  // combine both requests
  // - getting information about upcoming info
  let result = await Promise.all([promiseToday, promiseUpcoming]);
  let dataTomorrow = await result[0].json();
  globals["cityName"] = dataTomorrow.name;
  globals["dataTomorrow"] = dataTomorrow.forecast;

  let dataUpcoming = await result[1].json();
  globals["dataUpcoming"] = dataUpcoming.forecast;

  const forecastElement = document.getElementById("forecast");
  forecastElement.style.display = "block";

  try {
    createTodayForecast(globals["dataTomorrow"]);
  } catch (err) {
    console.log(err);
  }
  try {
    createUpcomingForecast(globals["dataUpcoming"]);
  } catch (err) {
    console.log(err);
  }
}

// creates the upper section of the dom
function createTodayForecast(data) {
  let base = document.getElementById("current");

  const nameSpan = document.createElement("span");
  nameSpan.classList.add("forecast-data");
  nameSpan.innerHTML = globals["cityName"];

  const tempSpan = document.createElement("span");
  tempSpan.classList.add("forecast-data");
  tempSpan.innerHTML = `${data["low"]}${globals["Degrees"]}/${data["high"]}${globals["Degrees"]}`;

  const conditionSpan = document.createElement("span");
  conditionSpan.classList.add("forecast-data");
  conditionSpan.innerHTML = data["condition"];

  const leftDiv = document.createElement("span");
  leftDiv.classList.add("symbol");
  leftDiv.classList.add("condition");
  leftDiv.innerHTML = globals[data.condition];

  const rightDiv = document.createElement("span");
  rightDiv.classList.add("condition");
  rightDiv.appendChild(nameSpan);
  rightDiv.appendChild(tempSpan);
  rightDiv.appendChild(conditionSpan);

  const forecastsDiv = document.createElement("div");
  forecastsDiv.classList.add("forecasts");
  forecastsDiv.appendChild(leftDiv);
  forecastsDiv.appendChild(rightDiv);
  base.appendChild(forecastsDiv);
}

// creates the lower section
function createUpcomingForecast(dataArray) {
  const parent = document.getElementById("upcoming");
  const wrapper = document.createElement("div");
  wrapper.classList.add("forecast-info");

  for (let i = 0; i < dataArray.length; i++) {
    let el = createUpcomingForecastElement(dataArray[i]);
    wrapper.appendChild(el);
  }
  parent.appendChild(wrapper);
}

function createUpcomingForecastElement(data) {
  const spanSymbol = document.createElement("span");
  spanSymbol.classList.add("symbol");
  spanSymbol.innerHTML = globals[data.condition];

  const spanTemp = document.createElement("span");
  spanTemp.classList.add("forecast-data");
  spanTemp.innerHTML = `${data.low}${globals["Degrees"]}/${data.high}${globals["Degrees"]}`;

  const spanCondition = document.createElement("span");
  spanCondition.classList.add("forecast-data");
  spanCondition.innerHTML = data.condition;

  const upcomingSpan = document.createElement("span");
  upcomingSpan.classList.add("upcoming");
  upcomingSpan.appendChild(spanSymbol);
  upcomingSpan.appendChild(spanTemp);
  upcomingSpan.appendChild(spanCondition);

  return upcomingSpan;
}
attachEvents();

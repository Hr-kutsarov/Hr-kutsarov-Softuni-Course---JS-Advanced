function solve() {
  let txtElement = document.getElementById("text");
  let conventionElement = document.getElementById("naming-convention");
  let outputResult = document.getElementById("result");

  function formatPascalCase(txt) {
    let arr = txt.split(" ");
    let result = "";
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        result += arr[i].slice().toLowerCase();
      } else {
        result += arr[i].charAt(0).toUpperCase();
        result += arr[i].slice(1).toLowerCase();
      }
    }
    outputResult.textContent = result;
  }

  function formatCamelCase(txt) {
    let arr = txt.split(" ");
    let result = "";
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        result += arr[i].charAt(0).toUpperCase();
        result += arr[i].slice(1).toLowerCase();
      } else {
        result += arr[i].charAt(0).toUpperCase();
        result += arr[i].slice(1).toLowerCase();
      }
    }
    outputResult.textContent = result;
  }

  if (conventionElement.value === "Camel Case") {
    formatCamelCase(txtElement.value);
  } else if (conventionElement.value === "Pascal Case") {
    formatPascalCase(txtElement.value);
  } else {
    outputResult.textContent = "Error!";
  }
}

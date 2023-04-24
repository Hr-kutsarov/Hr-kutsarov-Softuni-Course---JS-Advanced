function subtract() {
  let firstNumElement = document.getElementById("firstNumber");
  let secondNumElement = document.getElementById("secondNumber");
  let result = document.getElementById("result");
  result.textContent = (firstNumElement.value - secondNumElement.value).toFixed(
    2
  );
}

function search() {
  // An HTML page holds a list of towns, a search box, and a [Search] button.
  // Implement the search function to bold and underline the items from the list
  // which include the text from the search box. Also, print the number of items the
  // current search matches in the format `${matches} matches found`.

  let towns = Array.from(document.querySelectorAll("li"));
  let searchTextElement = document.getElementById("searchText");
  let searchText = searchTextElement.value;
  let resultElement = document.getElementById("result");
  let foundElements = 0;

  function clearStyles(el) {
    el.style.textDecoration = "none";
    el.style.fontWeight = "initial";
  }
  for (let t of towns) {
    clearStyles(t);
    let text = t.textContent;

    if (text.includes(searchText)) {
      t.style.textDecoration = "underline";
      t.style.fontWeight = "bold";
      foundElements += 1;
    }
  }

  if (foundElements === 1) {
    resultElement.textContent = `${foundElements} match found`;
  } else {
    resultElement.textContent = `${foundElements} matches found`;
  }
}

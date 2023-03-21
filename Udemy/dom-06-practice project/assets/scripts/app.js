// get the card
const addMovieModalElement = document.getElementById("add-modal");
// get the add button
const startAddMovieButton = document.querySelector("header button");
// grey background that disables mouse actions
const backdropElement = document.getElementById("backdrop");
// my cancel button
const cancelBtnAddMovieModal = document.getElementById("modal-cancel");
// my add movie button
const addBtnAddMovieModal = document.getElementById("modal-add");

// form inputs
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image-url");
const ratingInput = document.getElementById("rating");

const movies = [];

// ALL MOVIES SECTION
const entryTextSection = document.getElementById("entry-text");
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

// CREATE SECTION
const toggleBackdrop = () => {
  backdropElement.classList.toggle("visible");
};

let toggleMovieModal = () => {
  // combine {if open -> close, if closed -> open}
  addMovieModalElement.classList.toggle("visible");
  toggleBackdrop();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

const cancelBtnAddModalHandler = () => {
  toggleMovieModal();
};

// collect data from the form when pressing the ADD button
const addMovieHandler = () => {
  let titleInputValue = titleInput.value;
  let imageInputValue = imageInput.value;
  let ratingInputValue = ratingInput.value;

  if (
    titleInputValue.trim() === "" ||
    imageInputValue.trim() === "" ||
    ratingInputValue.trim() === "" ||
    +ratingInputValue < 1 ||
    +ratingInputValue > 5
  ) {
    alert(
      "Please enter valid values (Rating accepts only values between 1 and 5)"
    );
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleInputValue,
    image: imageInputValue,
    rating: ratingInputValue,
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearInputs();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};


// DELETE ELEMENTS
const clearInputs = () => {
  let userInputs = document.querySelectorAll("input");
  for (const input of userInputs) {
    input.value = "";
  }
};

const deleteMovieHandler = () {

}
// select the entry-text section if we have movies

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdropElement.addEventListener("click", toggleMovieModal);
cancelBtnAddMovieModal.addEventListener("click", cancelBtnAddModalHandler);
addBtnAddMovieModal.addEventListener("click", addMovieHandler);

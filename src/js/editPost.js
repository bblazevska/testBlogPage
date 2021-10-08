const inputTitle = document.querySelector(".input-title");
const selectCategory = document.querySelector(".select-category");
const inputImgUrl = document.querySelector(".input-imgUrl");
const inputShortDescription = document.querySelector(
  ".input-short-description"
);
const inputContent = document.querySelector(".input-content");
const inputDate = document.querySelector(".input-date");
const inputImages = document.querySelectorAll(".input-images");
const inputRecipeTitle = document.querySelector(".input-rtitle");
let inputIngredients = document.querySelectorAll(".input-ingredients");
let inputToppings = document.querySelectorAll(".input-toppings");
const inputInstructions = document.querySelector(".input-instructions");
const btnSubmit = document.querySelector(".btn-submit");
const btnAddIngredient = document.querySelector(".add-btn-ingredient");
const btnAddTopping = document.querySelector(".add-btn-topping");
const btnPostEdit = document.querySelector(".btn-submit");

const postId = window.location.href.split("=")[1];
console.log(postId);



const addInput = function (e) {
  let inputHtml;

  if (e.target.id === "add-ingredient-input") {
    inputHtml =
      '<input type="text" name="ingredients" class="new-post__field--input multiple input-ingredients" maxlength="100" placeholder="Indredient" required>';
    document
      .querySelector(".ingredients-container")
      .insertAdjacentHTML("beforeend", inputHtml);
    inputIngredients = document.querySelectorAll(".input-ingredients");
    console.log(inputIngredients);
  } else if (e.target.id === "add-topping-input") {
    inputHtml =
      '<input type="text" name="toppings" class="new-post__field--input multiple input-toppings" maxlength="100" placeholder="Topping" required>';
    document
      .querySelector(".toppings-container")
      .insertAdjacentHTML("beforeend", inputHtml);
    inputToppings = document.querySelectorAll(".input-toppings");
  }
};

const imagesArr = Array.from(inputImages);
const ingredientsArr = Array.from(inputIngredients);
const toppingsArr = Array.from(inputToppings);

const populateData = function (data) {
  inputTitle.value = data.title;
  selectCategory.value = data.category;
  inputShortDescription.value = data.description;
  inputImgUrl.value = data.imageUrl;
  inputContent.value = data.content;
  inputDate.value = data.date;
  inputRecipeTitle.value = data.recipe.rtitle;
  imagesArr.map((img, i) => (img.value = data.images[i]));
  ingredientsArr.map(
    (ing, i) => (ing.value = data.recipe.ingredients[i])
  );
  toppingsArr.map(
    (topping, i) => (topping.value = data.recipe.toppings[i])
  );
  inputInstructions.value = data.recipe.instructions;
};

const updatePost = function (e) {
  e.preventDefault();
  const editedPost = {
    id: postId,
    title: inputTitle.value,
    category: selectCategory.value,
    description: inputShortDescription.value,
    imageUrl: inputImgUrl.value,
    content: inputContent.value,
    date: inputDate.value !== "" ? inputDate.value : date,
    images: Array.from(inputImages).map((inp) => inp.value),
    recipe: {
      rtitle: inputRecipeTitle.value,
      ingredients: Array.from(inputIngredients).map((inp) => inp.value),
      toppings: Array.from(inputToppings).map((inp) => inp.value),
      instructions: inputInstructions.value,
    },
  };

  console.log(editedPost);
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedPost),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("Success:", data);
      window.location = `/postView.html?id=${data.id}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error);
    });
  //  window.location = `http://localhost:5500/postView.html?id=${postId}`;
};

fetch(`http://localhost:3000/posts/${postId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    populateData(data);
  })
  .catch((err) => console.log(new Error(`${err.message}`)));

[btnAddIngredient, btnAddTopping].forEach((btn) =>
  btn.addEventListener("click", addInput)
);

btnPostEdit.addEventListener("click", updatePost);

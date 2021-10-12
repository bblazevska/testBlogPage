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

// Getting the errors
const errors = [];
const getErrors =  async function(){
    try{
      const res = await fetch("http://localhost:3000/errors");
      if (!res.ok) throw new Error('Unexpected error');

      const data = await res.json();
      data.forEach(d => errors.push(d))
        
    }catch(err){
        console.error(err);
    }
    
}
getErrors();

const addInput = function (e) {
  let inputHtml;

  if (e.target.id === "add-ingredient-input") {
    inputHtml = `<div class="new-post__input-container" id="ing-${numIng}">
            <input type="text" name="ingredients" class="new-post__field--input multiple input-ingredients" maxlength="100" placeholder="Ingredient" required>
            <button class="new-post__field--delete-btn delete-btn-input">
              <ion-icon id="delete-ingredient-input" name="close-outline" class="new-post__field--close-icon "></ion-icon>
            </button>
          </div>`;
    document
      .querySelector(".ingredients-container")
      .insertAdjacentHTML("beforeend", inputHtml);
    inputIngredients = document.querySelectorAll(".input-ingredients");
    console.log(inputIngredients);
    numIng++;
  } else if (e.target.id === "add-topping-input") {
    inputHtml = `
        <div class="new-post__input-container" id="topping-${numToppings}">
            <input type="text" name="toppings" class="new-post__field--input multiple input-toppings" maxlength="100" placeholder="Topping" required>
            <button class="new-post__field--delete-btn delete-btn-input">
                <ion-icon id="delete-ingredient-input" name="close-outline" class="new-post__field--close-icon "></ion-icon>
            </button>
        </div>`;
    document
      .querySelector(".toppings-container")
      .insertAdjacentHTML("beforeend", inputHtml);
    inputToppings = document.querySelectorAll(".input-toppings");
    numToppings++;
  }
};

const imagesArr = Array.from(inputImages);
const ingredientsArr = Array.from(inputIngredients);
const toppingsArr = Array.from(inputToppings);
let numIng = ingredientsArr.length;
let numToppings = toppingsArr.length;

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

const uploadData = function(data){
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
}
const validateInputs = function () {
  if (inputTitle.value.length < 10 || inputTitle.value === "") {
    alert(errors[1].fields.title)
    inputTitle.focus();
  } else {
    return inputTitle.value;
  }

  if (inputImgUrl.pattern !== 'https://.*') {
    alert(errors[1](errors[1].fields.imageUrl));
    inputImgUrl.focus();
  } else return inputImgUrl.value;
}

const updatePost = function (e) {
  e.preventDefault();
  const editedPost = {
    id: postId,
    title: validateInputs(),
    category: selectCategory.value,
    description: inputShortDescription.value,
    imageUrl: validateInputs(),
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


const inputTitle = document.querySelector('.input-title');
const selectCategory = document.querySelector('.select-category');
const inputImgUrl = document.querySelector('.input-imgUrl');
const inputShortDescription = document.querySelector('.input-short-description');
const inputContent = document.querySelector('.input-content');
const inputDate = document.querySelector('.input-date');
const inputImages = document.querySelectorAll('.input-images');
const inputRecipeTitle = document.querySelector('.input-rtitle')
let inputIngredients = document.querySelectorAll('.input-ingredients');
let inputToppings = document.querySelectorAll('.input-toppings');
const inputInstructions = document.querySelector('.input-instructions');
const btnSubmit = document.querySelector('.btn-submit');
const btnAddIngredient = document.querySelector(".add-btn-ingredient");
const btnAddTopping = document.querySelector(".add-btn-topping");
const newPostForm = document.querySelector('.new-post-form');
let deleteBtnInput = document.querySelectorAll(".delete-btn-ingredient");

let date = new Date();
date = date.toDateString().split(" ").splice(1).join(" ");

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
console.log(errors);


const generateUniqueId = () => { return Date.now() };

const clearInputs = function () {
    selectCategory.value = 'Choose category';
    inputTitle.value = inputImgUrl.value = inputShortDescription.value = inputContent.value = inputDate.value = inputImages.value = inputIngredients.value = inputToppings.value = inputInstructions.value = '';
}


const uploadPost = function (newPost) {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
        .then((data) => {
        window.location = `/postView.html?id=${data.id}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    clearInputs();
}



let numIng = inputIngredients.length;
console.log(numIng);
let numToppings = inputToppings.length;
console.log(numToppings);

const addInput = function (e) {
  let inputHtml;
 
  if (e.target.id === "add-ingredient-input") {
      inputHtml =
        `<div class="new-post__input-container" id="ing-${numIng}">
            <input type="text" name="ingredients" class="new-post__field--input multiple input-ingredients" maxlength="100" placeholder="Ingredient" required>
            <button class="new-post__field--delete-btn delete-btn-input">
              <ion-icon id="delete-ingredient-input" name="close-outline" class="new-post__field--close-icon "></ion-icon>
            </button>
          </div>`;
      document
        .querySelector(".ingredients-container")
      .insertAdjacentHTML("beforeend", inputHtml);
    inputIngredients = document.querySelectorAll(".input-ingredients");
    deleteBtnInput = document.querySelectorAll(".delete-btn-input");
    numIng++;
    console.log(inputIngredients);
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
    deleteBtnInput = document.querySelectorAll(".delete-btn-input");
    numToppings++;
    console.log(numToppings);
  }
}

const deleteInput = function (e) {
  console.log(e.target.id);
  let clickedInputID;
  let deletedEl;

  if (e.target.id === 'delete-ingredient-input') {
    clickedInputID = e.target.closest(".new-post__input-container").id;
    console.log(clickedInputID);
    deletedEl = document.querySelector(`#${clickedInputID}`);
    console.log(deletedEl);
    document.querySelector('.ingredients-container').removeChild(deletedEl);
    inputIngredients = document.querySelectorAll('.input-ingredients');
    deleteBtnInput = document.querySelectorAll(".delete-btn-input");
    numIng--;
    console.log(inputIngredients);
  } else if (e.target.id === 'delete-topping-input') {
    
  }
}

const validateData = function () {
  if (inputTitle.value.length < 10 || inputTitle.value === '') {
    alert(errors[1].fields.title);
    inputTitle.focus();
    return false;
  }
  if (selectCategory.value === '') {
    alert('Please select a category');
    selectCategory.focus();
    return false;
  }
  if (inputImgUrl.value === '') {
    alert(errors[1].fields.imageUrl);
    inputImgUrl.focus();
    return false;
  }

  
}

const handleSubmit = function (e) {
  e.preventDefault();
  if (validateData) {
    const newPost = {
      id: generateUniqueId(),
      title:  inputTitle.value,
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
    uploadPost(newPost);
  }
};


//Events



[btnAddIngredient, btnAddTopping].forEach(btn => btn.addEventListener('click', addInput));

console.log(deleteBtnInput);
deleteBtnInput.forEach(btn => btn.addEventListener('click', deleteInput));

newPostForm.addEventListener('submit', handleSubmit);
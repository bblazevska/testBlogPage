
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
    inputToppings= document.querySelectorAll(".input-toppings");
    }
}
const handleSubmit = function (e) {
  e.preventDefault();
  const newPost = {
    id: generateUniqueId(),
    title: inputTitle.value.length < 10 || inputTitle.value ==='' ? alert(errors[1].fields.title) : inputTitle.value,
    category: selectCategory.value,
    description: inputShortDescription.value,
    imageUrl: inputImgUrl.value === '' ? alert(errors[1].fields.imageUrl) : inputImgUrl.value,
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
};


//Events
// btnSubmit.addEventListener('click', handleSubmit);
  console.log(btnAddTopping);
[btnAddIngredient, btnAddTopping].forEach(btn => btn.addEventListener('click', addInput));


// btnAddIngredient.addEventListener('click',addInput)

newPostForm.addEventListener('submit', handleSubmit)
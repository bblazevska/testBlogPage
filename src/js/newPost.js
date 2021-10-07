
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

const errors = [];
const getErrors =  function(){
    try{

        fetch('localhost:3000/errors')
        .then(res => res.json())
        .then(data => console.log(data)
        )
        .catch(err => new Error(`${err.message}`));
        
    }catch(err){
        console.error(err);
    }
    
}
getErrors();


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
          console.log(data);
        console.log("Success:", data);
        window.location = `/postView.html?id=${data.id}`;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
    clearInputs();
}


const handleSubmit = function (e) {
    e.preventDefault();
  console.log(e.target);
    const newPost = {
      id:  generateUniqueId(),
      title: inputTitle.value,
      category: selectCategory.value,
      description: inputShortDescription.value,
      imageUrl: inputImgUrl.value,
      content: inputContent.value,
      date: inputDate.value !== '' ? inputDate.value : date ,
      images: Array.from(inputImages).map((inp) => inp.value),
        recipe: {
            rtitle: inputRecipeTitle.value,
            ingredients: Array.from(inputIngredients).map((inp) => inp.value),
            toppings: Array.from(inputToppings).map((inp) => inp.value),
            instructions: inputInstructions.value,
        }    
    };

    uploadPost(newPost);
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

btnSubmit.addEventListener('click', handleSubmit);
  console.log(btnAddTopping);
[btnAddIngredient, btnAddTopping].forEach(btn => btn.addEventListener('click', addInput));
// btnAddIngredient.addEventListener('click',addInput)
// newPostForm.addEventListener('submit', handleSubmit)
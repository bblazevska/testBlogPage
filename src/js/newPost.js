
const inputTitle = document.querySelector('.input-title');
const selectCategory = document.querySelector('.select-category');
const inputImgUrl = document.querySelector('.input-imgUrl');
const inputShortDescription = document.querySelector('.input-short-description');
const inputContent = document.querySelector('.input-content');
const inputImages = document.querySelectorAll('.input-images');
const inputIngredients = document.querySelectorAll('.input-ingredients');
const inputToppings = document.querySelectorAll('.input-toppings');
const inputInstructions = document.querySelector('.input-instructions');

const date = new Date();
const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

const errors = [];
const getErrors =  function(){
    try{

        fetch('localhost:3000/errors')
        .then(res => res.json())
        .then(data => console.log(data)
        )
        .catch(err => new Error(`${err.message}`));
        console.log(errors);
    }catch(err){
        console.error(err);
    }
    
}
getErrors();

console.log(selectCategory.text);
console.log(Array.from(inputImages).map(inp=> inp.value));
console.log(inputInstructions.value);

const newPost = {
    title: inputTitle.value,
    category: selectCategory.value,
    description: inputShortDescription.value,
    imageUrl: inputImgUrl.value,
    content: inputContent.value,
    date:  `${month +1} ${day}, ${year}`,
    images: Array.from(inputImages).map(inp=> inp.value),
    ingredients: Array.from(inputIngredients).map(inp=> inp.value),
    toppings: Array.from(inputToppings).map(inp=> inp.value),
    instructions: inputInstructions.value
}
console.log(newPost.date);

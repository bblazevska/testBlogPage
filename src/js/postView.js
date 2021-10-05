const postContainer = document.querySelector("#post-container");
const url = window.location.href;
const id = url.split("=")[1];
console.log(id);
console.log(postContainer);
const generateStoryMarkup = function (data) {
   console.log(data);
   console.log('Generating markup');
   console.log(data.title);
   const html = `
         <section class="post__header">
            <img src="${data.imageUrl}">
            <div class="post-view__heading">
               <span class="post-view__heading--date ml-sm">${data.category}, ${data.date}</span>
               <h2 class="heading-secondary">${data.title}</h2>
               <span class="post-view__heading--subtitle">${data.description}</span>
            </div>
         </section>
         <section class="post__description">
            <p class="post-view__description__text">
               ${data.content}
            </p>
         </section>
         <section class="post__gallery">
         ${data.images.map(renderImages).join('')}
         </section>
         
         <section class="post__recipe">
            <h3 class="heading-tertiary">${data.recipe.recipe - title}</h3>
            <span class="recipe__ingredients--title">Ingredients</span>
            <ul class="recipe__ingredients-list">
               ${data.ingredients.map(generateIngredientsMarkup).join('')}
            </ul>
            <span class="recipe__ingredients--title">Toppings</span>
            <ul class="recipe__ingredients-list">
               ${data.toppings.map(generateIngredientsMarkup).join('')}
            </ul>
            
            <p class="recipe__instructions">
               ${story.recipe.instructions}
            </p>
         </section>
   `;
   console.log('Appending markup');
   postContainer.insertAdjacentHTML('afterbegin',html);
   console.log(postContainer);
};
const generateIngredientsMarkup = function (ing) {
   return `<li class="recipe__ingridients--item">${ing}</li>`;
}
const renderImages = function (img, i) {
   console.log(img,i);
   return `<img src="${img}" alt="" class="post-view__gallery-img__${i + 1}"></img>`;
}


//Getting the POST   
fetch(`http://localhost:3000/posts/${id}`)
  .then((res) => res.json())
  .then((data) => generateStoryMarkup(data))
  .catch((err) => console.log(new Error(`${err.message}`)));

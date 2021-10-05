console.log('Recipes Page');
let btnRead;
const recipesContainer = document.querySelector("#recipes-container");

const generateRecipeCard = function (data) {
  console.log(data);
  const html = `
      <div class="recipe" id="${data.id}">
         <figure class="recipe__img-box">
            <img src="${data.imageUrl}" alt="First recipe" class="recipe__img">
            <figcaption class="recipe__description">
               <span class="recipe__date">${data.date}</span>
               <h2 class="heading-recipe">${data.recipe.rtitle}</h2>
               <a href="http://localhost:5500/postView.html?id=${data.id}" id="read-story" class="btn btn__post">Read more</a>
            </figcaption>
         </figure>
      </div>
   `;
  recipesContainer.insertAdjacentHTML("afterbegin", html);
};

fetch(`http://localhost:3000/posts?_page=1&_limit=12`)
  .then((res) => res.json())
   .then((data) => {
     console.log(data);
      data.forEach((post) => {
         generateRecipeCard(post);
      })
   }
  )
  .catch((err) => new Error(`${err.message}`));

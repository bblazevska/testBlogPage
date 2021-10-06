console.log('Recipes Page');
let btnRead;
let allPosts = [];

const recipesContainer = document.querySelector("#recipes-container");
const searchSelect = document.querySelector(".filter-recipes__select");


const generateRecipeCard = function (data) {
//   console.log(data);
  const html = `
      <div class="recipe" id="${data.id}">
         <figure class="recipe__img-box">
            <img src="${data.imageUrl}" alt="First recipe" class="recipe__img">
            <figcaption class="recipe__description">
               <span class="recipe__category">${data.category}, &nbsp;</span>
               <span class="recipe__date">${data.date}</span>
               <h2 class="heading-recipe">${data.recipe.rtitle}</h2>
               <a href="http://localhost:5500/postView.html?id=${data.id}" id="read-story" class="btn btn__post">Read more</a>
            </figcaption>
         </figure>
      </div>
   `;
  recipesContainer.insertAdjacentHTML("afterbegin", html);
};

const renderData = function (url) {
   fetch(url)
   .then((res) => res.json())
   .then((data) => {
      data.forEach((post) => {
         recipesContainer.innerHTML = "";
         generateRecipeCard(post);
      })
   }
   )
   .catch((err) => new Error(`${err.message}`));
}


const renderSearchResults = function(e){
   const cat = e.target.value;
   if (cat !== "") {
      fetch(`http://localhost:3000/posts?_page=1&_limit=9&category=${cat}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          recipesContainer.innerHTML = "";
          data
            .map((post) => generateRecipeCard(post))
            .filter((post) => post.category === e.target.value);
          //  console.log(data);
        })
        .catch((err) => new Error(`${err.message}`));
   } else renderData(`http://localhost:3000/posts?_page=1&_limit=9`)
}
   
searchSelect.addEventListener('change', renderSearchResults);
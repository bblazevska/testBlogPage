console.log('Recipes Page');
let btnRead;
let allPosts = [];
let curPage = 1;
const recipesContainer = document.querySelector("#recipes-container");
const searchSelect = document.querySelector(".filter-recipes__select");
const paginationContainer = document.querySelector('.pagination');
const btnLoadMore = document.querySelector(".btn__load-more");

const generateRecipeCard = function (data) {
  console.log(data.recipe,data.id);
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
  recipesContainer.insertAdjacentHTML("beforeend", html);
};

const renderSearchResults = function(e){
   const cat = e.target.value;
   curPage = 1
   console.log(cat);
   if (cat !== "") {
      fetch(`http://localhost:3000/posts?_page=${curPage}&_limit=9&category=${cat}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            recipesContainer.innerHTML = '';
            data
               .map((post) => generateRecipeCard(post))
               .filter((post) => post.category === e.target.value);
         })
         .catch((err) => new Error(`${err.message}`));
   } else if (cat === '')
      handleLoadData();     
}


const getData = async function () {
  const res = await fetch(
    `http://localhost:3000/posts?_page=${curPage}&_limit=6`
  );
  console.log(res);
  if (!res.ok) throw new Error(`Error loading data (${res.status})`);
  const data = await res.json();
   console.log(data);
   
   data.map((post) => {
      console.log(post);
      generateRecipeCard(post)
   });
};

const handleLoadData = function () {
   try {
   recipesContainer.innerHTML = "";
    getData();
  } catch (err) {
    console.error(err);
  }
};

const handleLoadMore = function (e) {
   e.preventDefault();
   curPage++;
   getData();
}

window.addEventListener("load", handleLoadData);

searchSelect.addEventListener('change', renderSearchResults);

btnLoadMore.addEventListener('click', handleLoadMore);
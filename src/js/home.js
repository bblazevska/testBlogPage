"use strict";

let btnMore;
// const cardImage = document.querySelector(".post__img");
// const postsContainer = document.querySelector("#posts-container");
// const paginationContainer = document.querySelector(".pagination");
// const scrollToPagination = document.querySelector('.section-intro');

var allPosts =[];
const postsPerPage = 9;
let curPage = 1;
let postsNum;

const mainSection = document.getElementById('home-page');

const heroContainer = document.createElement('div');
heroContainer.classList.add('hero-container');
heroContainer.innerHTML = `<div class="hero-container__text">
               <h1 class="heading-primary">Food always tastes better, when it’s shared!</h1>
               <span class="header-text">Get to know other foodies, have a look into their kitchens and enjoy recipes,
                  that are easy to prepare.</span>
            </div>`;

const introSection = document.createElement('section');
introSection.classList.add('section-intro');
introSection.innerHTML = `
        <h2 class="heading-secondary">Our blog is for      foodies and cake-lovers.  </h2>
        <p class="paragraph">Here you can find various food stories and delicious free recipes. All our recipes are gluten-free and vegetarian, some are vegan.</p>`;
const postsContainer = document.createElement('section');
postsContainer.id = 'posts-container';
postsContainer.classList.add('section-posts');

const paginationContainer = document.createElement('div');
paginationContainer.classList.add('pagination');
paginationContainer.innerHTML = `<button  class="pagination__btn btn-prev">
               <ion-icon id="prev" name="chevron-back-outline" class="pagination__icon"></ion-icon>
            </button>
            <button class="pagination__number" id="1">1</button>
            <button class="pagination__number" id="2">2</button>
            <button class="pagination__number" id="3">3</button>

            <span class="pagination__dots">. . .</span>
            <button class="pagination__number" id="6">6</button>
            <button id="next" class="pagination__btn btn-next">
               <ion-icon id="next" name="chevron-forward-outline" class="pagination__icon"></ion-icon>
            </button>`;

const promoSection = document.createElement('section');
promoSection.classList.add('section-promo');
promoSection.innerHTML = `<div class="promo">
               <div class="promo__book">
                  <img src="./src/img/cookbook-small.jpg" alt="">
               </div>
               <div class="promo__box">
                  <span class="promo__box--subtitle">Order Our Book Now</span>
                  <p class="promo__box--text">We are very excited to share our first book with you in collaboration with the talented team at Frama Cph. Get inspired
                  by 19 new gluten-free recipes with lot'sofpictures next to captivating design content.</p>
                  <button class="promo__btn">Order here</button>
               </div>
            </div>`;

const newsLetterSection = document.createElement('section');
newsLetterSection.classList.add('section-newsletter');
  mainSection.insertAdjacentElement("beforeend", paginationContainer);
newsLetterSection.innerHTML = `<ion-icon name="mail-outline" class="newsletter__icon"></ion-icon>
            <h2 class="heading-secondary">We also post things via Mail. Sign up for our Newsletter.</h2>
            <div class="newsletter__mail-box">
               <input type="email" class="newsletter__input" placeholder="Enter email">
               <button class=" btn newsletter__btn" type="submit">
                  &rarr;
               </button>
            </div>`;


const loadPage = function () {
  [heroContainer, introSection, postsContainer, paginationContainer, promoSection, newsLetterSection].forEach(section => mainSection.insertAdjacentElement('beforeend', section));
  handleLoadData();
}

const generateCardMarkup = function (data) {
  
  const html = `
      <div class="post" id="${data.id}">
         <figure class="post__img-box">
            <img src="${data.imageUrl}" alt="First post" class="post__img">
            <figcaption class="post__description">
               <span class="post__date">${data.date}</span>
               <h2 class="heading-post">${data.title}</h2>
               <span class="post__desc">${
                 data.description.slice(0, 51) + "..."
               }</span>
               <a href="http://localhost:5500/postView.html?id=${
                 data.id
               }" id="read-story" class="btn btn__post">Read more</a>
            </figcaption>
         </figure>
      </div>
   `;
  postsContainer.insertAdjacentHTML("afterbegin", html);
};

const getData = async function () {
  const res = await fetch(`http://localhost:3000/posts?_page=${curPage}&_limit=6`);
  console.log(res);
  if (!res.ok) throw new Error(`Error loading data (${res.status})`);
  const data = await res.json();
  console.log(data);
  postsContainer.innerHTML = '';
  data.forEach(post => generateCardMarkup(post)) 
};

// const getPostsPerPage = function (posts, page = 1) {
//   const start = [page - 1] * postsPerPage; // 0;
//   const end = page * postsPerPage; // 9;
//   console.log(start, end);
//   console.log(posts[8]);
//   let pagePosts = posts.slice(0, 9);
//   console.log(pagePosts);
// };



const handleLoadData = function () {
  try {
    getData();
    
    // getPostsPerPage(allPosts);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", loadPage);

postsNum = allPosts.length;




//PAGINATION

paginationContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "") return;

  //Loading new posts
  if (e.target.id === "prev") {
    if (curPage === 1) return;
    curPage--;
    console.log(curPage);
    getData();
    scrollToPagination.scrollIntoView();
  } else if (e.target.id === "next") {
    curPage++;
    console.log(curPage);
    getData();
    scrollToPagination.scrollIntoView();

  } else {
    curPage = e.target.id;
    getData();
    scrollToPagination.scrollIntoView();

  }
});
"use strict";

let btnMore;
const cardImage = document.querySelector(".post__img");
const postsContainer = document.querySelector("#posts-container");
const paginationContainer = document.querySelector(".pagination");
const scrollToPagination = document.querySelector('.section-intro')
var allPosts =[];
const postsPerPage = 9;
let curPage = 1;
let postsNum;


const generateMarkup = function (data) {
  // console.log(data);
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
  data.forEach(post => generateMarkup(post))
  // data.forEach(post => allPosts.push(post));
  
  
};
const getPostsPerPage = function (posts, page = 1) {
  const start = [page - 1] * postsPerPage; // 0;
  const end = page * postsPerPage; // 9;
  console.log(start, end);
  console.log(posts[8]);
  let pagePosts = posts.slice(0, 9);
  console.log(pagePosts);
};



const handleLoadData = function () {
  try {
    getData();
    
    // getPostsPerPage(allPosts);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", handleLoadData);

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
"use strict";

let btnMore;
const cardImage = document.querySelector(".post__img");
const postsContainer = document.querySelector("#posts-container");
const paginationContainer = document.querySelector(".pagination");
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

const getData = async function (pageNum = 1) {
  const res = await fetch(
    `http://localhost:3000/posts?_page=${pageNum}&_limit=3`
  );
  console.log(res);
  if (!res.ok) throw new Error(`Error loading data (${res.status})`);
  const data = await res.json();
  console.log(data);
  data.map((post) => generateMarkup(post));
};

const handleLoadData = function () {
  try {
    getData(2);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("load", handleLoadData);

//PAGINATION


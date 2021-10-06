"use strict";


let btnMore;
const postsContainer = document.querySelector('#posts-container');

let pageNum = 1;

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
               <a href="http://localhost:5500/postView.html?id=${data.id}" id="read-story" class="btn btn__post">Read more</a>
            </figcaption>
         </figure>
      </div>
   `;
   postsContainer.insertAdjacentHTML('afterbegin', html);
}

fetch(`http://localhost:3000/posts?_page=1&_limit=6`)
   .then(res => res.json())
   .then(data => data.forEach(post => {
      generateMarkup(post);
   }))
   .catch(err => new Error(`${err.message}`));

document.addEventListener('click', function (e) {
   if (e.target && e.target.id === 'read-story')
      btnMore = e.target;
   console.log(btnMore);
   const postId = btnMore.closest('.post').id;
   console.log(postId);
})


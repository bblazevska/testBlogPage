"use strict";

const getData = async function () {
   try {
      const res = await fetch("http://localhost:3000/posts");
      return data;
   } catch (err) {
    throw new Error("Error getting data");
   }
};

const generatePosts = function (data) {
   
}
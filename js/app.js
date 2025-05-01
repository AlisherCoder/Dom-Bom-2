import { fetchData } from "./main.js";

function renderProducts(data) {
   console.log(data);
   const wrapper = document.querySelector(".wrapper");
   const fragment = document.createDocumentFragment();

   data?.products.forEach((prd) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
         <img src="${prd.thumbnail}" alt="" />
         <h3>${prd.title}</h3>
         <p>${prd.price} $</p>
      `;

      fragment.appendChild(card);
   });

   wrapper.appendChild(fragment);
}

const ulEl = document.querySelector(".tags");
function renderTags(data) {
   data?.forEach((tag) => {
      const li = document.createElement("li");
      li.innerHTML = tag;

      ulEl.appendChild(li);
   });
}

window.onload = () => {
   fetchData("products/category-list", renderTags);
   fetchData("products?limit=9", renderProducts);
};

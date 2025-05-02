import { fetchData } from "./main.js";
const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const ulEl = document.querySelector(".tags");
const btnEl = document.querySelector(".btn");
let offset = 0;
let perPageCount = 9;

function renderProducts(data) {
   if (data.limit < perPageCount) {
      btnEl.classList.add("disabled");
   } else {
      btnEl.classList.remove("disabled");
   }
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

function renderTags(data) {
   const fragment = document.createDocumentFragment();

   data?.forEach((tag) => {
      const li = document.createElement("li");
      li.innerHTML = tag;

      fragment.appendChild(li);
   });

   ulEl.appendChild(fragment);
}

header.addEventListener("click", (event) => {
   const targetName = event.target.nodeName;

   if (targetName === "LI") {
      const tag = event.target.innerHTML;

      if (tag === "All") {
         wrapper.innerHTML = null;
         fetchData("products?limit=9", renderProducts);
      } else {
         wrapper.innerHTML = null;
         fetchData(`products/category/${tag}?limit=9`, renderProducts);
      }
   }
});

btnEl.onclick = (event) => {
   offset++;
   fetchData(`products?limit=${perPageCount}&skip=${perPageCount * offset}`, renderProducts);
};

window.onload = () => {
   fetchData("products/category-list", renderTags);
   fetchData("products?limit=9", renderProducts);
};

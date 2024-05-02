console.log("Index js loaded");

async function fetchCategories() {
    // this function is marked async so this will also return a promise
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    return data;
}

async function populateCtaegories() {


    const categories = await fetchCategories();
    const loaderBackdrop = document.getElementById("loader-backdrop");
    loaderBackdrop.style.display ='none';

    // categories => (mobile , Electronics ,jwellery)
    const categoryList = document.getElementById("categoryList");

    categories.forEach((category) =>
    {
           const categoryHolder = document.createElement("div");
           const categoryLink = document.createElement("a");
           categoryLink.href =  `productList.html?category = ${category}`;
       
           // category => (mobile , Electronics ,jwellery)
           categoryLink.textContent = category;
           
       
           // categoryHolder => passes all classes
           categoryHolder.classList.add("category-item" ,"d-flex", "align-items-center" ,"justify-content-center");
            categoryHolder.appendChild(categoryLink);
            categoryList.appendChild(categoryHolder);

   })

    

}

populateCtaegories();


document.addEventListener("DOMContentLoaded", () => {


    async function fetchProducts() {

        const response = await axios.get("https://fakestoreapi.com/products");
        console.log("data", response.data);
        return response.data;
    }


    async function fetchProductsByCategory(category) {
        category = category.trim();
        console.log("category in fetchProductsByCategory", category);
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log("data", response.data);
        return response.data;
    }



    async function fetchCategories() {
        // this function is marked async so this will also return a promise
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        return data;
    }





    async function populateProducts(flag, customProducts) {
        let products = customProducts;

        // when click categories like electronics and jwellery in home page href =>    we have reference of query param in url
        // http://127.0.0.1:5500/productList.html?category%20=%20men%27s%20clothing
        // here mens clothing 
        // we want that queryparams

        const queryParams = new URLSearchParams(window.location.search);
        // we want that queryparams
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        console.log("queryCategory", queryParamsObject["category"]);



        if (flag === false) {
            if (queryParamsObject["category "]) {
                // category => jwellery ,Electronics
                // fetch particular products
                products = await fetchProductsByCategory(queryParamsObject["category "])
                console.log("category", products);
            }
            else {
                // fetch All Products
                products = await fetchProducts();
                console.log("allProduct");
            }

        }


        products.forEach(product => {

            //    <a href="productDetails.html" target="_blank" class="product-item text-decoration-none d-inline-block">
            const productItem = document.createElement("a");
            productItem.target = "-blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block");
            productItem.href = "productDetails.html";

            // <div class="product-list-box" id="productList">

            //     <a href="productDetails.html" target="_blank" class="product-item text-decoration-none d-inline-block">
            //         <div class="product-img">
            //             <img src="img/product.jpg" alt="">
            //         </div>
            //         <div class="product-name text-center">Some product</div>
            //         <div class="product-price text-center">&#8377; 10000</div>
            //     </a>

            // </div>


            // image
            const productImage = document.createElement("div");
            productImage.classList.add("product-img");
            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;

            // append img tag inside div tag
            productImage.appendChild(imageInsideProductImage);


            // title
            const productName = document.createElement("div");
            productName.classList.add("product-name", "text-center");
            if (product.title.length > 12) {
                productName.textContent = product.title.substring(0, 12) + "..."

            }
            else {
                productName.textContent = product.title;
            }


            // price
            const productPrice = document.createElement("div");
            productPrice.textContent = `$ ${product.price}`;

            productPrice.classList.add("product-price", "text-center");

            // append 3 div inside a tag
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);


            const productList = document.getElementById("productList");
            productList.appendChild(productItem);

        });

    }

    async function populateCtaegories() {
         //    here categories :
            //   "electronics",
            //   "jewelery",
            //   "men's clothing",
            //   "women's clothing"
            
        const categories = await fetchCategories();
        console.log("categories for side" ,categories)

            // <div id="categoryList">
        //     <!-- will be populated by JS -->
        // </div>

        const categoryList =  document.getElementById("categoryList");
       
        categories.forEach((category)  =>
                                { 

                                    console.log("each category" , category)
                                     const anchorTag =document.createElement("a");
                                    anchorTag.href = `productList.html?category=${category}`;
                                    anchorTag.classList.add("d-flex" , "text-decoration-none");
                                    anchorTag.innerHTML = category;
                                    console.log("each category" , category)
                                    categoryList.appendChild(anchorTag);
                                    anchorTag.addEventListener("click" , () =>{
                                        //   console.log("inside anc tag" ,category)
                                              populateProducts(false , category)
                                     })
                                    
                                })



    }

    populateProducts(false);
    populateCtaegories();

    const filterSearch = document.getElementById("search");
    // search products by minPrice and maxPrice
    filterSearch.addEventListener("click", async () => {
        // string convert into number
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        //    get all products
        const products = await fetchProducts();
        //    filter products by minPrice and maxPrice
        filteredProducts = products.filter((eachProduct) => eachProduct.price >= minPrice && eachProduct.price <= maxPrice)

        console.log("filteredProducts", filteredProducts);

        //    before filter the products by minPrice and maxPrice we have to clear productList 

        let productList = document.getElementById("productList");
        productList.innerHTML = "";
        // its for minPrice and maxPrice
        populateProducts(true, filteredProducts);
    });

    //   reload page when its clicked clearFilters
    // Get the element with the id "clear"
    const resetFilter = document.getElementById("clear");

    // Add an event listener to the "clear" element
    resetFilter.addEventListener("click", () => {
        // When the "clear" button is clicked, reload the page
        window.location.reload();
        minPrice.value = 0;
        maxPrice.value = 0;
    });



})
console.log("in productDatails pge")  



document.addEventListener("DOMContentLoaded" , () => {

    async function populateProduct()
    {
        const queryParams =getQueryParams();
        // console.log("queryParams in productDetails" , queryParams);
        // console.log("queryParams in productDetails" , queryParams.id);

        if(queryParams['id '])
            {
                const productId = queryParams['id '];
                const product = await fetchProductById(productId.trim())
                console.log("product" , product.data);

            //     <div class="product-details-wrapper d-flex justify-content-between align-items-start flex-row">
            //     <div class="product-img d-flex">
            //         <img src="" alt="product image" id="product-img">
            //     </div>

            //     <div class="product-details-box d-flex flex-column">
            //         <div id="productDetails">
            //             <!-- product details -->
            //             <div class="product-name" id="product-name"></div>
            //             <div class="product-price fw-bold" id="product-price"></div>
            //             <div class="product-description">
            //                 <div class="product-description-title fw-bold">Description</div>
            //                 <div class="product-description-data" id="product-description-data">
                               
            //                 </div>
            //             </div>
            //         </div>

            //         <div class="product-details-action btn btn-primary text-decoration-non">Add to cart</div>
            //         <a href="cart.html" id="goToCartBtn" class="product-details-action btn btn-warning text-decoration-none">
            //             Go to cart
            //         </a>
            //     </div>
            // </div>
    
        //  name of product 
        const productName = document.getElementById("product-name");
        productName.textContent = product.data.title;

        // product-description
        const productDes = document.getElementById("product-description-data");
        productDes.textContent = product.data.description;

        // image
        const productImage = document.getElementById("product-img");
        productImage.src = product.data.image;

        // price
        const productPrice = document.getElementById("product-price");
        productPrice.textContent ="$"+ product.data.price;

        removeLoader();





            }  

    }
    populateProduct();

   })
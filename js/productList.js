

document.addEventListener("DOMContentLoaded", () => {


    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log("data", response.data);
        return response.data;
    }


    async function populateProducts() {
        const products = await fetchProducts();

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
            productName.classList.add("product-name" ,  "text-center");
            if(product.title.length > 12)
            {
                productName.textContent =product.title.substring(0,12)+ "..."

            }
            else
            {
                productName.textContent =product.title;
            }
          

            // price
            const productPrice = document.createElement("div");
            productPrice.textContent = `$ ${product.price}`;

            productPrice.classList.add("product-price","text-center");

            // append 3 div inside a tag
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);


            const productList = document.getElementById("productList");
            productList.appendChild(productItem)
;













        });


    }

    populateProducts();

})
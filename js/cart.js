document.addEventListener("DOMContentLoaded" , () => {


    function prepareWrapperDivForCartItems(product, productQuanityMapping) {
        const orderDetailsProduct = document.createElement("div");
        orderDetailsProduct.classList.add("order-details-product", "d-flex", "flex-row");

        const orderDetailsProductImg = document.createElement("div");
        orderDetailsProductImg.classList.add("order-details-product-img", "d-flex");
        const image = document.createElement("img");
        image.src = product.image;
        orderDetailsProductImg.appendChild(image);

        const orderDetailsProductData = document.createElement("div");
        orderDetailsProductData.classList.add("order-details-product-data", "d-flex", "flex-column");
        const name = document.createElement("div");
        const price = document.createElement("div");
        name.textContent = product.title;
        price.textContent = product.price;
        orderDetailsProductData.appendChild(name);
        orderDetailsProductData.appendChild(price);


        const orderDetailsProductActions = document.createElement("div");
        orderDetailsProductActions.classList.add("order-details-product-actions", "d-flex", "flex-column");
        const orderDetailsProductQuantity = document.createElement("div");
        orderDetailsProductQuantity.classList.add("order-details-product-quantity");
        const quantityLabel = document.createElement("div");
        quantityLabel.textContent = "Quantity";
        quantityLabel.classList.add("fw-bold");
        const formGroup = document.createElement("div");
        formGroup.classList.add("form-group");
        const select = document.createElement("select");
        select.classList.add("form-select");
        for(let i = 1; i <= 10; i++) {
            const option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            if(i == productQuanityMapping[product.id]) {
                option.selected = "true";
            }
            select.appendChild(option);
        }
        formGroup.appendChild(select);
        orderDetailsProductQuantity.appendChild(quantityLabel);
        orderDetailsProductQuantity.appendChild(formGroup);
        orderDetailsProductActions.appendChild(orderDetailsProductQuantity);
        const remove = document.createElement("button");
        remove.classList.add("order-details-product-remove", "btn", "btn-danger");
        remove.textContent = "Remove";
        orderDetailsProductActions.appendChild(remove);
        


        orderDetailsProduct.appendChild(orderDetailsProductImg);
        orderDetailsProduct.appendChild(orderDetailsProductData);
        orderDetailsProduct.appendChild(orderDetailsProductActions);

        const hr = document.createElement("hr");
        document.getElementById("orderDetails").appendChild(orderDetailsProduct);
        document.getElementById("orderDetails").appendChild(hr);
    }






    async function populateCard()
    {
       const cart = await fetchCardById(7)
       console.log("cart" ,cart);

       const cartProducts = cart.products;
       console.log("cartProducts" , cartProducts);
    //    js object
    const productQuantityMapping = {};

    //    here cartProducts is array  ..
    //  we r going to use map function
    //  which return another array
    const cartProductDownloadPromise = cartProducts.map((product) =>
         {

            //   Array(3) [ {…}, {…}, {…} ]
            // 0: Object { productId: 1, quantity: 4 }   1: Object { productId: 2, quantity: 1 } 2: Object { productId: 3, quantity: 6 }

            // we using =>fetchProductById
            // its a async function
            // which return each product promise object

            // console.log("product.productid" ,product.productId)

            // console.log("product.quantity" ,product.quantity)
            productQuantityMapping[product.productId] =  product.quantity;
            return fetchProductByIdSecond(product.productId) 
        })

    // console.log("cartProductDownloadPromise" ,cartProductDownloadPromise);
    // group of promises
      const products = await Promise.all(cartProductDownloadPromise);

      console.log(products)
      let totalPrice = 0;
      products.forEach((eachProduct) =>{
        prepareWrapperDivForCartItems(eachProduct , productQuantityMapping);
        totalPrice += (eachProduct.price * productQuantityMapping[eachProduct.id] );

        console.log(eachProduct.id ,eachProduct.title ,eachProduct.price,productQuantityMapping[eachProduct.id] );
      })

    //   for totalPrice in cart

    document.getElementById("total-price").textContent = totalPrice;
    document.getElementById("net-price").textContent = totalPrice - 10;


      removeLoader();
       
    }


    populateCard();
})
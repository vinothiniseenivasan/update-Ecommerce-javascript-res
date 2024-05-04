
console.log("common")


function getQueryParams()
{
    const queryParams = new URLSearchParams(window.location.search);
        // we want that queryparams
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        return queryParamsObject;
}

function removeLoader()
{
    const loaderBackdrop = document.getElementById("loader-backdrop");
    loaderBackdrop.style.display ='none';
}

async function fetchProductById(id)
{
    if(typeof id === 'string')
        {
            id =id.trim()
        }
   
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
     console.log("common fetchProductById" ,product)
    return product;
   
}
async function fetchProductByIdSecond(id)
{
   
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
     console.log("common fetchProductById" ,product)
    return product.data;
   
}


async function fetchCardById(id)
{
    const cart = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return cart.data;
}

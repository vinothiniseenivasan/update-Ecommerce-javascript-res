
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
    id =id.trim()
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
    // console.log("common fetchProductById" ,id)
    return product;
   
}
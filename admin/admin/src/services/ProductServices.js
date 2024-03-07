import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("products");
    
}
function create(data)
{
    return httpAxios.post("products", data);
}

const ProductService = {
    getAll:getAll,
    create:create
}
export default ProductService;
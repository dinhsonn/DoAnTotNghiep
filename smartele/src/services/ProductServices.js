import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("products");
}
function getById(id)
{
    return httpAxios.get(`products/${id}`);
}
function create(data)
{
    return httpAxios.post("product/store", data);
}
function update(data, id)
{
    return httpAxios.post("product/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("product/destroy/" + id);
}
function getProductImage()
{ 
    return httpAxios.get("productimages");
}
function getProductImageById(productId)
{
    return httpAxios.get(`productimages/productid/${productId}`);
}
function getProductSale()
{
    return httpAxios.get("productsale");
}
//product option
function productOption()
{
    return httpAxios.get(`productoption`);
}
function productOptionById(productid) 
{
    return httpAxios.get(`productoption/product/${productid}`);
}


//product option value
function productOptionValue()
{
    return httpAxios.get(`productoptionvalue`);
}
function productOptionValueByOption(option) 
{
    return httpAxios.get(`productoptionvalue/option/${option}`);
}
const ProductService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getProductImage:getProductImage,
    getProductImageById:getProductImageById,
    getProductSale:getProductSale,
    productOption:productOption,
    productOptionById:productOptionById,
    productOptionValue:productOptionValue,
    productOptionValueByOption:productOptionValueByOption,
}
export default ProductService;
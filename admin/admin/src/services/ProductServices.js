import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("products");
    
}
function create(data)
{
    return httpAxios.post("products", data);
}
function getById(id) 
{

    return httpAxios.get(`products/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`products/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`products/${id}`);
}
function uploadExcel(formData) {
    return httpAxios.post(`products/uploadExcel`, formData);
}
//product option
function productOption()
{
    return httpAxios.get(`productoption`);
}
function createProductOption(data)
{
    return httpAxios.post("productoption", data);
}
function productOptionById(id) 
{
    return httpAxios.get(`productoption/${id}`);
}
function productOptionUpdate(data, id)
{
    return httpAxios.put(`productoption/${id}`, data);
}
function removeProductOption(id)
{
    return httpAxios.delete(`productoption/${id}`);
}

//product option value
function productOptionValue()
{
    return httpAxios.get(`productoptionvalue`);
}
function createProductOptionValue(data)
{
    return httpAxios.post("productoptionvalue", data);
}
function productOptionValueById(id) 
{
    return httpAxios.get(`productoptionvalue/${id}`);
}
function productOptionValueUpdate(data, id)
{
    return httpAxios.put(`productoptionvalue/${id}`, data);
}
function removeProductOptionValue(id)
{
    return httpAxios.delete(`productoptionvalue/${id}`);
}
const ProductService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
    uploadExcel,
    productOption:productOption,
    createProductOption:createProductOption,
    productOptionById:productOptionById,
    removeProductOption:removeProductOption,
    productOptionValue:productOptionValue,
    createProductOptionValue:createProductOptionValue,
    productOptionValueById:productOptionValueById,
    removeProductOptionValue:removeProductOptionValue,
    productOptionUpdate:productOptionUpdate,
    productOptionValueUpdate:productOptionValueUpdate
}
export default ProductService;
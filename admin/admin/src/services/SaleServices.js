import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("productsale");
    
}
function create(data)
{
    return httpAxios.post("productsale", data);
}
function getById(id) {
    return httpAxios.get(`productsale/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`productsale/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`productsale/${id}`);
}
const ProductSaleService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default ProductSaleService;
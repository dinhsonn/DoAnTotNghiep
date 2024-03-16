import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("products");
    
}
function create(data)
{
    return httpAxios.post("products", data);
}
function getById(id) {
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
const ProductService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default ProductService;
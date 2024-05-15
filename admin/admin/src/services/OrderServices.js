import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("orders/items");

}
function getById(id) {
    return httpAxios.get(`carts/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`carts/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`orders/${id}`);
}
const OrderService = {
    getAll:getAll,
    remove:remove,
    getById:getById,
    update:update,
}
export default OrderService;
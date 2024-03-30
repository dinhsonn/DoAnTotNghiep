import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("menu");
    
}
function create(data)
{
    return httpAxios.post("menu", data);
}
function getById(id) {
    return httpAxios.get(`menu/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`menu/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`menu/${id}`);
}
const MenuService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default MenuService;
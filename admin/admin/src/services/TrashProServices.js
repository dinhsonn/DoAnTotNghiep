import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("trashproduct");
    
}
function create(data)
{
    return httpAxios.post("trashproduct", data);
}
function getById(id) 
{

    return httpAxios.get(`trashproduct/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`trashproduct/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`trashproduct/${id}`);
}
const TrashProServices = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default TrashProServices;
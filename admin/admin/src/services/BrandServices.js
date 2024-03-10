import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("brand");

}
function create(data)
{
    return httpAxios.post("brand",data);

}
function getById(id) {
    return httpAxios.get(`brand/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`brand/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`brand/${id}`);
}
const BrandService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default BrandService;
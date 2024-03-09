import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("categories");

}
function create(data)
{
    return httpAxios.post("categories",data);

}
function getById(id) {
    return httpAxios.get(`categories/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`categories/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`categories/${id}`);
}
const CategoryService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default CategoryService;
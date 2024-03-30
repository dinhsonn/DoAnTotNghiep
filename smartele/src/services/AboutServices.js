import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("about");

}
function create(data)
{
    return httpAxios.post("about",data);

}
function getById(id) {
    return httpAxios.get(`about/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`about/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`about/${id}`);
}
const AboutService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default AboutService;
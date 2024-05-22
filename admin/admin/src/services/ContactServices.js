import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("contact");

}
function create(data)
{
    return httpAxios.post("contact",data);

}
function getById(id) {
    return httpAxios.get(`contact/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`contact/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`contact/${id}`);
}
const ContactService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default ContactService;
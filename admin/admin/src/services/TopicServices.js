import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("topics");

}
function create(data)
{
    return httpAxios.post("topics",data);

}
function getById(id) {
    return httpAxios.get(`topics/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`topics/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`topics/${id}`);
}
const TopicService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default TopicService;
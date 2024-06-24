import httpAxios from "../httpAxios";



function getAll()
{
    return httpAxios.get("posts");

}
function getAllTopic()
{
    return httpAxios.get("topics");

}
function create(data)
{
    return httpAxios.post("posts",data);

}
function getById(id) {
    return httpAxios.get(`posts/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`posts/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`posts/${id}`);
}
const PostService = {
    getAll:getAll,
    getAllTopic:getAllTopic,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default PostService;
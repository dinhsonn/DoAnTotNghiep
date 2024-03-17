import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("productimages");

}
function create(data)
{
    return httpAxios.post("productimages",data);

}
function getById(id) {
    return httpAxios.get(`productimages/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`productimages/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`productimages/${id}`);
}
const ImageService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default ImageService;
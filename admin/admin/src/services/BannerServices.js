import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("banners");

}
function create(data)
{
    return httpAxios.post("banners",data);

}
function getById(id) {
    return httpAxios.get(`banners/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`banners/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`banners/${id}`);
}
const BannerService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
}
export default BannerService;
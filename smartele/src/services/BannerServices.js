import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("banners");
    
}
function getById(id) {
    return httpAxios.get(`banners/${id}`);
}
const BannerService = {
    getAll:getAll,
    getById:getById,

}
export default BannerService;
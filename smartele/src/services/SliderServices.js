import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("sliders");
    
}
function getById(id) {
    return httpAxios.get(`sliders/${id}`);
}
const SliderService = {
    getAll:getAll,

    getById:getById,


}
export default SliderService;
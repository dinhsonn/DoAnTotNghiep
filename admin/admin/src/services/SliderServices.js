import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("sliders");
    
}
function create(data)
{
    return httpAxios.post("sliders", data);
}
function getById(id) {
    return httpAxios.get(`sliders/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`sliders/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`sliders/${id}`);
}



const SliderService = {
    getAll:getAll,
    create:create,
    getById:getById,
    update:update,
    remove:remove,

}
export default SliderService;
import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("menu");
    
}
function getById(id) {
    return httpAxios.get(`menu/${id}`);
}

const MenuService = {
    getAll:getAll,
    getById:getById,


}
export default MenuService;
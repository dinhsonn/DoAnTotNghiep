import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("brand");
    
}
function getById(id) {
    return httpAxios.get(`brand/${id}`);
}


const CategoryService = {
    getAll:getAll,
    getById:getById,

}
export default CategoryService;
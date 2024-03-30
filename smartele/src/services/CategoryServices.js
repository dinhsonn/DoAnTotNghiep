import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("categories");
    
}
function getById(id) {
    return httpAxios.get(`categories/${id}`);
}

const CategoryService = {
    getAll:getAll,
    getById:getById,


}
export default CategoryService;
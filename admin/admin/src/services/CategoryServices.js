import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("categories");

}
const CategoryService = {
    getAll:getAll,
}
export default CategoryService;
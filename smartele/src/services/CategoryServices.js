import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("categories");
    
}
function getById(id) {
    return httpAxios.get(`categories/${id}`);
}
//category option
function categoryOption()
{
    return httpAxios.get(`categoryoption`);
}
function categoryOptionById(id) 
{
    return httpAxios.get(`categoryoption/${id}`);
}
function categoryOptionByCategoryId(categoryId) 
{
    return httpAxios.get(`categoryoption/category/${categoryId}`);
}
//category option value
function categoryOptionValue()
{
    return httpAxios.get(`categoryoptionvalue`);
}

function categoryOptionValueById(id) 
{
    return httpAxios.get(`categoryoptionvalue/${id}`);
}
function categoryOptionValueByOption(option) 
{
    return httpAxios.get(`categoryoptionvalue/option/${option}`);
}

const CategoryService = {
    getAll:getAll,
    getById:getById,
    categoryOption:categoryOption,
    categoryOptionById:categoryOptionById,
    categoryOptionValue:categoryOptionValue,
    categoryOptionValueById:categoryOptionValueById,
    categoryOptionByCategoryId:categoryOptionByCategoryId,
    categoryOptionValueByOption:categoryOptionValueByOption

}
export default CategoryService;
import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("categories");

}
function create(data)
{
    return httpAxios.post("categories",data);

}
function getById(id) {
    return httpAxios.get(`categories/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`categories/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`categories/${id}`);
}
//category option
function categoryOption()
{
    return httpAxios.get(`categoryoption`);
}
function createCategoryOption(data)
{
    return httpAxios.post("categoryoption", data);
}
function categoryOptionById(id) 
{
    return httpAxios.get(`categoryoption/${id}`);
}
function categoryOptionUpdate(data, id)
{
    return httpAxios.put(`categoryoption/${id}`, data);
}
function removeCategoryOption(id)
{
    return httpAxios.delete(`categoryoption/${id}`);
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
function createCategoryOptionValue(data)
{
    return httpAxios.post("categoryoptionvalue", data);
}
function categoryOptionValueById(id) 
{
    return httpAxios.get(`categoryoptionvalue/${id}`);
}
function categoryOptionValueUpdate(data, id)
{
    return httpAxios.put(`categoryoptionvalue/${id}`, data);
}
function removeCategoryOptionValue(id)
{
    return httpAxios.delete(`categoryoptionvalue/${id}`);
}
function categoryOptionValueByOption(option) 
{
    return httpAxios.get(`categoryoptionvalue/option/${option}`);
}
const CategoryService = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
    categoryOption:categoryOption,
    createCategoryOption:createCategoryOption,
    categoryOptionById:categoryOptionById,
    categoryOptionUpdate:categoryOptionUpdate,
    removeCategoryOption:removeCategoryOption,
    categoryOptionValue:categoryOptionValue,
    createCategoryOptionValue:createCategoryOptionValue,
    categoryOptionValueById:categoryOptionValueById,
    categoryOptionValueUpdate:categoryOptionValueUpdate,
    removeCategoryOptionValue:removeCategoryOptionValue,
    categoryOptionByCategoryId:categoryOptionByCategoryId,
    categoryOptionValueByOption:categoryOptionValueByOption
}
export default CategoryService;
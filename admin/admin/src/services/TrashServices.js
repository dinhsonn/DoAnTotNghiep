import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("trashproduct");
    
}
function create(data)
{
    return httpAxios.post("trashproduct", data);
}
function getById(id) 
{

    return httpAxios.get(`trashproduct/${id}`);
}
function update(data, id)
{
    return httpAxios.put(`trashproduct/${id}`, data);
}
function remove(id)
{
    return httpAxios.delete(`trashproduct/${id}`);
}
//user
function getAllUser()
{
    return httpAxios.get("trashuser");
    
}
function createUser(data)
{
    return httpAxios.post("trashuser", data);
}
function getByIdUser(id) 
{

    return httpAxios.get(`trashuser/${id}`);
}
function updateUser(data, id)
{
    return httpAxios.put(`trashuser/${id}`, data);
}
function removeUser(id)
{
    return httpAxios.delete(`trashuser/${id}`);
}
//About
function getAllAbout()
{
    return httpAxios.get("trashabout");
    
}
function createAbout(data)
{
    return httpAxios.post("trashabout", data);
}
function getByIdAbout(id) 
{

    return httpAxios.get(`trashabout/${id}`);
}
function updateAbout(data, id)
{
    return httpAxios.put(`trashabout/${id}`, data);
}
function removeAbout(id)
{
    return httpAxios.delete(`trashabout/${id}`);
}
//Banner
function getAllBanner()
{
    return httpAxios.get("trashbanners");
    
}
function createBanner(data)
{
    return httpAxios.post("trashbanners", data);
}
function getByIdBanner(id) 
{

    return httpAxios.get(`trashbanners/${id}`);
}
function updateBanner(data, id)
{
    return httpAxios.put(`trashbanners/${id}`, data);
}
function removeBanner(id)
{
    return httpAxios.delete(`trashbanners/${id}`);
}
//Brand
function getAllBrand()
{
    return httpAxios.get("trashbrands");
    
}
function createBrand(data)
{
    return httpAxios.post("trashbrands", data);
}
function getByIdBrand(id) 
{

    return httpAxios.get(`trashbrands/${id}`);
}
function removeBrand(id)
{
    return httpAxios.delete(`trashbrands/${id}`);
}
//Category
function getAllCategory()
{
    return httpAxios.get("trashcategories");
    
}
function createCategory(data)
{
    return httpAxios.post("trashcategories", data);
}
function getByIdCategory(id) 
{

    return httpAxios.get(`trashcategories/${id}`);
}
function removeCategory(id)
{
    return httpAxios.delete(`trashcategories/${id}`);
}
//Contact
function getAllContact()
{
    return httpAxios.get("trashcontact");
    
}
function createContact(data)
{
    return httpAxios.post("trashcontact", data);
}
function getByIdContact(id) 
{

    return httpAxios.get(`trashcontact/${id}`);
}
function removeContact(id)
{
    return httpAxios.delete(`trashcontact/${id}`);
}
//Menu
function getAllMenu()
{
    return httpAxios.get("trash-menu");
    
}
function createMenu(data)
{
    return httpAxios.post("trash-menu", data);
}
function getByIdMenu(id) 
{

    return httpAxios.get(`trash-menu/${id}`);
}
function removeMenu(id)
{
    return httpAxios.delete(`trash-menu/${id}`);
}
//Image
function getAllImage()
{
    return httpAxios.get("trashproductimages");
    
}
function createImage(data)
{
    return httpAxios.post("trashproductimages", data);
}
function getByIdImage(id) 
{

    return httpAxios.get(`trashproductimages/${id}`);
}
function removeImage(id)
{
    return httpAxios.delete(`trashproductimages/${id}`);
}
//Slider
function getAllSlider()
{
    return httpAxios.get("trashsliders");
    
}
function createSlider(data)
{
    return httpAxios.post("trashsliders", data);
}
function getByIdSlider(id) 
{

    return httpAxios.get(`trashsliders/${id}`);
}
function removeSlider(id)
{
    return httpAxios.delete(`trashsliders/${id}`);
}
const TrashServices = {
    getAll:getAll,
    create:create,
    remove:remove,
    getById:getById,
    update:update,
    //user
    getAllUser,
    createUser,
    getByIdUser,
    updateUser,
    removeUser,
    //About
    getAllAbout,
    createAbout,
    getByIdAbout,
    updateAbout,
    removeAbout,
    //Banner
    getAllBanner,
    createBanner,
    getByIdBanner,
    updateBanner,
    removeBanner,
    //Brand
    getAllBrand,
    createBrand,
    getByIdBrand,
    removeBrand,
    //Category
    getAllCategory,
    createCategory,
    getByIdCategory,
    removeCategory,
    //Contact
    getAllContact,
    createContact,
    getByIdContact,
    removeContact,
    //Menu
    getAllMenu,
    createMenu,
    getByIdMenu,
    removeMenu,
    //Image
    getAllImage,
    createImage,
    getByIdImage,
    removeImage,
    //Slider
    getAllSlider,
    createSlider,
    getByIdSlider,
    removeSlider,

}
export default TrashServices;
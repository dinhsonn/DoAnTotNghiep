import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("contact");
    
}
function getById(id) {
    return httpAxios.get(`contact/${id}`);
}
function create(data)
{
    return httpAxios.post("contact",data);
    
}
const ContactService = {
    getAll:getAll,
    getById:getById,
    create:create,

}
export default ContactService;
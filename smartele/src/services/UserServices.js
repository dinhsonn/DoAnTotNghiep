import httpAxios from "../httpAxios";

function getAll() {
    return httpAxios.get("users");
}

function create(data) {
    return httpAxios.post("users", data);
}

function getById(id) {
    return httpAxios.get(`users/${id}`);
}


const UserService = {
    getAll: getAll,
    create: create,
    getById: getById,
};

export default UserService;

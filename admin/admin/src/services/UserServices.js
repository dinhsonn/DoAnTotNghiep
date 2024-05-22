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

function update(data, id) {
    return httpAxios.put(`users/${id}`, data);
}

function remove(id) {
    return httpAxios.delete(`users/${id}`);
}
const getOrdersByUserId = (userId) => {
    return httpAxios.get(`/users/${userId}/orders`);
  };
const UserService = {
    getAll: getAll,
    create: create,
    getById: getById,
    update: update,
    remove: remove,
    getOrdersByUserId:getOrdersByUserId,
};

export default UserService;

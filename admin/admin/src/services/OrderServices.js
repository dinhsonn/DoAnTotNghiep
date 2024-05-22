import httpAxios from "../httpAxios";

function getAll() {
    return httpAxios.get("/orders/items");
}

function getById(id) {
    return httpAxios.get(`/orders/${id}`);
}

function update(id, data) {
    return httpAxios.put(`/orders/${id}`, data);
}

function remove(id) {
    return httpAxios.delete(`/orders/${id}`);
}

function updateOrderStatus(id, status) {
    return httpAxios.put(`/orders/${id}/status/${status}`);
}


const OrderService = {
    getAll: getAll,
    getById: getById,
    update: update,
    remove: remove,
    updateOrderStatus: updateOrderStatus,
};

export default OrderService;

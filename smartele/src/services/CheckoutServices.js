import httpAxios from "../httpAxios";

const getAll = () => {
    return httpAxios.get("checkout");
};

const getById = (id) => {
    return httpAxios.get(`checkout/${id}`);
};

const create = (data) => {
    return httpAxios.post("checkout", data);
};


const CheckoutService = {
    getAll: getAll,
    getById: getById,
    create: create,
};

export default CheckoutService;

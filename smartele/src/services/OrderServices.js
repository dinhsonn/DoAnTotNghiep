import httpAxios from "../httpAxios";

const OrderService = {
  addItemToOrder: (userId, productId, name, email, phone, address, qty, price, image, paymentMethod) => {
    return httpAxios.post(`/orders/add/${userId}/${productId}/${name}/${email}/${phone}/${address}/${qty}/${price}/${image}/${paymentMethod}`)
      .then(() => {
        console.log("Product added to order successfully.");
      })
      .catch((error) => {
        console.error('Error adding to order:', error);
        throw error;
      });
  },
  removeItemFromOrder: (orderId, productId) => { 
    return httpAxios.delete(`/orders/${orderId}/items/${productId}`); 
  },
  getOrders: () => {
    return httpAxios.get("/orders/items");
  },
  calculateOrderTotal: () => {
    return httpAxios.get("/orders/total");
  },
  updateOrderItemQuantity: (orderId,productId, qty) => {
    return httpAxios.put(`/orders/update/${orderId}/items/${productId}/${qty}`);
  },
  getOrderById: (userId) => {
    return httpAxios.get(`/orders/${userId}`);
  },
  updatePaymentMethod: (id, paymentMethod) => {
    return httpAxios.put(`/orders/update/${id}/items/${paymentMethod}`);
  },
  
};

export default OrderService;

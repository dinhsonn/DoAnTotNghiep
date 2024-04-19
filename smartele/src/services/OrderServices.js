import httpAxios from "../httpAxios";

const OrderService = {
  addItemToOrder: (userId, productId, qty, price, image, paymentMethod) => {
    return httpAxios.post(`/orders/add/${userId}/${productId}/${qty}/${price}/${image}/${paymentMethod}`)
      .then(() => {
        console.log("Product added to cart successfully.");
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
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
  }
};

export default OrderService;

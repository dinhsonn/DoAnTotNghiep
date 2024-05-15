import httpAxios from "../httpAxios";

const CartService = {
  addItemToCart: (userId, productId, qty, price, image) => {
    return httpAxios.post(`/carts/add/${userId}/${productId}/${qty}/${price}/${image}`)
      .then(() => {
        console.log("Product added to cart successfully.");
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        throw error;
      });
  },  
  removeItemFromCart: (cartId, productId) => { 
    return httpAxios.delete(`/carts/${cartId}/items/${productId}`); 
  },
  removeItemsFromCarts: (cartIds, productId) => {
    const requests = cartIds.map(cartId => httpAxios.delete(`/carts/items/${productId}?cartIds=${cartId}`));
    return Promise.all(requests);
  },
  
  
  getCarts: () => {
    return httpAxios.get("/carts/items");
  },
  calculateCartTotal: () => {
    return httpAxios.get("/carts/total");
  },
  updateCartItemQuantity: (cartId,productId, qty) => {
    return httpAxios.put(`/carts/update/${cartId}/items/${productId}/${qty}`);
  },

  getCartById: (userId) => {
    return httpAxios.get(`/carts/${userId}`);
  },
};

export default CartService;

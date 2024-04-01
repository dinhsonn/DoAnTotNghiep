import httpAxios from "../httpAxios";


const CartService = {
  addItemToCart: (userId, productId, qty, price, image) => {
    return httpAxios.post(`carts/add/${userId}/${productId}/${qty}/${price}/${image}`)
      .then(() => {
        console.log("Product added to cart successfully.");
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        throw error;
      });
  },
  removeFromCart: (cartId, productId) => { 
    return httpAxios.delete(`/carts/${cartId}/items/${productId}`); 
  },
  getCarts: () => {
    return httpAxios.get("/carts/items");
  },
  calculateCartTotal: () => {
    return httpAxios.get("/carts/total");
  },
  updateCartQuantity: (productId, qty) => {
    return httpAxios.put(`/carts/update/${productId}/${qty}`);
  },
  getCartItems: () => { // Thêm phương thức mới để lấy thông tin giỏ hàng
    return httpAxios.get("/carts/items");
  }
};

export default CartService;

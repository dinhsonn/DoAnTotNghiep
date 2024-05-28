import httpAxios from "../httpAxios";


const WishlistService = {
    addToWishlist:(userId, productId, qty, price, image) => {
      return httpAxios.post(`/wishlist/add/${userId}/${productId}/${qty}/${price}/${image}`)
        .then(() => {
          console.log("Product added to cart successfully.");
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
          throw error;
        });
    }, 
 removeFromWishlist:(productId) => {
  return httpAxios.delete( `/wishlist/remove/${productId}`);
},

getAll:() =>{
  return httpAxios.get(`/wishlist/items`);
}

}

export default WishlistService;

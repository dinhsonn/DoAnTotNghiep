import Contact from "../pages/frontend/Contact";
import Home from "../pages/frontend/Home";
import FAQ from "../pages/frontend/FAQ";
// import Login from "../pages/frontend/Login";
import Checkout from "../pages/frontend/Checkout";
import Wishlist from "../pages/frontend/Wishlist";
import Product from "../pages/frontend/Product";
import ProductDetail from "../pages/frontend/Product/ProductDetail";
// // import ProductCategory from "../pages/frontend/ProductCategory";
import Post from "../pages/frontend/Blog/Post";
//  import Brand from "../pages/frontend/Brand";
// // import PostTopic from "../pages/frontend/Post/PostTopic";
// // import ProductBrand from "../pages/frontend/ProductBrand";
import PostDetail from "../pages/frontend/Blog/PostDetail";
import Cart from "../pages/frontend/Cart";
import About from "../pages/frontend/About";
import SuccessPage from "../pages/frontend/Checkout/test";
import Profile from "../pages/frontend/Profile/Profile";
import EditProfile from "../pages/frontend/Profile/EditProfile";
import Order from "../pages/frontend/Profile/Order";
import Search from "../pages/frontend/Search";
import ForgotPassword from "../layouts/LayoutSite/ForgotPassword";

const RouterPublic = [


    {path:'/',component:Home},
    {path:'/search',component:Search},

    {path:'/product',component:Product},
    {path:'/wishlist',component:Wishlist},
    {path:'/checkout',component:Checkout},
    {path:'/faq',component:FAQ},
    // // {path:'/product/:page',component:Product},
     {path:'/contact',component:Contact},
     {path:'/productdetail/:id',component:ProductDetail},
    // // {path:'/danh-muc-san-pham/:slug',component:ProductCategory},
    {path:'/post',component:Post},
    //  {path:'/brand',component:Brand},
    // // {path:'/chu-de-bai-viet/:slug',component:PostTopic},
    // // {path:'/thuong-hieu/:slug',component:ProductBrand},
    {path:'/postdetail/:id',component:PostDetail},
    // // {path:'/tim-kiem/:key',component:Search},
    {path:'/cart',component:Cart},
    {path:'/about',component:About},
    {path:'/test',component:SuccessPage},
    {path:'/profile',component:Profile},
    {path:'/edit',component:EditProfile},
    {path:'/order',component:Order},
    {path:'/quenmatkhau',component:ForgotPassword},


]
export default RouterPublic;
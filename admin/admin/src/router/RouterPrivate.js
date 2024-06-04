import Dashboard from "../pages/backend/Dashboard";
import Brand from '../pages/backend/Brand/index';
import BrandShow from '../pages/backend/Brand/BrandShow';
import BrandEdit from '../pages/backend/Brand/BrandEdit';
import BrandTrash from '../pages/backend/Brand/BrandTrash';
import Category from '../pages/backend/Category/index';
  import CategoryShow from '../pages/backend/Category/CategoryShow';
  //import CategoryUpdate from '../pages/backend/Category/CategoryUpdate';
 import ProductList from '../pages/backend/Product/ProductList';
 import ProductImport from '../pages/backend/Product/ProductImport';
 import ProductShow from '../pages/backend/Product/ProductShow';
 import ProductCreate from '../pages/backend/Product/ProductCreate';
 import ProductEdit from '../pages/backend/Product/ProductEdit';
 import ProductSale from '../pages/backend/ProductSale/ProductSale';
 import ProductOption from '../pages/backend/ProductOption/index';
 import ProductOptionShow from '../pages/backend/ProductOption/ProductOptionShow';
 import ProductOptionEdit from '../pages/backend/ProductOption/ProductOptionEdit';
 import ProductOptionTrash from '../pages/backend/ProductOption/ProductOptionTrash';
 import ProductOptionValue from '../pages/backend/ProductOptionValue/index';
 import ProductOptionValueShow from '../pages/backend/ProductOptionValue/ProductOptionValueShow';
 import ProductOptionValueEdit from '../pages/backend/ProductOptionValue/ProductOptionValueEdit';
 import ProductOptionValueTrash from '../pages/backend/ProductOptionValue/ProductOptionValueTrash';
 ////
 import CategoryOption from '../pages/backend/CategoryOption/index';
 import CategoryOptionShow from '../pages/backend/CategoryOption/CategoryOptionShow';
 import CategoryOptionEdit from '../pages/backend/CategoryOption/CategoryOptionEdit';
 import CategoryOptionTrash from '../pages/backend/CategoryOption/CategoryOptionTrash';
 import CategoryOptionValue from '../pages/backend/CategoryOptionValue/index';
 import CategoryOptionValueShow from '../pages/backend/CategoryOptionValue/CategoryOptionValueShow';
 import CategoryOptionValueEdit from '../pages/backend/CategoryOptionValue/CategoryOptionValueEdit';
 import CategoryOptionValueTrash from '../pages/backend/CategoryOptionValue/CategoryOptionValueTrash';

// import ContactList from '../pages/backend/Contact/ContactList';
// import ContactShow from '../pages/backend/Contact/ContactShow';
// import ContactUpdate from '../pages/backend/Contact/ContactUpdate';
// import MenuList from '../pages/backend/Menu/MenuList';
// import MenuShow from '../pages/backend/Menu/MenuShow';
// import MenuCreate from '../pages/backend/Menu/MenuCreate';
// import MenuUpdate from '../pages/backend/Menu/MenuUpdate';
import Order from '../pages/backend/Order/index';
import OrderShow from '../pages/backend/Order/OrderShow';
import OrderExport from '../pages/backend/Order/OrderExport';
 import Post from '../pages/backend/Post/index';
 import PostShow from '../pages/backend/Post/PostShow';
 import PostCreate from '../pages/backend/Post/PostCreate';
 import PostEdit from '../pages/backend/Post/PostEdit';
 import PostTrash from '../pages/backend/Post/PostTrash';
 import Page from '../pages/backend/Page/index';
 import PageShow from '../pages/backend/Page/PageShow';
 import PageCreate from '../pages/backend/Page/PageCreate';
 import PageEdit from '../pages/backend/Page/PageEdit';
 import PageTrash from '../pages/backend/Page/PageTrash';
import Slider from '../pages/backend/Slider/index';
import SliderShow from '../pages/backend/Slider/SliderShow';
import SliderCreate from '../pages/backend/Slider/SliderCreate';
import SliderEdit from '../pages/backend/Slider/SliderEdit';
import SliderTrash from '../pages/backend/Slider/SliderTrash';
import Banner from '../pages/backend/Banner/index';
import BannerShow from '../pages/backend/Banner/BannerShow';
import BannerCreate from '../pages/backend/Banner/BannerCreate';
import BannerEdit from '../pages/backend/Banner/BannerEdit';
import BannerTrash from '../pages/backend/Banner/BannerTrash';
 import Topic from '../pages/backend/Topic/index';
 import TopicShow from '../pages/backend/Topic/TopicShow';
 import TopicEdit from '../pages/backend/Topic/TopicEdit';
 import TopicTrash from '../pages/backend/Topic/TopicTrash';
 import Admin from '../pages/backend/Admin/index';
 import AdminShow from '../pages/backend/Admin/AdminShow';
 import AdminCreate from '../pages/backend/Admin/AdminCreate';
 import AdminEdit from '../pages/backend/Admin/AdminEdit';
 import AdminTrash from '../pages/backend/Admin/AdminTrash';
import Customer from '../pages/backend/Customer/index';
import CustomerCreate from '../pages/backend/Customer/CustomerCreate';
import CustomerEdit from '../pages/backend/Customer/CustomerEdit';
import CustomerShow from '../pages/backend/Customer/CustomerShow';
import CustomerTrash from '../pages/backend/Customer/CustomerTrash';
import CategoryEdit from "../pages/backend/Category/CategoryEdit";
import About from "../pages/backend/About";
import AboutCreate from "../pages/backend/About/AboutCreate";
import AboutShow from "../pages/backend/About/AboutShow";
import AboutEdit from "../pages/backend/About/AboutEdit";
import Menu from "../pages/backend/Menu/index";
import MenuShow from "../pages/backend/Menu/MenuShow";
import MenuEdit from "../pages/backend/Menu/MenuEdit";
import MenuTrash from "../pages/backend/Menu/MenuTrash";
import ProductImage from "../pages/backend/Image/ProductImage";
import ImageCreate from "../pages/backend/Image/ImageCreate";
import ImageEdit from "../pages/backend/Image/ImageEdit";
import ImageShow from "../pages/backend/Image/ImageShow";
import SaleCreate from "../pages/backend/ProductSale/SaleCreate";
import SaleEdit from "../pages/backend/ProductSale/SaleEdit";
import SaleShow from "../pages/backend/ProductSale/SaleShow";
import Login from "../layouts/LayoutAdmin/Login";
import ProductTrash from "../pages/backend/Product/ProductTrash.";
import AboutTrash from "../pages/backend/About/AboutTrash";
import CategoryTrash from "../pages/backend/Category/CategoryTrash";
import Contact from "../pages/backend/Contact";
import ContactShow from "../pages/backend/Contact/ContactShow";
import ContactTrash from "../pages/backend/Contact/ContactTrash";

const RouterPrivate = [

 { path: "/", component: Dashboard },
 { path: "/login", component: Login },

  { path: "/brand", component: Brand },
  { path: "/brand/show/:id", component: BrandShow },
  { path: "/brand/trash", component: BrandTrash },
  { path: "/brand/edit/:id", component: BrandEdit },

  { path: "/category", component: Category },
  { path: "/category/show/:id", component: CategoryShow },
  { path: "/category/edit/:id", component: CategoryEdit },
  { path: "/category/trash", component: CategoryTrash },

//{ path: "/admin/category/update/:id", component: CategoryUpdate },

  { path: "/product", component: ProductList },
  { path: "/product/import", component: ProductImport },
  { path: "/product/show/:id", component: ProductShow },
  { path: "/product/create", component: ProductCreate },
  { path: "/product/edit/:id", component: ProductEdit },
  { path: "/product/trash", component: ProductTrash },

  { path: "/sale", component: ProductSale },
  { path: "/sale/create", component: SaleCreate },
  { path: "/sale/edit/:id", component: SaleEdit },
  { path: "/sale/show/:id", component: SaleShow },

  { path: "/menu", component: Menu },
  { path: "/menu/show/:id", component: MenuShow },
  { path: "/menu/edit/:id", component: MenuEdit },
  { path: "/menu/trash", component: MenuTrash },

  { path: "/image", component: ProductImage },
  { path: "/image/create", component: ImageCreate },
  { path: "/image/edit/:id", component: ImageEdit },
  { path: "/image/show/:id", component: ImageShow },


   { path: "/contact", component: Contact },
  { path: "/contact/show/:id", component: ContactShow },
  { path: "/contact/success", component: ContactTrash },

  // { path: "/admin/contact", component: ContactList },
  // { path: "/admin/contact/show/:id", component: ContactShow },
  // { path: "/admin/contact/update/:id", component: ContactUpdate },

  // { path: "/admin/menu", component: MenuList },
  // { path: "/admin/menu/show/:id", component: MenuShow },
  // { path: "/admin/menu/create", component: MenuCreate },
  // { path: "/admin/menu/update/:id", component: MenuUpdate },

  { path: "/order", component: Order },
  { path: "/order/show/:id", component: OrderShow },
  { path: "/order/export", component: OrderExport },

  { path: "/post", component: Post },
  { path: "/post/show/:id", component: PostShow },
  { path: "/post/create", component: PostCreate },
  { path: "/post/edit/:id", component: PostEdit },
  { path: "/post/trash", component:  PostTrash},

  { path: "/about", component: About },
  { path: "/about/show/:id", component: AboutShow },
  { path: "/about/create", component: AboutCreate },
  { path: "/about/edit/:id", component: AboutEdit },
  { path: "/about/trash", component:  AboutTrash},

  { path: "/page", component: Page },
  { path: "/page/show/:id", component: PageShow },
  { path: "/page/create", component: PageCreate },
  { path: "/page/edit/:id", component: PageEdit },
  { path: "/page/trash", component: PageTrash },

  { path: "/slider", component: Slider },
  { path: "/slider/show/:id", component: SliderShow },
  { path: "/slider/create", component: SliderCreate },
  { path: "/slider/edit/:id", component: SliderEdit },
  { path: "/slider/trash", component: SliderTrash },
  
  { path: "/banner", component: Banner },
  { path: "/banner/show/:id", component: BannerShow },
  { path: "/banner/create", component: BannerCreate},
  { path: "/banner/edit/:id", component: BannerEdit },
  { path: "/banner/trash", component: BannerTrash },
  
  { path: "/topic", component: Topic },
  { path: "/topic/show/:id", component: TopicShow },
  { path: "/topic/trash", component: TopicTrash},
  { path: "/topic/edit/:id", component: TopicEdit },

  { path: "/productoption", component: ProductOption },
  { path: "/productoption/show/:id", component: ProductOptionShow },
  { path: "/productoption/trash", component: ProductOptionTrash},
  { path: "/productoption/edit/:id", component: ProductOptionEdit },

  { path: "/productoptionvalue", component: ProductOptionValue },
  { path: "/productoptionvalue/show/:id", component: ProductOptionValueShow },
  { path: "/productoptionvalue/trash", component: ProductOptionValueTrash},
  { path: "/productoptionvalue/edit/:id", component: ProductOptionValueEdit },

  { path: "/categoryoption", component: CategoryOption },
  { path: "/categoryoption/show/:id", component: CategoryOptionShow },
  { path: "/categoryoption/trash", component: CategoryOptionTrash},
  { path: "/categoryoption/edit/:id", component: CategoryOptionEdit },

  { path: "/categoryoptionvalue", component: CategoryOptionValue },
  { path: "/categoryoptionvalue/show/:id", component: CategoryOptionValueShow },
  { path: "/categoryoptionvalue/trash", component: CategoryOptionValueTrash},
  { path: "/categoryoptionvalue/edit/:id", component: CategoryOptionValueEdit },

  { path: "/admin", component: Admin },
  { path: "/admin/show/:id", component: AdminShow },
  { path: "/admin/create", component: AdminCreate },
  { path: "/admin/edit/:id", component: AdminEdit },
  { path: "/admin/trash", component: AdminTrash },

  { path: "/customer", component: Customer },
  { path: "/customer/show/:id", component: CustomerShow },
  { path: "/customer/create", component: CustomerCreate},
  { path: "/customer/edit/:id", component: CustomerEdit },
  { path: "/customer/trash", component: CustomerTrash },
   
];
export default RouterPrivate;
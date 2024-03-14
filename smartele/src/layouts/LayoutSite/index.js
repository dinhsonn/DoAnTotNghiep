import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Menu_mobile from "./Menu_mobile";
import Login from "./Login";
import Newsletter from "./Newslettter";




function LayoutSite() {
    return ( 
        <>
        <Header/>
        <Login/>
        {/* <Newsletter/> */}
        <Menu_mobile/>
        <Outlet/>
        <Footer/>
  
        </>
     );
}

export default LayoutSite;
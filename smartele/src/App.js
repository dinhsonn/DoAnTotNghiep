import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutSite from './layouts/LayoutSite';
import RouterPublic from "./router/RouterPublic";
import { UserProvider } from "./services/UserContext";
import { CartProvider } from "./pages/frontend/Cart/Context";


function App() {

  return (
    <>
    <CartProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutSite />}>
              {RouterPublic.map(function (router, index) {
                const Page = router.component;
                return (
                  <Route key={index} path={router.path} element={<Page />} />
                );
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      </CartProvider>
    </>
  );
}

export default App;

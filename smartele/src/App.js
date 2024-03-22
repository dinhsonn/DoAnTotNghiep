import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutSite from './layouts/LayoutSite';
import RouterPublic from "./router/RouterPublic";
import { UserProvider } from "./services/UserContext";


function App() {

  return (
    <>
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

    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from './layouts/LayoutAdmin';
import RouterPrivate from "./router/RouterPrivate";


function App() {
  return (
  <>
    <BrowserRouter>
             <Routes>
                    <Route path="/" element={<LayoutAdmin />}>
                      {RouterPrivate.map(function(router,index){
                         const Page=router.component;
                        return(    
                          <Route key={index} path={router.path} element={<Page />} />
                        );      
                      })}
                    </Route>               
                </Routes>
    </BrowserRouter>
</>
  );
}

export default App;

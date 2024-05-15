// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './layouts/LayoutAdmin';
import RouterPrivate from './router/RouterPrivate';
import ProtectedRoute from './layouts/LayoutAdmin/ProtectedRoute';
import Login from './layouts/LayoutAdmin/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LayoutAdmin />}>
            {RouterPrivate.map((router, index) => {
              const Page = router.component;
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={
                    <ProtectedRoute>
                      <Page />
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

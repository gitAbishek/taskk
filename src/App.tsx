import { ToastContainer } from "react-toastify";
import "./App.css";
import { useAuthContext } from "./hook/contextConsumer.hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouteWrapper from "./layout/PrivateRouteWrapper";
import Layout from "./layout/Layout";
import PublicRouteWrapper from "./layout/PublicRouteWrapper";
import { PATH } from "./constant/path";
import Login from "./pages/auth/Login";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className=" ">
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouteWrapper isLoggedIn={isLoggedIn} />}>
            <Route path="/*" element={<Layout />} />
          </Route>
          <Route element={<PublicRouteWrapper isLoggedIn={isLoggedIn} />}>
            <Route path={PATH.login} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

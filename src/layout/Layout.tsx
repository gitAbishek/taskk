import { Routes, Route } from "react-router-dom";
import { PATH } from "../constant/path";
import Main from "./Main";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Home from "../pages/home/Home";

const Layout = () => {

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#F1F1F1]">
        <Sidebar />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Navbar />
          <Main>
            <Routes>
              <Route path={PATH.home} element={<Home />} />
            </Routes>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;

import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <div className="site">
        <Navbar></Navbar>
        <Outlet />
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;

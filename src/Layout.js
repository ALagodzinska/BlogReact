import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header.component";
import { useState } from "react";
//BASE FOR EVERY PAGE
const Layout = () => {
  return (
    <div>
      <Header />
      {/*pathname !== "/login" ? <Header title={title} /> : null*/}
      <Outlet />
    </div>
  );
};

export default Layout;

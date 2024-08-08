import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

const Admin = () => {
  return (
    <div>
      <div className="grid grid-cols-[300px,1fr]">
        <Sidebar />
        <div className="flex flex-col gap-[30px]">
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Admin;

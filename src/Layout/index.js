import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/AppBar";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;

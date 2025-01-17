// Header.js
import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <header className="bg-primary text-white text-center p-3">
        <h1>Quản Lý Admin</h1>
      </header>
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

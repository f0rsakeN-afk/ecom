import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
        <AdminSidebar />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/a-level/sidebar/sidebar";
import Header from "../components/b-level/header/header";
import Dialog from "../components/a-level/Dialog";

export default function AuthenticatedLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area - adjusts based on sidebar width */}
      <div className="flex-1 ml-16 transition-all duration-300">
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      {/* Dialog Manager */}
      <Dialog />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Right Content */}
      <main className="ml-64 h-screen overflow-y-auto p-2">
        <Outlet />
      </main>

    </div>
  );
}
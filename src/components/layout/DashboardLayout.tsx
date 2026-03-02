import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <main className="flex-1 p-2">
        <Outlet />
      </main>

    </div>
  );
}
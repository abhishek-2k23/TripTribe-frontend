import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { LayoutDashboard, ListChecks, Wallet, Folder } from "lucide-react";

const navItems = [
  { name: "My Trips", path: "/home/my-trips", icon: LayoutDashboard },
  { name: "Checklists", path: "/home/checklists", icon: ListChecks },
  { name: "Budget", path: "/home/budget", icon: Wallet },
  { name: "Files", path: "/home/files", icon: Folder },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-950 text-white flex flex-col justify-between p-4">

      {/* TOP SECTION */}
      <div>
        <h2 className="text-2xl font-bold mb-8">TripCollab</h2>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-blue-800 font-semibold"
                      : "hover:bg-white/20"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
        <span className="text-sm">Account</span>
        <UserButton  />
      </div>

    </aside>
  );
}
import { NavLink, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ListChecks, Wallet, Folder, Compass, Map } from "lucide-react";

const navItems = [
  { name: "My Trips", path: "/home/my-trips", icon: Map },
  { name: "Checklists", path: "/home/checklists", icon: ListChecks },
  { name: "Budget", path: "/home/budget", icon: Wallet },
  { name: "Files", path: "/home/files", icon: Folder },
];

export default function Sidebar() {
  const location = useLocation()
  return (
    <aside className="w-64 h-screen bg-foreground text-white flex flex-col justify-between p-4 ">

      {/* TOP SECTION */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Compass className="h-6 w-6 text-white" />
          <span className="text-lg font-bold text-white">Trip Tribe</span>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive || (item.path === 'home/my-trips' && location.pathname === "/home")
                      ? "bg-background text-primary font-semibold"
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
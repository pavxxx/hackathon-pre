import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const tabs =
    user.role === "DONOR"
      ? [
        { name: "Overview", path: "/donor" },
        { name: "Post Donation", path: "/donor/donate" },
        { name: "My Donations", path: "/donor/donations" },
        { name: "Impact", path: "/donor/impact" },
      ]
      : user.role === "RECIPIENT"
        ? [
          { name: "Browse Food", path: "/recipient" },
          { name: "My Requests", path: "/recipient/requests" },
        ]
        : [{ name: "Tasks", path: "/volunteer" }, { name: "Profile", path: "/volunteer/profile" }];

  return (
    <aside className="w-64 bg-white border-r p-6">
      <h1 className="text-xl font-bold mb-1">ShareBite</h1>
      <p className="text-xs mb-6 text-[#81B29A] font-bold">
        {user.role} DASHBOARD
      </p>

      <nav className="space-y-2">
        {tabs.map((t) => (
          <NavLink
            key={t.path}
            to={t.path}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive
                ? "bg-[#E07A5F]/10 text-[#E07A5F]"
                : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {t.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

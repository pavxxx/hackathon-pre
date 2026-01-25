import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const { user } = useAuth();

    const donorTabs = [
        { name: "Overview", path: "/donor/overview" },
        { name: "Add Donation", path: "/donor/donate" },
        { name: "My Donations", path: "/donor/donations" },
        { name: "Impact", path: "/donor/impact" },
    ];

    const recipientTabs = [
        { name: "Browse Food", path: "/recipient/browse" },
        { name: "My Requests", path: "/recipient/requests" },
        { name: "Profile", path: "/recipient/profile" },
    ];

    const tabs = user?.role === "DONOR" ? donorTabs : recipientTabs;

    return (
        <aside className="w-64 bg-white p-6 border-r">
            <h1 className="text-xl font-bold mb-8">ShareBite</h1>

            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg font-medium ${isActive
                                ? "bg-sunset/10 text-sunset"
                                : "text-gray-500 hover:bg-gray-100"
                            }`
                        }
                    >
                        {tab.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;

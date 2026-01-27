import { NavLink, useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";

const donorTabs = [
    { name: "Overview", path: "/donor" },
    { name: "Post Donation", path: "/donor/donate" },
    { name: "My Donations", path: "/donor/donations" },
    { name: "Impact", path: "/donor/impact" },
    { name: "Settings", path: "/donor/settings" },
];

const recipientTabs = [
    { name: "Browse Food", path: "/recipient" },
    { name: "My Requests", path: "/recipient/requests" },
    { name: "Nearby Partners", path: "/recipient/partners" },
    { name: "Profile", path: "/recipient/profile" },
];

const volunteerTabs = [
    { name: "Tasks", path: "/volunteer" },
    { name: "Profile", path: "/volunteer/profile" },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    let tabs = [];
    if (role === ROLES.DONOR) tabs = donorTabs;
    else if (role === ROLES.RECIPIENT) tabs = recipientTabs;
    else if (role === ROLES.VOLUNTEER) tabs = volunteerTabs;

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-xl font-bold text-[#3D405B] mb-1">
                    ShareBite
                </h1>
                <p className="text-xs text-[#81B29A] font-bold tracking-widest mb-8">
                    {role} DASHBOARD
                </p>

                <nav className="space-y-2">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            end
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg font-medium transition ${isActive
                                    ? "bg-[#E07A5F]/10 text-[#E07A5F]"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <button
                onClick={handleSignOut}
                className="text-red-600 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition"
            >
                Sign Out
            </button>
        </aside>
    );
};

export default Sidebar;

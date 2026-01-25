import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    let tabs = [];

    if (pathname.startsWith("/donor")) {
        tabs = [
            { name: "Overview", path: "/donor" },
            { name: "My Donations", path: "/donor/donations" },
            { name: "Impact", path: "/donor/impact" },
        ];
    }

    if (pathname.startsWith("/recipient")) {
        tabs = [
            { name: "Browse Food", path: "/recipient" },
            { name: "My Requests", path: "/recipient/requests" },
        ];
    }

    if (pathname.startsWith("/volunteer")) {
        tabs = [{ name: "My Tasks", path: "/volunteer" }];
    }

    const handleSignOut = () => {
        // later: clear auth/session here
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
            {/* TOP */}
            <div>
                <h1 className="text-xl font-bold mb-8 text-[#3D405B]">
                    ShareBite
                </h1>

                <nav className="space-y-2">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg font-medium ${isActive
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

            {/* BOTTOM */}
            <button
                onClick={handleSignOut}
                className="mt-6 px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition"
            >
                Sign Out
            </button>
        </aside>
    );
};

export default Sidebar;
